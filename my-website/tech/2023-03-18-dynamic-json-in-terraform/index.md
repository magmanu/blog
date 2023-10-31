---
slug: dynamic-json-in-terraform
title: Generating Dynamic JSON in Terraform
authors: manu
tags: [infra, terraform, IaC, step functions, devops]
---

In this article I’ll use Step Functions as a case study, but you can do it with whatever resources you want.

## What we’re going to do
The following JSON will become dynamic. We’ll replace static values with:
1. A variable
2. A dynamic list
3. One or more dynamic objects

<!--truncate-->

(I’ve added non idiomatic comments inside the code blocks, but it’s just to show what exactly we’re doing.)

```json
# Reference JSON
{
    "Comment": "My state machine",
    "StartAt": "Choice",
    "States": {
        "Handle Notification": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "OutputPath": "$.Payload",
            "Parameters": {
              "Payload.$": "$",
              "FunctionName": "my_function_name"  <-- Case 1: Replace with dynamic string
            },
            "End": true
        },
        "Choice": {
          "Type": "Choice",
          "Choices": [                            -------
             {                                           |
               "IsPresent": true,                        |
               "Next": "SSM Execution-InstanceId",       |
               "Variable": "$.InstanceId"                |
              },                                         |
              {                                          |-- Case 2: Replace with dynamic list
               "IsPresent": true,                        |
               "Next": "SSM Execution-SecurityGroupIds", |
               "Variable": "$.SecurityGroupIds"          |
              }                                          |
            ],                                     -------
            "Default": "Pass"
        },
        "SSM Execution-InstanceId": {          -------
            "Next": "Pass",                          |
            "Parameters": {                          |
                "DocumentName.$": "$.DocumentName",  |
                "Parameters": {                      |
                    "InstanceId.$": "States.Array($.InstanceId)"
                }                                    |
              },                                     |
            "Resource": "arn:aws:states:::aws-sdk:ssm:startAutomationExecution",
            "ResultPath": "$.TaskResult",            |
            "Type": "Task"                           |
        },                                           |-- Case 3: Replace with one or more dynamic objects
        "SSM Execution-SecurityGroupIds": {          |
            "Next": "Pass",                          |
            "Parameters": {                          |
                "DocumentName.$": "$.DocumentName",  |
                "Parameters": {                      |
                    "SecurityGroupIds.$": "States.Array($.SecurityGroupIds)"
                }                                    |
            },                                       |
            "Resource": "arn:aws:states:::aws-sdk:ssm:startAutomationExecution",
            "ResultPath": "$.TaskResult",            |
            "Type": "Task"                           |
        },                                     -------
        "Pass": {
            "Type": "Pass",
            "End": true
        }
    }
}
```

First, save the JSON above in a template format. You can use the extension `.tpl` or `.tftpl`. Although Terraform recommends using the second option, there's no hard rule about which to use.

## Case 1: Injecting a variable into JSON

Let’s begin by updating the `FunctionName` value in the template, using string interpolation:

```json
# modules/templates/stepfunction_definition.tftpl (extract)

{"Handle Notification": {
        "Type": "Task",
        "Resource": "arn:aws:states:::lambda:invoke",
        "OutputPath": "$.Payload",
        "Parameters": {
          "Payload.$": "$",
          "FunctionName": "${lambda_function_name}"
        },
        "End": true
      }
}
```

To render the template as a valid JSON, we can use Terraform’s `templatefile` function. It takes two arguments: the template file path and a map of variables that will be injected at runtime. For the sake of the argument, let’s keep our new module as dynamic as possible. Locals, variables and resources are also included just to show how things work together.

```json
# modules/stepfunction.tf (full file)

locals {
    file = templatefile("${path.module}/templates/stepfunction_definition.tpl", {
        lambda_function_name = var.lambda_function_name
    })
}
variable "lambda_function_name" {
    description = "Lambda function name"
    type        = string
}

resource "aws_sfn_state_machine" "sfn_state_machine" {
    name        = var.step_function_name
    role_arn    = var.sf_role_arn
    definition  = local.file
}
```

Now we write a top level `main.tf`, where the actual values go.

```json
# main.tf (full file)

module "my_step_function" {
  source                = "./modules/step_functions"
  step_function_name    = "autoremediation_sf"
  sf_role_arn           = "arn:aws:iam::123456789012:role/autoremediation_sf"
  lambda_function_name  = "autoremediation_lambda"
}
```

To check that your variable was successfully injected, run `terraform init && terraform plan`.

## Case 2: Injecting a list into a JSON

As a refresher, this is the list we’re refactoring:

```json
# modules/templates/stepfunction_definition.tftpl (extract)

"Choice": {
    "Type": "Choice",
    "Choices": [                              -------
        {                                           |
          "IsPresent": true,                        |
          "Next": "SSM Execution-InstanceId",       |
          "Variable": "$.InstanceId"                |
        },                                          |
        {                                           |--- Case 2: Abstract list
          "IsPresent": true,                        |
          "Next": "SSM Execution-SecurityGroupIds", |
          "Variable": "$.SecurityGroupIds"          |
        }                                           |
    ],                                        -------
    "Default": "Pass"
}
```

So let’s refactor the template again. We’ll use a Terraform function called `jsonencode`, as it ensures that the list of objects we’re passing to the template will be properly rendered as JSON:

```json
# modules/templates/stepfunction_definition.tftpl(extract)

"Choice": {
    "Type": "Choice",
    "Choices": ${jsonencode(choices_list)},  <--- List in one single line! -->
    "Default": "Pass"
    }
 ```

Now, we’ll try two ways to feed the template with our dynamic list.

### The simplest solution: static list

One option is to create a variable that will pass a ready-made list for you:

```json
# modules/stepfunction.tf (extract)

locals {
    file = templatefile("${path.module}/templates/stepfunction_definition.tpl", {
        lambda_function_name = var.lambda_function_name
        choices_list = var.my_list   <------- Add this line -->
    })
}

variable "my_list" {                <-------- And this variable -->
    description = "A list of whatever"
    type = list
}
```

Then, in top level module, pass the variable values. The JSON is now dynamic, but the list is pretty much “static”.

```json
# main.tf (full file)

module "my_step_function" {
    source                = "./modules/step_functions"
    step_function_name    = "autoremediation_sf"
    sf_role_arn           = "arn:aws:iam::123456789012:role/autoremediation_sf"
    lambda_function_name  = "autoremediation_lambda"

    my_list = [{                            <-------- New value -->
        "IsPresent": true,
        "Next": "SSM Execution-InstanceId",
        "Variable": "$.InstanceId"
    }]
}
```

### The logic-heavy solution: dynamic list

What if you want the list itself to be dynamic too? For example, you want the values for `Next` and `Variable` to be extracted from a parameter and injected to list before it’s sent to the json?
In our example, the values that populate `Next` and `Variable` come from keys provided by `ssm_params`, in the top level file:

```json
# main.tf (full file)

module "my_step_function" {
    source                = "./modules/step_functions"
    step_function_name    = "autoremediation_sf"
    sf_role_arn           = "arn:aws:iam::123456789012:role/autoremediation_sf"
    lambda_function_name  = "autoremediation_lambda"

                       <--- Static list is no longer here -->
    ssm_params = [     <--- We want to populate the list with these keys! -->
        {"InstanceId": "States.Array($.InstanceId)"},    
        {"SecurityGroupIds": "States.Array($.SecurityGroupIds)"}
    ]
}
```

Now our module becomes:

```json
# modules/stepfunction.tf (full file)

locals {
    choices_list = flatten([for item in var.ssm_params: [
        for key, value in item : {
            "IsPresent": true,
            "Next": "SSM Execution-${key}"
            "Variable": "$.${key}",
        }]
    ])
    file = templatefile("${path.module}/templates/stepfunction_definition.tpl", {
        lambda_function_name = var.lambda_function_name,
        choices_list = local.choices_list
    })
}
variable "lambda_function_name" {
    description = "Lambda function name"
    type        = string
}
variable "ssm_params" {
    description = "List of SSM param objects to be injected into the Step Function definition"
    type = list
}
resource "aws_sfn_state_machine" "sfn_state_machine" {
    name        = var.step_function_name
    role_arn    = aws_iam_role.step_function_role_arn
    definition  = local.file
}
```

Starting with the line `choices_list = flatten([for item in var.ssm_params:` ignore `flatten` for a bit and look at the loop. Because `ssm_params` is a list, we have to loop through it to access each item. The loop is wrapped in square brackets, which means the output will be a list. The `:` that follows is just part of the loop syntax.

Next line, another loop: `for key, value in item : {` . This loop goes through each object in `ssm_params` to access key and the value, so we can extract and restructure the data. The loop is also wrapped with square brackets, meaning that every object will unfortunately be inside their own list.

Now, remember `flatten`? We're using this Terraform function because, as each loop returns a list, the result looks like this: `[[obj1],[obj2]]`. But we need a clean list of objects, and flatten can get rid of the unnecessary nesting.

Done.

## Case 3: Injecting an object into a JSON

Now, the most exciting part. We will abstract whole objects. (In this particular case, this means whole steps can become dynamic despite Amazon States Language!)
Here’s what we’re refactoring away:

```json
"Steps": {
    "SSM Execution-InstanceId": {             -------
            "Next": "Pass",                          |
            "Parameters": {                          |
                "DocumentName.$": "$.DocumentName",  |
                "Parameters": {                      |
                    "InstanceId.$": "States.Array($.InstanceId)"
                }                                    |
              },                                     |
            "Resource": "arn:aws:states:::aws-sdk:ssm:startAutomationExecution",
            "ResultPath": "$.TaskResult",            |
            "Type": "Task"                           |
        },                                           |---------- ALL THIS!
        "SSM Execution-SecurityGroupIds": {          |
            "Next": "Pass",                          |
            "Parameters": {                          |
                "DocumentName.$": "$.DocumentName",  |
                "Parameters": {                      |
                    "SecurityGroupIds.$": "States.Array($.SecurityGroupIds)"
                }                                    |
            },                                       |
            "Resource": "arn:aws:states:::aws-sdk:ssm:startAutomationExecution",
            "ResultPath": "$.TaskResult",            |
            "Type": "Task"                           |
        }                                     -------
}
```

As usual, let’s modify the template:

```json
# modules/templates/stepfunction_definition.tftpl (extract)

"States": {
    "Choice": {
      "Type": "Choice",
      "Choices": ${jsonencode(choices)},
      "Default": "Pass"
    },
    %{ for key, data in ssm_execution }   <--- New section --->
        "${key}": ${jsonencode(data)},
    %{ endfor }
    "Handle Notification": {<--- blahblah-->}
    }
```

Here’s where I ask you to trust Terraform even if your linter freaks out.

What’s happening? We’re using the [Terraform directive](https://developer.hashicorp.com/terraform/language/expressions/strings#directives) syntax `%{}` to write a dynamic string (yeah, templates are treated as strings).

The line `%{ for key, data in ssm_execution }` informs the `templatefile` function that an iteration is coming, and it will end when it reaches the line `%{ endfor }`. In the meanwhile, it should keep creating a key-value pair with the format `"my_key": {"some": "json"},`.

Pretty cool, uh?

So now let’s add the local `ssm_execution`, the logic that will populate all this.

```json
# modules/stepfunction.tf (extract)

locals {
    choices = flatten([for item in var.ssm_params: [
        for key, value in item : {
            "IsPresent": true,
            "Next": "SSM Execution-${key}"
            "Variable": "$.${key}",
        }]
    ])

    <--- Oh hey! -->
    ssm_execution = merge(flatten([for item in var.ssm_params: [ 
                    for key, value in item : {
                        "SSM Execution-${key}": {
                            "Type": "Task",
                            "Parameters": {
                              "DocumentName.$": "$.DocumentName",
                              "Parameters": {"$.${key}": "${value}"}
                            },
                            "Resource": "arn:aws:states:::aws-sdk:ssm:startAutomationExecution",
                            "Next": "Handle Notification",
                            "ResultPath": "$.TaskResult"
                        }
                    }
                    ]]
                )...)

    file = templatefile("${path.module}/templates/stepfunction_definition.tpl", {
        lambda_function_name = var.lambda_function_name,
        choices_list = local.choices,
        ssm_execution = local.ssm_execution <--- Oh hi! -->
    })
}
```

We’re already familiar with loops and flatten, so let’s talk about the new kids on the block: `merge` and `...`.

`merge` is a terraform function that takes multiple objects and merge them together into a single object. So, if we have two objects like

```json
  {
    "a": 1,
    "b": 2
  },
  {
    "c": 3,
    "d": 4
  }
```

the `merge` function will consolidate them to:

```json
{
    "a": 1,
    "b": 2,
    "c": 3,
    "d": 4
}
```

And if you were paying attention, you noticed that the merge function in our module is **not** taking several object as arguments, but a flatten function (which outputs a single list). We have `...` to thank for the trick.
In Terraform, `...` (three dots) work like the Javascript spread operator: it expands our list into separate arguments.
So that’s it. Our final template will literally be half the size of our original JSON, it’s dynamic, reusable, and best of all — frees you from ever handling Amazon States Language in your project again.

## Final files

```json
# modules/templates/stepfunction_definition.tftpl

{
    "Comment": "My state machine",
    "StartAt": "Choice",
    "States": {
        "Handle Notification": {
            "Type": "Task",
            "Resource": "arn:aws:states:::lambda:invoke",
            "OutputPath": "$.Payload",
            "Parameters": {
              "Payload.$": "$",
              "FunctionName": "${lambda_function_name}"
            },
            "End": true
        },
        "Choice": {
            "Type": "Choice",
            "Choices": ${jsonencode(choices)},
            "Default": "Pass"
        },
        %{ for key, data in ssm_execution }
        "${key}": ${jsonencode(data)},
        %{ endfor }
        "Pass": {
            "Type": "Pass",
            "End": true
        }
    }
}
```

```json
locals {
    choices = flatten([for item in var.ssm_params: [
        for key, value in item : {
            "IsPresent": true,
            "Next": "SSM Execution-${key}"
            "Variable": "$.${key}",
        }]
    ])

    ssm_execution = merge(flatten([for item in var.ssm_params: [ 
                    for key, value in item : {
                        "SSM Execution-${key}": {
                            "Type": "Task",
                            "Parameters": {
                              "DocumentName.$": "$.DocumentName",
                              "Parameters": {"$.${key}": "${value}"}
                            },
                            "Resource": "arn:aws:states:::aws-sdk:ssm:startAutomationExecution",
                            "Next": "Handle Notification",
                            "ResultPath": "$.TaskResult"
                        }
                    }
                    ]]
                )...)

    file = templatefile("${path.module}/templates/stepfunction_definition.tpl", {
        lambda_function_name = var.lambda_function_name,
        choices_list = local.choices,
        ssm_execution = local.ssm_execution
    })
}

variable "lambda_function_name" {
    description = "Lambda function name"
    type        = string
}

variable "ssm_params" {
    description = "List of SSM param objects to be injected into the Step Function definition"
    type = list
}

resource "aws_sfn_state_machine" "sfn_state_machine" {
    name        = var.step_function_name
    role_arn    = var.sf_role_arn
    definition  = local.file
}
```

```json
# main.tf (full file)

module "my_step_function" {
    source                = "./modules/step_functions"
    step_function_name    = "autoremediation_sf"
    sf_role_arn           = "arn:aws:iam::123456789012:role/autoremediation_sf"
    lambda_function_name  = "autoremediation_lambda"

    ssm_params = [                
        {"InstanceId": "States.Array($.InstanceId)"},    
        {"SecurityGroupIds": "States.Array($.SecurityGroupIds)"}
    ]
}
```