---
slug: terraform-ternary-error
title: 'Bypassing Terraform error: “The true and false result expressions must have consistent types”'
authors: manu
tags: [infra, terraform, workarounds, devops]
---

Have you ever came across this Terraform error — when you intentionally want your ternary to output different types?

>The true and false result expressions must have consistent types

To bypass this Terraform limitation, check the tip below. I'll follow it with two examples to clarify the usage:

```terraform
attribute = [
    <desired output if true>, 
    <desired output if false>
    ][<condition> ? 0 : 1]
```

<!--truncate-->

## Simple example

```hcl
locals {
    dynamic_value = [
      {"region": "${var.region}"}, 
      "unavailable"
      ][var.region == "eu-west-1" ? 0 : 1 ]
}
```

Here, `local.dynamic_value` will return an object if the AWS region is Ireland, or the string `"unavailable"` for any other region.

### Wait, what's just happened?

Instead of using the ternary in the traditional way, we defined a tuple (aka, a list with mixed types), and used the ternary to return the index for the output we really want. Thanks mariux for the trick.

## Less simple example

You can also inject dynamic outputs if needs be. I'm not saying this is Terraform best practice, or that it will be pretty. But sometimes a woman has to do what she has to do.

In my case, I was trying to abstract a Step Function `Choice`. The ternary logic I needed was: if the object contains only one key, return a certain JSON structure. If the object contains multiple keys, return a different JSON structure.
And this is how my condition panned out:

```hcl
# There is a reason why this variable is a list
# but that is beside the point now

variable "ssm_params" {
    description = "Parameter required by SSM Documents to enable KMS key rotation"
    default     = [{"KeyId": "States.Array($.KeyId)",
                    "AutomationAssumeRole": "States.Array($.AutomationAssumeRole)"}]
}

locals {
  choices = [for item in var.ssm_params: [
    merge(flatten([
      # Case: Choice step has single condition (isTrue)
      for key, value in item: {
        "IsPresent": true,
        "Next": "SSM-${key}",
        "Variable": "$.${key}"
      }
    ])...), 
    merge([
      # Case: Choice step has multiple conditions (AND) 
      { "And" : [
          for key, value in item: 
            {
              "IsPresent": true,
              "Variable": "$.${key}"
            }
        ],
      "Next": "SSM-${join("", sort([keys(item)]...))}"
      }
    ]...)
    ][length(flatten([keys(item)])) == 1 ? 0 : 1]
]
``` 
`
Don't ask me how my laptop haven’t gone through the window. But there you have it — enjoy your newfound freedom :P
