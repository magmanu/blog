"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6233],{5256:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"another-test","metadata":{"permalink":"/blog/tech/another-test","source":"@site/tech/2023-11-02-another-test/index.md","title":"Draft Title","description":"other options:","date":"2023-11-02T00:00:00.000Z","formattedDate":"November 2, 2023","tags":[{"label":"another","permalink":"/blog/tech/tags/another"},{"label":"test","permalink":"/blog/tech/tags/test"}],"readingTime":0.1,"hasTruncateMarker":false,"authors":[{"name":"Manu Magalh\xe3es","title":"DevSecOps Engineer","url":"https://github.com/magmanu","imageURL":"https://github.com/magmanu.png","key":"manu"}],"frontMatter":{"slug":"another-test","title":"Draft Title","authors":"manu","tags":["another","test"]},"nextItem":{"title":"Generating Dynamic JSON in Terraform","permalink":"/blog/tech/dynamic-json-in-terraform"}},"content":"<br/>\\n\\n\x3c!-- ![Img Alt](./img.png) --\x3e\\n\\n<br/>\\n\\n:::note Titles again\\n\\n[other options](https://docusaurus.io/docs/next/markdown-features/admonitions):\\n\\n- tip\\n- info\\n- warn\\n- danger\\n\\n:::"},{"id":"dynamic-json-in-terraform","metadata":{"permalink":"/blog/tech/dynamic-json-in-terraform","source":"@site/tech/2023-03-18-dynamic-json-in-terraform/index.md","title":"Generating Dynamic JSON in Terraform","description":"In this article I\u2019ll use Step Functions as a case study, but you can do it with whatever resources you want.","date":"2023-03-18T00:00:00.000Z","formattedDate":"March 18, 2023","tags":[{"label":"infra","permalink":"/blog/tech/tags/infra"},{"label":"terraform","permalink":"/blog/tech/tags/terraform"},{"label":"IaC","permalink":"/blog/tech/tags/ia-c"},{"label":"step functions","permalink":"/blog/tech/tags/step-functions"},{"label":"devops","permalink":"/blog/tech/tags/devops"}],"readingTime":9.085,"hasTruncateMarker":true,"authors":[{"name":"Manu Magalh\xe3es","title":"DevSecOps Engineer","url":"https://github.com/magmanu","imageURL":"https://github.com/magmanu.png","key":"manu"}],"frontMatter":{"slug":"dynamic-json-in-terraform","title":"Generating Dynamic JSON in Terraform","authors":"manu","tags":["infra","terraform","IaC","step functions","devops"]},"prevItem":{"title":"Draft Title","permalink":"/blog/tech/another-test"},"nextItem":{"title":"Bypassing Terraform error: \u201cThe true and false result expressions must have consistent types\u201d","permalink":"/blog/tech/terraform-ternary-error"}},"content":"In this article I\u2019ll use Step Functions as a case study, but you can do it with whatever resources you want.\\n\\n## What we\u2019re going to do\\nThe following JSON will become dynamic. We\u2019ll replace static values with:\\n1. [A variable](#case-1-injecting-a-variable-into-json)\\n2. [A dynamic list](#case-2-injecting-a-list-into-a-json)\\n3. [One or more dynamic objects](#case-3-injecting-an-object-into-a-json)\\n\\n\x3c!--truncate--\x3e\\n\\n(I\u2019ve added non idiomatic comments inside the code blocks, but it\u2019s just to show what exactly we\u2019re doing.)\\n\\n```json\\n# Reference JSON\\n{\\n    \\"Comment\\": \\"My state machine\\",\\n    \\"StartAt\\": \\"Choice\\",\\n    \\"States\\": {\\n        \\"Handle Notification\\": {\\n            \\"Type\\": \\"Task\\",\\n            \\"Resource\\": \\"arn:aws:states:::lambda:invoke\\",\\n            \\"OutputPath\\": \\"$.Payload\\",\\n            \\"Parameters\\": {\\n              \\"Payload.$\\": \\"$\\",\\n              \\"FunctionName\\": \\"my_function_name\\"  <-- Case 1: Replace with dynamic string\\n            },\\n            \\"End\\": true\\n        },\\n        \\"Choice\\": {\\n          \\"Type\\": \\"Choice\\",\\n          \\"Choices\\": [                            -------\\n             {                                           |\\n               \\"IsPresent\\": true,                        |\\n               \\"Next\\": \\"SSM Execution-InstanceId\\",       |\\n               \\"Variable\\": \\"$.InstanceId\\"                |\\n              },                                         |\\n              {                                          |-- Case 2: Replace with dynamic list\\n               \\"IsPresent\\": true,                        |\\n               \\"Next\\": \\"SSM Execution-SecurityGroupIds\\", |\\n               \\"Variable\\": \\"$.SecurityGroupIds\\"          |\\n              }                                          |\\n            ],                                     -------\\n            \\"Default\\": \\"Pass\\"\\n        },\\n        \\"SSM Execution-InstanceId\\": {          -------\\n            \\"Next\\": \\"Pass\\",                          |\\n            \\"Parameters\\": {                          |\\n                \\"DocumentName.$\\": \\"$.DocumentName\\",  |\\n                \\"Parameters\\": {                      |\\n                    \\"InstanceId.$\\": \\"States.Array($.InstanceId)\\"\\n                }                                    |\\n              },                                     |\\n            \\"Resource\\": \\"arn:aws:states:::aws-sdk:ssm:startAutomationExecution\\",\\n            \\"ResultPath\\": \\"$.TaskResult\\",            |\\n            \\"Type\\": \\"Task\\"                           |\\n        },                                           |-- Case 3: Replace with one or more dynamic objects\\n        \\"SSM Execution-SecurityGroupIds\\": {          |\\n            \\"Next\\": \\"Pass\\",                          |\\n            \\"Parameters\\": {                          |\\n                \\"DocumentName.$\\": \\"$.DocumentName\\",  |\\n                \\"Parameters\\": {                      |\\n                    \\"SecurityGroupIds.$\\": \\"States.Array($.SecurityGroupIds)\\"\\n                }                                    |\\n            },                                       |\\n            \\"Resource\\": \\"arn:aws:states:::aws-sdk:ssm:startAutomationExecution\\",\\n            \\"ResultPath\\": \\"$.TaskResult\\",            |\\n            \\"Type\\": \\"Task\\"                           |\\n        },                                     -------\\n        \\"Pass\\": {\\n            \\"Type\\": \\"Pass\\",\\n            \\"End\\": true\\n        }\\n    }\\n}\\n```\\n\\nFirst, save the JSON above in a template format. You can use the extension `.tpl` or `.tftpl`. Although Terraform recommends using the second option, there\'s no hard rule about which to use.\\n\\n## Case 1: Injecting a variable into JSON\\n\\nLet\u2019s begin by updating the `FunctionName` value in the template, using string interpolation:\\n\\n```json\\n# modules/templates/stepfunction_definition.tftpl (extract)\\n\\n{\\"Handle Notification\\": {\\n        \\"Type\\": \\"Task\\",\\n        \\"Resource\\": \\"arn:aws:states:::lambda:invoke\\",\\n        \\"OutputPath\\": \\"$.Payload\\",\\n        \\"Parameters\\": {\\n          \\"Payload.$\\": \\"$\\",\\n          \\"FunctionName\\": \\"${lambda_function_name}\\"\\n        },\\n        \\"End\\": true\\n      }\\n}\\n```\\n\\nTo render the template as a valid JSON, we can use Terraform\u2019s `templatefile` function. It takes two arguments: the template file path and a map of variables that will be injected at runtime. For the sake of the argument, let\u2019s keep our new module as dynamic as possible. Locals, variables and resources are also included just to show how things work together.\\n\\n```json\\n# modules/stepfunction.tf (full file)\\n\\nlocals {\\n    file = templatefile(\\"${path.module}/templates/stepfunction_definition.tpl\\", {\\n        lambda_function_name = var.lambda_function_name\\n    })\\n}\\nvariable \\"lambda_function_name\\" {\\n    description = \\"Lambda function name\\"\\n    type        = string\\n}\\n\\nresource \\"aws_sfn_state_machine\\" \\"sfn_state_machine\\" {\\n    name        = var.step_function_name\\n    role_arn    = var.sf_role_arn\\n    definition  = local.file\\n}\\n```\\n\\nNow we write a top level `main.tf`, where the actual values go.\\n\\n```json\\n# main.tf (full file)\\n\\nmodule \\"my_step_function\\" {\\n  source                = \\"./modules/step_functions\\"\\n  step_function_name    = \\"autoremediation_sf\\"\\n  sf_role_arn           = \\"arn:aws:iam::123456789012:role/autoremediation_sf\\"\\n  lambda_function_name  = \\"autoremediation_lambda\\"\\n}\\n```\\n\\nTo check that your variable was successfully injected, run `terraform init && terraform plan`.\\n\\n## Case 2: Injecting a list into a JSON\\n\\nAs a refresher, this is the list we\u2019re refactoring:\\n\\n```json\\n# modules/templates/stepfunction_definition.tftpl (extract)\\n\\n\\"Choice\\": {\\n    \\"Type\\": \\"Choice\\",\\n    \\"Choices\\": [                              -------\\n        {                                           |\\n          \\"IsPresent\\": true,                        |\\n          \\"Next\\": \\"SSM Execution-InstanceId\\",       |\\n          \\"Variable\\": \\"$.InstanceId\\"                |\\n        },                                          |\\n        {                                           |--- Case 2: Abstract list\\n          \\"IsPresent\\": true,                        |\\n          \\"Next\\": \\"SSM Execution-SecurityGroupIds\\", |\\n          \\"Variable\\": \\"$.SecurityGroupIds\\"          |\\n        }                                           |\\n    ],                                        -------\\n    \\"Default\\": \\"Pass\\"\\n}\\n```\\n\\nSo let\u2019s refactor the template again. We\u2019ll use a Terraform function called `jsonencode`, as it ensures that the list of objects we\u2019re passing to the template will be properly rendered as JSON:\\n\\n```json\\n# modules/templates/stepfunction_definition.tftpl(extract)\\n\\n\\"Choice\\": {\\n    \\"Type\\": \\"Choice\\",\\n    \\"Choices\\": ${jsonencode(choices_list)},  <--- List in one single line! --\x3e\\n    \\"Default\\": \\"Pass\\"\\n    }\\n ```\\n\\nNow, we\u2019ll try two ways to feed the template with our dynamic list.\\n\\n### The simplest solution: static list\\n\\nOne option is to create a variable that will pass a ready-made list for you:\\n\\n```json\\n# modules/stepfunction.tf (extract)\\n\\nlocals {\\n    file = templatefile(\\"${path.module}/templates/stepfunction_definition.tpl\\", {\\n        lambda_function_name = var.lambda_function_name\\n        choices_list = var.my_list   <------- Add this line --\x3e\\n    })\\n}\\n\\nvariable \\"my_list\\" {                <-------- And this variable --\x3e\\n    description = \\"A list of whatever\\"\\n    type = list\\n}\\n```\\n\\nThen, in top level module, pass the variable values. The JSON is now dynamic, but the list is pretty much \u201cstatic\u201d.\\n\\n```json\\n# main.tf (full file)\\n\\nmodule \\"my_step_function\\" {\\n    source                = \\"./modules/step_functions\\"\\n    step_function_name    = \\"autoremediation_sf\\"\\n    sf_role_arn           = \\"arn:aws:iam::123456789012:role/autoremediation_sf\\"\\n    lambda_function_name  = \\"autoremediation_lambda\\"\\n\\n    my_list = [{                            <-------- New value --\x3e\\n        \\"IsPresent\\": true,\\n        \\"Next\\": \\"SSM Execution-InstanceId\\",\\n        \\"Variable\\": \\"$.InstanceId\\"\\n    }]\\n}\\n```\\n\\n### The logic-heavy solution: dynamic list\\n\\nWhat if you want the list itself to be dynamic too? For example, you want the values for `Next` and `Variable` to be extracted from a parameter and injected to list before it\u2019s sent to the json?\\nIn our example, the values that populate `Next` and `Variable` come from keys provided by `ssm_params`, in the top level file:\\n\\n```json\\n# main.tf (full file)\\n\\nmodule \\"my_step_function\\" {\\n    source                = \\"./modules/step_functions\\"\\n    step_function_name    = \\"autoremediation_sf\\"\\n    sf_role_arn           = \\"arn:aws:iam::123456789012:role/autoremediation_sf\\"\\n    lambda_function_name  = \\"autoremediation_lambda\\"\\n\\n                       <--- Static list is no longer here --\x3e\\n    ssm_params = [     <--- We want to populate the list with these keys! --\x3e\\n        {\\"InstanceId\\": \\"States.Array($.InstanceId)\\"},    \\n        {\\"SecurityGroupIds\\": \\"States.Array($.SecurityGroupIds)\\"}\\n    ]\\n}\\n```\\n\\nNow our module becomes:\\n\\n```json\\n# modules/stepfunction.tf (full file)\\n\\nlocals {\\n    choices_list = flatten([for item in var.ssm_params: [\\n        for key, value in item : {\\n            \\"IsPresent\\": true,\\n            \\"Next\\": \\"SSM Execution-${key}\\"\\n            \\"Variable\\": \\"$.${key}\\",\\n        }]\\n    ])\\n    file = templatefile(\\"${path.module}/templates/stepfunction_definition.tpl\\", {\\n        lambda_function_name = var.lambda_function_name,\\n        choices_list = local.choices_list\\n    })\\n}\\nvariable \\"lambda_function_name\\" {\\n    description = \\"Lambda function name\\"\\n    type        = string\\n}\\nvariable \\"ssm_params\\" {\\n    description = \\"List of SSM param objects to be injected into the Step Function definition\\"\\n    type = list\\n}\\nresource \\"aws_sfn_state_machine\\" \\"sfn_state_machine\\" {\\n    name        = var.step_function_name\\n    role_arn    = aws_iam_role.step_function_role_arn\\n    definition  = local.file\\n}\\n```\\n\\nStarting with the line `choices_list = flatten([for item in var.ssm_params:` ignore `flatten` for a bit and look at the loop. Because `ssm_params` is a list, we have to loop through it to access each item. The loop is wrapped in square brackets, which means the output will be a list. The `:` that follows is just part of the loop syntax.\\n\\nNext line, another loop: `for key, value in item : {` . This loop goes through each object in `ssm_params` to access key and the value, so we can extract and restructure the data. The loop is also wrapped with square brackets, meaning that every object will unfortunately be inside their own list.\\n\\nNow, remember `flatten`? We\'re using this Terraform function because, as each loop returns a list, the result looks like this: `[[obj1],[obj2]]`. But we need a clean list of objects, and flatten can get rid of the unnecessary nesting.\\n\\nDone.\\n\\n## Case 3: Injecting an object into a JSON\\n\\nNow, the most exciting part. We will abstract whole objects. (In this particular case, this means whole steps can become dynamic despite Amazon States Language!)\\nHere\u2019s what we\u2019re refactoring away:\\n\\n```json\\n\\"Steps\\": {\\n    \\"SSM Execution-InstanceId\\": {             -------\\n            \\"Next\\": \\"Pass\\",                          |\\n            \\"Parameters\\": {                          |\\n                \\"DocumentName.$\\": \\"$.DocumentName\\",  |\\n                \\"Parameters\\": {                      |\\n                    \\"InstanceId.$\\": \\"States.Array($.InstanceId)\\"\\n                }                                    |\\n              },                                     |\\n            \\"Resource\\": \\"arn:aws:states:::aws-sdk:ssm:startAutomationExecution\\",\\n            \\"ResultPath\\": \\"$.TaskResult\\",            |\\n            \\"Type\\": \\"Task\\"                           |\\n        },                                           |---------- ALL THIS!\\n        \\"SSM Execution-SecurityGroupIds\\": {          |\\n            \\"Next\\": \\"Pass\\",                          |\\n            \\"Parameters\\": {                          |\\n                \\"DocumentName.$\\": \\"$.DocumentName\\",  |\\n                \\"Parameters\\": {                      |\\n                    \\"SecurityGroupIds.$\\": \\"States.Array($.SecurityGroupIds)\\"\\n                }                                    |\\n            },                                       |\\n            \\"Resource\\": \\"arn:aws:states:::aws-sdk:ssm:startAutomationExecution\\",\\n            \\"ResultPath\\": \\"$.TaskResult\\",            |\\n            \\"Type\\": \\"Task\\"                           |\\n        }                                     -------\\n}\\n```\\n\\nAs usual, let\u2019s modify the template:\\n\\n```json\\n# modules/templates/stepfunction_definition.tftpl (extract)\\n\\n\\"States\\": {\\n    \\"Choice\\": {\\n      \\"Type\\": \\"Choice\\",\\n      \\"Choices\\": ${jsonencode(choices)},\\n      \\"Default\\": \\"Pass\\"\\n    },\\n    %{ for key, data in ssm_execution }   <--- New section ---\x3e\\n        \\"${key}\\": ${jsonencode(data)},\\n    %{ endfor }\\n    \\"Handle Notification\\": {<--- blahblah--\x3e}\\n    }\\n```\\n\\nHere\u2019s where I ask you to trust Terraform even if your linter freaks out.\\n\\nWhat\u2019s happening? We\u2019re using the [Terraform directive](https://developer.hashicorp.com/terraform/language/expressions/strings#directives) syntax `%{}` to write a dynamic string (yeah, templates are treated as strings).\\n\\nThe line `%{ for key, data in ssm_execution }` informs the `templatefile` function that an iteration is coming, and it will end when it reaches the line `%{ endfor }`. In the meanwhile, it should keep creating a key-value pair with the format `\\"my_key\\": {\\"some\\": \\"json\\"},`.\\n\\nPretty cool, uh?\\n\\nSo now let\u2019s add the local `ssm_execution`, the logic that will populate all this.\\n\\n```json\\n# modules/stepfunction.tf (extract)\\n\\nlocals {\\n    choices = flatten([for item in var.ssm_params: [\\n        for key, value in item : {\\n            \\"IsPresent\\": true,\\n            \\"Next\\": \\"SSM Execution-${key}\\"\\n            \\"Variable\\": \\"$.${key}\\",\\n        }]\\n    ])\\n\\n    <--- Oh hey! --\x3e\\n    ssm_execution = merge(flatten([for item in var.ssm_params: [ \\n                    for key, value in item : {\\n                        \\"SSM Execution-${key}\\": {\\n                            \\"Type\\": \\"Task\\",\\n                            \\"Parameters\\": {\\n                              \\"DocumentName.$\\": \\"$.DocumentName\\",\\n                              \\"Parameters\\": {\\"$.${key}\\": \\"${value}\\"}\\n                            },\\n                            \\"Resource\\": \\"arn:aws:states:::aws-sdk:ssm:startAutomationExecution\\",\\n                            \\"Next\\": \\"Handle Notification\\",\\n                            \\"ResultPath\\": \\"$.TaskResult\\"\\n                        }\\n                    }\\n                    ]]\\n                )...)\\n\\n    file = templatefile(\\"${path.module}/templates/stepfunction_definition.tpl\\", {\\n        lambda_function_name = var.lambda_function_name,\\n        choices_list = local.choices,\\n        ssm_execution = local.ssm_execution <--- Oh hi! --\x3e\\n    })\\n}\\n```\\n\\nWe\u2019re already familiar with loops and flatten, so let\u2019s talk about the new kids on the block: `merge` and `...`.\\n\\n`merge` is a terraform function that takes multiple objects and merge them together into a single object. So, if we have two objects like\\n\\n```json\\n  {\\n    \\"a\\": 1,\\n    \\"b\\": 2\\n  },\\n  {\\n    \\"c\\": 3,\\n    \\"d\\": 4\\n  }\\n```\\n\\nthe `merge` function will consolidate them to:\\n\\n```json\\n{\\n    \\"a\\": 1,\\n    \\"b\\": 2,\\n    \\"c\\": 3,\\n    \\"d\\": 4\\n}\\n```\\n\\nAnd if you were paying attention, you noticed that the merge function in our module is **not** taking several object as arguments, but a flatten function (which outputs a single list). We have `...` to thank for the trick.\\nIn Terraform, `...` (three dots) work like the Javascript spread operator: it expands our list into separate arguments.\\nSo that\u2019s it. Our final template will literally be half the size of our original JSON, it\u2019s dynamic, reusable, and best of all \u2014 frees you from ever handling Amazon States Language in your project again.\\n\\n## Final files\\n\\n```json\\n# modules/templates/stepfunction_definition.tftpl\\n\\n{\\n    \\"Comment\\": \\"My state machine\\",\\n    \\"StartAt\\": \\"Choice\\",\\n    \\"States\\": {\\n        \\"Handle Notification\\": {\\n            \\"Type\\": \\"Task\\",\\n            \\"Resource\\": \\"arn:aws:states:::lambda:invoke\\",\\n            \\"OutputPath\\": \\"$.Payload\\",\\n            \\"Parameters\\": {\\n              \\"Payload.$\\": \\"$\\",\\n              \\"FunctionName\\": \\"${lambda_function_name}\\"\\n            },\\n            \\"End\\": true\\n        },\\n        \\"Choice\\": {\\n            \\"Type\\": \\"Choice\\",\\n            \\"Choices\\": ${jsonencode(choices)},\\n            \\"Default\\": \\"Pass\\"\\n        },\\n        %{ for key, data in ssm_execution }\\n        \\"${key}\\": ${jsonencode(data)},\\n        %{ endfor }\\n        \\"Pass\\": {\\n            \\"Type\\": \\"Pass\\",\\n            \\"End\\": true\\n        }\\n    }\\n}\\n```\\n\\n```json\\nlocals {\\n    choices = flatten([for item in var.ssm_params: [\\n        for key, value in item : {\\n            \\"IsPresent\\": true,\\n            \\"Next\\": \\"SSM Execution-${key}\\"\\n            \\"Variable\\": \\"$.${key}\\",\\n        }]\\n    ])\\n\\n    ssm_execution = merge(flatten([for item in var.ssm_params: [ \\n                    for key, value in item : {\\n                        \\"SSM Execution-${key}\\": {\\n                            \\"Type\\": \\"Task\\",\\n                            \\"Parameters\\": {\\n                              \\"DocumentName.$\\": \\"$.DocumentName\\",\\n                              \\"Parameters\\": {\\"$.${key}\\": \\"${value}\\"}\\n                            },\\n                            \\"Resource\\": \\"arn:aws:states:::aws-sdk:ssm:startAutomationExecution\\",\\n                            \\"Next\\": \\"Handle Notification\\",\\n                            \\"ResultPath\\": \\"$.TaskResult\\"\\n                        }\\n                    }\\n                    ]]\\n                )...)\\n\\n    file = templatefile(\\"${path.module}/templates/stepfunction_definition.tpl\\", {\\n        lambda_function_name = var.lambda_function_name,\\n        choices_list = local.choices,\\n        ssm_execution = local.ssm_execution\\n    })\\n}\\n\\nvariable \\"lambda_function_name\\" {\\n    description = \\"Lambda function name\\"\\n    type        = string\\n}\\n\\nvariable \\"ssm_params\\" {\\n    description = \\"List of SSM param objects to be injected into the Step Function definition\\"\\n    type = list\\n}\\n\\nresource \\"aws_sfn_state_machine\\" \\"sfn_state_machine\\" {\\n    name        = var.step_function_name\\n    role_arn    = var.sf_role_arn\\n    definition  = local.file\\n}\\n```\\n\\n```json\\n# main.tf (full file)\\n\\nmodule \\"my_step_function\\" {\\n    source                = \\"./modules/step_functions\\"\\n    step_function_name    = \\"autoremediation_sf\\"\\n    sf_role_arn           = \\"arn:aws:iam::123456789012:role/autoremediation_sf\\"\\n    lambda_function_name  = \\"autoremediation_lambda\\"\\n\\n    ssm_params = [                \\n        {\\"InstanceId\\": \\"States.Array($.InstanceId)\\"},    \\n        {\\"SecurityGroupIds\\": \\"States.Array($.SecurityGroupIds)\\"}\\n    ]\\n}\\n```"},{"id":"terraform-ternary-error","metadata":{"permalink":"/blog/tech/terraform-ternary-error","source":"@site/tech/2023-03-18-terraform-ternary-errors/index.md","title":"Bypassing Terraform error: \u201cThe true and false result expressions must have consistent types\u201d","description":"Have you ever came across this Terraform error \u2014 when you intentionally want your ternary to output different types?","date":"2023-03-18T00:00:00.000Z","formattedDate":"March 18, 2023","tags":[{"label":"infra","permalink":"/blog/tech/tags/infra"},{"label":"terraform","permalink":"/blog/tech/tags/terraform"},{"label":"workarounds","permalink":"/blog/tech/tags/workarounds"},{"label":"devops","permalink":"/blog/tech/tags/devops"}],"readingTime":1.88,"hasTruncateMarker":true,"authors":[{"name":"Manu Magalh\xe3es","title":"DevSecOps Engineer","url":"https://github.com/magmanu","imageURL":"https://github.com/magmanu.png","key":"manu"}],"frontMatter":{"slug":"terraform-ternary-error","title":"Bypassing Terraform error: \u201cThe true and false result expressions must have consistent types\u201d","authors":"manu","tags":["infra","terraform","workarounds","devops"]},"prevItem":{"title":"Generating Dynamic JSON in Terraform","permalink":"/blog/tech/dynamic-json-in-terraform"},"nextItem":{"title":"How to Migrate CodeCommit to GitHub \u2014 and Keep your Amplify Pipeline","permalink":"/blog/tech/migrate-codecommit-to-github"}},"content":"Have you ever came across this Terraform error \u2014 when you intentionally want your ternary to output different types?\\n\\n>The true and false result expressions must have consistent types\\n\\nTo bypass this Terraform limitation, check the tip below. I\'ll follow it with two examples to clarify the usage:\\n\\n```terraform\\nattribute = [\\n    <desired output if true>, \\n    <desired output if false>\\n    ][<condition> ? 0 : 1]\\n```\\n\\n\x3c!--truncate--\x3e\\n\\n## Simple example\\n\\n```hcl\\nlocals {\\n    dynamic_value = [\\n      {\\"region\\": \\"${var.region}\\"}, \\n      \\"unavailable\\"\\n      ][var.region == \\"eu-west-1\\" ? 0 : 1 ]\\n}\\n```\\n\\nHere, `local.dynamic_value` will return an object if the AWS region is Ireland, or the string `\\"unavailable\\"` for any other region.\\n\\n### Wait, what\'s just happened?\\n\\nInstead of using the ternary in the traditional way, we defined a tuple (aka, a list with mixed types), and used the ternary to return the index for the output we really want. Thanks mariux for the trick.\\n\\n## Less simple example\\n\\nYou can also inject dynamic outputs if needs be. I\'m not saying this is Terraform best practice, or that it will be pretty. But sometimes a woman has to do what she has to do.\\n\\nIn my case, I was trying to abstract a Step Function `Choice`. The ternary logic I needed was: if the object contains only one key, return a certain JSON structure. If the object contains multiple keys, return a different JSON structure.\\nAnd this is how my condition panned out:\\n\\n```hcl\\n# There is a reason why this variable is a list\\n# but that is beside the point now\\n\\nvariable \\"ssm_params\\" {\\n    description = \\"Parameter required by SSM Documents to enable KMS key rotation\\"\\n    default     = [{\\"KeyId\\": \\"States.Array($.KeyId)\\",\\n                    \\"AutomationAssumeRole\\": \\"States.Array($.AutomationAssumeRole)\\"}]\\n}\\n\\nlocals {\\n  choices = [for item in var.ssm_params: [\\n    merge(flatten([\\n      # Case: Choice step has single condition (isTrue)\\n      for key, value in item: {\\n        \\"IsPresent\\": true,\\n        \\"Next\\": \\"SSM-${key}\\",\\n        \\"Variable\\": \\"$.${key}\\"\\n      }\\n    ])...), \\n    merge([\\n      # Case: Choice step has multiple conditions (AND) \\n      { \\"And\\" : [\\n          for key, value in item: \\n            {\\n              \\"IsPresent\\": true,\\n              \\"Variable\\": \\"$.${key}\\"\\n            }\\n        ],\\n      \\"Next\\": \\"SSM-${join(\\"\\", sort([keys(item)]...))}\\"\\n      }\\n    ]...)\\n    ][length(flatten([keys(item)])) == 1 ? 0 : 1]\\n]\\n``` \\n`\\nDon\'t ask me how my laptop haven\u2019t gone through the window. But there you have it \u2014 enjoy your newfound freedom :P"},{"id":"migrate-codecommit-to-github","metadata":{"permalink":"/blog/tech/migrate-codecommit-to-github","source":"@site/tech/2021-10-13-migrate-codecommit-to-github/index.md","title":"How to Migrate CodeCommit to GitHub \u2014 and Keep your Amplify Pipeline","description":"This tutorial includes guidance for three different scenarios in your GitHub administration:","date":"2021-10-13T00:00:00.000Z","formattedDate":"October 13, 2021","tags":[{"label":"infra","permalink":"/blog/tech/tags/infra"},{"label":"github","permalink":"/blog/tech/tags/github"},{"label":"amplify","permalink":"/blog/tech/tags/amplify"},{"label":"aws","permalink":"/blog/tech/tags/aws"},{"label":"ci/cd","permalink":"/blog/tech/tags/ci-cd"},{"label":"tutorial","permalink":"/blog/tech/tags/tutorial"}],"readingTime":5.07,"hasTruncateMarker":true,"authors":[{"name":"Manu Magalh\xe3es","title":"DevSecOps Engineer","url":"https://github.com/magmanu","imageURL":"https://github.com/magmanu.png","key":"manu"}],"frontMatter":{"slug":"migrate-codecommit-to-github","title":"How to Migrate CodeCommit to GitHub \u2014 and Keep your Amplify Pipeline","authors":"manu","tags":["infra","github","amplify","aws","ci/cd","tutorial"]},"prevItem":{"title":"Bypassing Terraform error: \u201cThe true and false result expressions must have consistent types\u201d","permalink":"/blog/tech/terraform-ternary-error"}},"content":"This tutorial includes guidance for three different scenarios in your GitHub administration:\\n\\n1. when your repo is in your personal account;\\n2. when your app is under a GitHub Org and admins grant you the permissions you need; and\\n3. when your repo is under a GitHub Org and admins do NOT grant you the permissions you need.\\n\\n_Pre-requisites: Relevant access and permissions for CodeCommit and Amplify. You also need a working GitHub account._\\n\\n\x3c!--truncate--\x3e\\n\\n## Migrating Your Repo\\n\\n1. Open your CLI and cd into your existing CodeCommit local folder.\\n2. Run `git remote get-url origin` to get the external clone URL for the project you plan to migrate to GitHub.\\n3. Create a temporary folder by running `mkdir ../temp-migration` and open it in the CLI by running `cd ../temp-migration`.\\n4. Run `git clone --bare` followed by the clone URL you got in step 2. An example would be `git clone --bare <https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/name-of-your-codecommit-directory>`.\\n\\n<br/>\\n\\n:::note Educational note\\n\\nThe flag `--bare` is a way to fully clone your repo while cutting all its ties with the remote (in CodeCommit, in this case). You still get all your branches, tags and everything, but the cloned repo is completely independent from the remote.\\n:::\\n\\n<br/>\\n\\n5. Create a new GitHub repo. To prevent issues, don\u2019t add any README, .gitignore or anything. After you click \u201cCreate repo\u201d, the only thing you should do is to copy the external clone URL as shown below. Don\u2019t run any git init, fist commit or anything. Just copy the relevant path as shown below.\\n\\n<br/>\\n\\n![Git clone SSH](./clone_ssh.webp)\\n\\n<br/>\\n\\n6. Back to your terminal, cd into your bare git repo by running `cd name-of-your-codecommit-directory.git` and run `git push --mirror` followed by the clone path you got in step 5. In my case, it will be `git push --mirror <https://github.com/my-username/my-project.git>`.\\n\\nThat\u2019s it, migration is complete now.\\n\\n### Confirm\\n\\nTo confirm all went well, go back to GitHub and refresh the page. You\u2019ll see that your repo will be there as expected, including all your commit history, branches and everything. To start working on your migrated GitHub repo, simply clone it and get on with business as usual :)\\n\\n### Clean up\\n\\nIf you followed the instructions strictly, now it\u2019s time to delete your temporary folder. Go back to your terminal and run `cd ../.. and rm -rf temp-migration`. If you used your OS\u2019s tmp folder instead, skip this step.\\n\\n## Rewiring your Amplify Pipeline\\n\\nNow that you migrated the code to GitHub, how do you leverage your already existing Amplify pipeline that was linked to the CodeCommit repo?\\n\\n### Run  the `update-app` command\\n```\\nAWS_PROFILE=YOUR_PROFILE AWS_DEFAULT_REGION=YOUR_REGION aws amplify update-app --app-id AMPLIFY_APP_ID --repository REPOSITORY_URL --access-token ACCESS_TOKEN\\n```\\n`AMPLIFY_APP_ID`: To find your app id, go to the Amplify console. Under App settings, click General and look for the App ARN. The app id should be the alphanumeric string at the very end of the ARN. You can find it in your Amplify console: App settings > General. The id is shown as \u201cREDACTED\u201d in the screenshot below:\\n\\n<br/>\\n\\n![Amplify App Id](./amplify_data.webp)\\n\\n<br/>\\n\\n`REPOSITORY_URL`: It\u2019s the one you got in the step 5 of the migration.\\n`ACCESS_TOKEN`: The access token is s a Personal Access Token that you can generate in GitHub. Beware that this token has to be generated by the GitHub repo owner.\\n\\n### Re-authenticate your Amplify app\\n\\n:::tip Real life XP\\n\\nCompanies can be very strict about the GitHub Apps they approve. If you get blocked because your admins, for whatever reason, won\'t approve the Amplify App, jump to the section [\\"The Webhook Approach\\"](#the-webhook-approach).\\n:::\\n\\nNow you can reconnect your app. In the same page you got your ARN, if you look above the ARN you\u2019ll find a button \u201cReconnect repository\u201d. When you click it, you\u2019ll be directed to the Oath flow in GitHub.\\n- **If the migrated repo is NOT under an Organization**, you can click the \u201cAuthorize aws-amplify-console\u201d button. You\u2019ll be redirected to the Amplify console, and once there, click again the reconnect repository, select the relevant repo and off you go! Enjoy!\\n- **If the migrated repo is under your Organization**, you can request the OAuth permission to the Amplify App by clicking a button. It will show a request pending message until your admin approves it (you\u2019ll receive an email when they do).\\n\\n<br/>\\n\\n![Authorize Amplify Github App](./authorize_amplify_app.webp)\\n\\n<br/>\\n\\nOnce Oauth is granted, go back to your Amplify app and click Reconnect repository again. You\'ll be shown repos both from your org and from your own account to choose from. Select the relevant one and have fun with your new migrated repos!\\n\\n### The Webhook Approach\\n\\nAn alternative to using the Amplify GitHub App is to create an incoming webhook in Amplify instead.\\nTo do that, under App settings, select Build settings nd click Create Webhook (both shown in orange below).\\n\\n<br/>\\n\\n![Amplify Build Settings](./amplify_build_settings.webp)\\n\\n<br/>\\n\\nIn the pop-up, type in a name and select a branch to build. Your new webhook will show in the Amplify interface. Copy its URL, we\u2019ll use it in GitHub.\\n\\n<br/>\\n\\n![Amplify Incming Webhooks](./amplify_incoming_webhooks.webp)\\n\\n<br/>\\n\\nNow go back to your migrated GitHub repo, select Settings > Webhooks and click the button Add webhook.\\n\\n<br/>\\n\\n![Adding GitHub Webhooks](./github_webhooks.webp)\\n\\nWorkaround completed.\\n\\n### Caveats of the Webhook Approach\\n\\nIf you go down the webhook path, be mindful that:\\n\\n- If you need to connect multiple branches to Amplify, you need to create a webhook in Amplify to each of them, and add each to GitHub, one by one. If you feel tempted to automate it, have a chat to your GitHub Org admin to clear up how the OAuth permission for the Amplify App can be done. Automation in this end is an overkill and waste of time.\\n- Any git push will trigger the webhook in every single frontend deployment in your Amplify. In other words, if you have the branches \u201cmain\u201d, \u201crelease\u201d, \u201cdev\u201d, \u201cfeature/a\u201d, and \u201cfeature/b\u201d, every time your colleague pushes his changes in \u201cfeature/b\u201d to GitHub, the pipeline will be triggered for all the five branches.\\n\\n\\nHope this was helpful, see you!"}]}')}}]);