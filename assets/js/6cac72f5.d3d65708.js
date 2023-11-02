"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2072],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>f});var a=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function r(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var l=a.createContext({}),c=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=c(e.components);return a.createElement(l.Provider,{value:n},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,u=r(e,["components","mdxType","originalType","parentName"]),m=c(t),d=i,f=m["".concat(l,".").concat(d)]||m[d]||p[d]||o;return t?a.createElement(f,s(s({ref:n},u),{},{components:t})):a.createElement(f,s({ref:n},u))}));function f(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,s=new Array(o);s[0]=d;var r={};for(var l in n)hasOwnProperty.call(n,l)&&(r[l]=n[l]);r.originalType=e,r[m]="string"==typeof e?e:i,s[1]=r;for(var c=2;c<o;c++)s[c]=t[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},8332:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var a=t(7462),i=(t(7294),t(3905));const o={slug:"dynamic-json-in-terraform",title:"Generating Dynamic JSON in Terraform",authors:"manu",tags:["infra","terraform","IaC","step functions","devops"]},s=void 0,r={permalink:"/blog/tech/dynamic-json-in-terraform",source:"@site/tech/2023-03-18-dynamic-json-in-terraform/index.md",title:"Generating Dynamic JSON in Terraform",description:"In this article I\u2019ll use Step Functions as a case study, but you can do it with whatever resources you want.",date:"2023-03-18T00:00:00.000Z",formattedDate:"March 18, 2023",tags:[{label:"infra",permalink:"/blog/tech/tags/infra"},{label:"terraform",permalink:"/blog/tech/tags/terraform"},{label:"IaC",permalink:"/blog/tech/tags/ia-c"},{label:"step functions",permalink:"/blog/tech/tags/step-functions"},{label:"devops",permalink:"/blog/tech/tags/devops"}],readingTime:9.085,hasTruncateMarker:!0,authors:[{name:"Manu Magalh\xe3es",title:"DevSecOps Engineer",url:"https://github.com/magmanu",imageURL:"https://github.com/magmanu.png",key:"manu"}],frontMatter:{slug:"dynamic-json-in-terraform",title:"Generating Dynamic JSON in Terraform",authors:"manu",tags:["infra","terraform","IaC","step functions","devops"]},prevItem:{title:"Draft Title",permalink:"/blog/tech/another-test"},nextItem:{title:"Bypassing Terraform error: \u201cThe true and false result expressions must have consistent types\u201d",permalink:"/blog/tech/terraform-ternary-error"}},l={authorsImageUrls:[void 0]},c=[{value:"What we\u2019re going to do",id:"what-were-going-to-do",level:2},{value:"Case 1: Injecting a variable into JSON",id:"case-1-injecting-a-variable-into-json",level:2},{value:"Case 2: Injecting a list into a JSON",id:"case-2-injecting-a-list-into-a-json",level:2},{value:"The simplest solution: static list",id:"the-simplest-solution-static-list",level:3},{value:"The logic-heavy solution: dynamic list",id:"the-logic-heavy-solution-dynamic-list",level:3},{value:"Case 3: Injecting an object into a JSON",id:"case-3-injecting-an-object-into-a-json",level:2},{value:"Final files",id:"final-files",level:2}],u={toc:c},m="wrapper";function p(e){let{components:n,...t}=e;return(0,i.kt)(m,(0,a.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"In this article I\u2019ll use Step Functions as a case study, but you can do it with whatever resources you want."),(0,i.kt)("h2",{id:"what-were-going-to-do"},"What we\u2019re going to do"),(0,i.kt)("p",null,"The following JSON will become dynamic. We\u2019ll replace static values with:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"#case-1-injecting-a-variable-into-json"},"A variable")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"#case-2-injecting-a-list-into-a-json"},"A dynamic list")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("a",{parentName:"li",href:"#case-3-injecting-an-object-into-a-json"},"One or more dynamic objects"))),(0,i.kt)("p",null,"(I\u2019ve added non idiomatic comments inside the code blocks, but it\u2019s just to show what exactly we\u2019re doing.)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'# Reference JSON\n{\n    "Comment": "My state machine",\n    "StartAt": "Choice",\n    "States": {\n        "Handle Notification": {\n            "Type": "Task",\n            "Resource": "arn:aws:states:::lambda:invoke",\n            "OutputPath": "$.Payload",\n            "Parameters": {\n              "Payload.$": "$",\n              "FunctionName": "my_function_name"  <-- Case 1: Replace with dynamic string\n            },\n            "End": true\n        },\n        "Choice": {\n          "Type": "Choice",\n          "Choices": [                            -------\n             {                                           |\n               "IsPresent": true,                        |\n               "Next": "SSM Execution-InstanceId",       |\n               "Variable": "$.InstanceId"                |\n              },                                         |\n              {                                          |-- Case 2: Replace with dynamic list\n               "IsPresent": true,                        |\n               "Next": "SSM Execution-SecurityGroupIds", |\n               "Variable": "$.SecurityGroupIds"          |\n              }                                          |\n            ],                                     -------\n            "Default": "Pass"\n        },\n        "SSM Execution-InstanceId": {          -------\n            "Next": "Pass",                          |\n            "Parameters": {                          |\n                "DocumentName.$": "$.DocumentName",  |\n                "Parameters": {                      |\n                    "InstanceId.$": "States.Array($.InstanceId)"\n                }                                    |\n              },                                     |\n            "Resource": "arn:aws:states:::aws-sdk:ssm:startAutomationExecution",\n            "ResultPath": "$.TaskResult",            |\n            "Type": "Task"                           |\n        },                                           |-- Case 3: Replace with one or more dynamic objects\n        "SSM Execution-SecurityGroupIds": {          |\n            "Next": "Pass",                          |\n            "Parameters": {                          |\n                "DocumentName.$": "$.DocumentName",  |\n                "Parameters": {                      |\n                    "SecurityGroupIds.$": "States.Array($.SecurityGroupIds)"\n                }                                    |\n            },                                       |\n            "Resource": "arn:aws:states:::aws-sdk:ssm:startAutomationExecution",\n            "ResultPath": "$.TaskResult",            |\n            "Type": "Task"                           |\n        },                                     -------\n        "Pass": {\n            "Type": "Pass",\n            "End": true\n        }\n    }\n}\n')),(0,i.kt)("p",null,"First, save the JSON above in a template format. You can use the extension ",(0,i.kt)("inlineCode",{parentName:"p"},".tpl")," or ",(0,i.kt)("inlineCode",{parentName:"p"},".tftpl"),". Although Terraform recommends using the second option, there's no hard rule about which to use."),(0,i.kt)("h2",{id:"case-1-injecting-a-variable-into-json"},"Case 1: Injecting a variable into JSON"),(0,i.kt)("p",null,"Let\u2019s begin by updating the ",(0,i.kt)("inlineCode",{parentName:"p"},"FunctionName")," value in the template, using string interpolation:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'# modules/templates/stepfunction_definition.tftpl (extract)\n\n{"Handle Notification": {\n        "Type": "Task",\n        "Resource": "arn:aws:states:::lambda:invoke",\n        "OutputPath": "$.Payload",\n        "Parameters": {\n          "Payload.$": "$",\n          "FunctionName": "${lambda_function_name}"\n        },\n        "End": true\n      }\n}\n')),(0,i.kt)("p",null,"To render the template as a valid JSON, we can use Terraform\u2019s ",(0,i.kt)("inlineCode",{parentName:"p"},"templatefile")," function. It takes two arguments: the template file path and a map of variables that will be injected at runtime. For the sake of the argument, let\u2019s keep our new module as dynamic as possible. Locals, variables and resources are also included just to show how things work together."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'# modules/stepfunction.tf (full file)\n\nlocals {\n    file = templatefile("${path.module}/templates/stepfunction_definition.tpl", {\n        lambda_function_name = var.lambda_function_name\n    })\n}\nvariable "lambda_function_name" {\n    description = "Lambda function name"\n    type        = string\n}\n\nresource "aws_sfn_state_machine" "sfn_state_machine" {\n    name        = var.step_function_name\n    role_arn    = var.sf_role_arn\n    definition  = local.file\n}\n')),(0,i.kt)("p",null,"Now we write a top level ",(0,i.kt)("inlineCode",{parentName:"p"},"main.tf"),", where the actual values go."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'# main.tf (full file)\n\nmodule "my_step_function" {\n  source                = "./modules/step_functions"\n  step_function_name    = "autoremediation_sf"\n  sf_role_arn           = "arn:aws:iam::123456789012:role/autoremediation_sf"\n  lambda_function_name  = "autoremediation_lambda"\n}\n')),(0,i.kt)("p",null,"To check that your variable was successfully injected, run ",(0,i.kt)("inlineCode",{parentName:"p"},"terraform init && terraform plan"),"."),(0,i.kt)("h2",{id:"case-2-injecting-a-list-into-a-json"},"Case 2: Injecting a list into a JSON"),(0,i.kt)("p",null,"As a refresher, this is the list we\u2019re refactoring:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'# modules/templates/stepfunction_definition.tftpl (extract)\n\n"Choice": {\n    "Type": "Choice",\n    "Choices": [                              -------\n        {                                           |\n          "IsPresent": true,                        |\n          "Next": "SSM Execution-InstanceId",       |\n          "Variable": "$.InstanceId"                |\n        },                                          |\n        {                                           |--- Case 2: Abstract list\n          "IsPresent": true,                        |\n          "Next": "SSM Execution-SecurityGroupIds", |\n          "Variable": "$.SecurityGroupIds"          |\n        }                                           |\n    ],                                        -------\n    "Default": "Pass"\n}\n')),(0,i.kt)("p",null,"So let\u2019s refactor the template again. We\u2019ll use a Terraform function called ",(0,i.kt)("inlineCode",{parentName:"p"},"jsonencode"),", as it ensures that the list of objects we\u2019re passing to the template will be properly rendered as JSON:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'# modules/templates/stepfunction_definition.tftpl(extract)\n\n"Choice": {\n    "Type": "Choice",\n    "Choices": ${jsonencode(choices_list)},  <--- List in one single line! --\x3e\n    "Default": "Pass"\n    }\n')),(0,i.kt)("p",null,"Now, we\u2019ll try two ways to feed the template with our dynamic list."),(0,i.kt)("h3",{id:"the-simplest-solution-static-list"},"The simplest solution: static list"),(0,i.kt)("p",null,"One option is to create a variable that will pass a ready-made list for you:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'# modules/stepfunction.tf (extract)\n\nlocals {\n    file = templatefile("${path.module}/templates/stepfunction_definition.tpl", {\n        lambda_function_name = var.lambda_function_name\n        choices_list = var.my_list   <------- Add this line --\x3e\n    })\n}\n\nvariable "my_list" {                <-------- And this variable --\x3e\n    description = "A list of whatever"\n    type = list\n}\n')),(0,i.kt)("p",null,"Then, in top level module, pass the variable values. The JSON is now dynamic, but the list is pretty much \u201cstatic\u201d."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'# main.tf (full file)\n\nmodule "my_step_function" {\n    source                = "./modules/step_functions"\n    step_function_name    = "autoremediation_sf"\n    sf_role_arn           = "arn:aws:iam::123456789012:role/autoremediation_sf"\n    lambda_function_name  = "autoremediation_lambda"\n\n    my_list = [{                            <-------- New value --\x3e\n        "IsPresent": true,\n        "Next": "SSM Execution-InstanceId",\n        "Variable": "$.InstanceId"\n    }]\n}\n')),(0,i.kt)("h3",{id:"the-logic-heavy-solution-dynamic-list"},"The logic-heavy solution: dynamic list"),(0,i.kt)("p",null,"What if you want the list itself to be dynamic too? For example, you want the values for ",(0,i.kt)("inlineCode",{parentName:"p"},"Next")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Variable")," to be extracted from a parameter and injected to list before it\u2019s sent to the json?\nIn our example, the values that populate ",(0,i.kt)("inlineCode",{parentName:"p"},"Next")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Variable")," come from keys provided by ",(0,i.kt)("inlineCode",{parentName:"p"},"ssm_params"),", in the top level file:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'# main.tf (full file)\n\nmodule "my_step_function" {\n    source                = "./modules/step_functions"\n    step_function_name    = "autoremediation_sf"\n    sf_role_arn           = "arn:aws:iam::123456789012:role/autoremediation_sf"\n    lambda_function_name  = "autoremediation_lambda"\n\n                       <--- Static list is no longer here --\x3e\n    ssm_params = [     <--- We want to populate the list with these keys! --\x3e\n        {"InstanceId": "States.Array($.InstanceId)"},    \n        {"SecurityGroupIds": "States.Array($.SecurityGroupIds)"}\n    ]\n}\n')),(0,i.kt)("p",null,"Now our module becomes:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'# modules/stepfunction.tf (full file)\n\nlocals {\n    choices_list = flatten([for item in var.ssm_params: [\n        for key, value in item : {\n            "IsPresent": true,\n            "Next": "SSM Execution-${key}"\n            "Variable": "$.${key}",\n        }]\n    ])\n    file = templatefile("${path.module}/templates/stepfunction_definition.tpl", {\n        lambda_function_name = var.lambda_function_name,\n        choices_list = local.choices_list\n    })\n}\nvariable "lambda_function_name" {\n    description = "Lambda function name"\n    type        = string\n}\nvariable "ssm_params" {\n    description = "List of SSM param objects to be injected into the Step Function definition"\n    type = list\n}\nresource "aws_sfn_state_machine" "sfn_state_machine" {\n    name        = var.step_function_name\n    role_arn    = aws_iam_role.step_function_role_arn\n    definition  = local.file\n}\n')),(0,i.kt)("p",null,"Starting with the line ",(0,i.kt)("inlineCode",{parentName:"p"},"choices_list = flatten([for item in var.ssm_params:")," ignore ",(0,i.kt)("inlineCode",{parentName:"p"},"flatten")," for a bit and look at the loop. Because ",(0,i.kt)("inlineCode",{parentName:"p"},"ssm_params")," is a list, we have to loop through it to access each item. The loop is wrapped in square brackets, which means the output will be a list. The ",(0,i.kt)("inlineCode",{parentName:"p"},":")," that follows is just part of the loop syntax."),(0,i.kt)("p",null,"Next line, another loop: ",(0,i.kt)("inlineCode",{parentName:"p"},"for key, value in item : {")," . This loop goes through each object in ",(0,i.kt)("inlineCode",{parentName:"p"},"ssm_params")," to access key and the value, so we can extract and restructure the data. The loop is also wrapped with square brackets, meaning that every object will unfortunately be inside their own list."),(0,i.kt)("p",null,"Now, remember ",(0,i.kt)("inlineCode",{parentName:"p"},"flatten"),"? We're using this Terraform function because, as each loop returns a list, the result looks like this: ",(0,i.kt)("inlineCode",{parentName:"p"},"[[obj1],[obj2]]"),". But we need a clean list of objects, and flatten can get rid of the unnecessary nesting."),(0,i.kt)("p",null,"Done."),(0,i.kt)("h2",{id:"case-3-injecting-an-object-into-a-json"},"Case 3: Injecting an object into a JSON"),(0,i.kt)("p",null,"Now, the most exciting part. We will abstract whole objects. (In this particular case, this means whole steps can become dynamic despite Amazon States Language!)\nHere\u2019s what we\u2019re refactoring away:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'"Steps": {\n    "SSM Execution-InstanceId": {             -------\n            "Next": "Pass",                          |\n            "Parameters": {                          |\n                "DocumentName.$": "$.DocumentName",  |\n                "Parameters": {                      |\n                    "InstanceId.$": "States.Array($.InstanceId)"\n                }                                    |\n              },                                     |\n            "Resource": "arn:aws:states:::aws-sdk:ssm:startAutomationExecution",\n            "ResultPath": "$.TaskResult",            |\n            "Type": "Task"                           |\n        },                                           |---------- ALL THIS!\n        "SSM Execution-SecurityGroupIds": {          |\n            "Next": "Pass",                          |\n            "Parameters": {                          |\n                "DocumentName.$": "$.DocumentName",  |\n                "Parameters": {                      |\n                    "SecurityGroupIds.$": "States.Array($.SecurityGroupIds)"\n                }                                    |\n            },                                       |\n            "Resource": "arn:aws:states:::aws-sdk:ssm:startAutomationExecution",\n            "ResultPath": "$.TaskResult",            |\n            "Type": "Task"                           |\n        }                                     -------\n}\n')),(0,i.kt)("p",null,"As usual, let\u2019s modify the template:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'# modules/templates/stepfunction_definition.tftpl (extract)\n\n"States": {\n    "Choice": {\n      "Type": "Choice",\n      "Choices": ${jsonencode(choices)},\n      "Default": "Pass"\n    },\n    %{ for key, data in ssm_execution }   <--- New section ---\x3e\n        "${key}": ${jsonencode(data)},\n    %{ endfor }\n    "Handle Notification": {<--- blahblah--\x3e}\n    }\n')),(0,i.kt)("p",null,"Here\u2019s where I ask you to trust Terraform even if your linter freaks out."),(0,i.kt)("p",null,"What\u2019s happening? We\u2019re using the ",(0,i.kt)("a",{parentName:"p",href:"https://developer.hashicorp.com/terraform/language/expressions/strings#directives"},"Terraform directive")," syntax ",(0,i.kt)("inlineCode",{parentName:"p"},"%{}")," to write a dynamic string (yeah, templates are treated as strings)."),(0,i.kt)("p",null,"The line ",(0,i.kt)("inlineCode",{parentName:"p"},"%{ for key, data in ssm_execution }")," informs the ",(0,i.kt)("inlineCode",{parentName:"p"},"templatefile")," function that an iteration is coming, and it will end when it reaches the line ",(0,i.kt)("inlineCode",{parentName:"p"},"%{ endfor }"),". In the meanwhile, it should keep creating a key-value pair with the format ",(0,i.kt)("inlineCode",{parentName:"p"},'"my_key": {"some": "json"},'),"."),(0,i.kt)("p",null,"Pretty cool, uh?"),(0,i.kt)("p",null,"So now let\u2019s add the local ",(0,i.kt)("inlineCode",{parentName:"p"},"ssm_execution"),", the logic that will populate all this."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'# modules/stepfunction.tf (extract)\n\nlocals {\n    choices = flatten([for item in var.ssm_params: [\n        for key, value in item : {\n            "IsPresent": true,\n            "Next": "SSM Execution-${key}"\n            "Variable": "$.${key}",\n        }]\n    ])\n\n    <--- Oh hey! --\x3e\n    ssm_execution = merge(flatten([for item in var.ssm_params: [ \n                    for key, value in item : {\n                        "SSM Execution-${key}": {\n                            "Type": "Task",\n                            "Parameters": {\n                              "DocumentName.$": "$.DocumentName",\n                              "Parameters": {"$.${key}": "${value}"}\n                            },\n                            "Resource": "arn:aws:states:::aws-sdk:ssm:startAutomationExecution",\n                            "Next": "Handle Notification",\n                            "ResultPath": "$.TaskResult"\n                        }\n                    }\n                    ]]\n                )...)\n\n    file = templatefile("${path.module}/templates/stepfunction_definition.tpl", {\n        lambda_function_name = var.lambda_function_name,\n        choices_list = local.choices,\n        ssm_execution = local.ssm_execution <--- Oh hi! --\x3e\n    })\n}\n')),(0,i.kt)("p",null,"We\u2019re already familiar with loops and flatten, so let\u2019s talk about the new kids on the block: ",(0,i.kt)("inlineCode",{parentName:"p"},"merge")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"..."),"."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"merge")," is a terraform function that takes multiple objects and merge them together into a single object. So, if we have two objects like"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'  {\n    "a": 1,\n    "b": 2\n  },\n  {\n    "c": 3,\n    "d": 4\n  }\n')),(0,i.kt)("p",null,"the ",(0,i.kt)("inlineCode",{parentName:"p"},"merge")," function will consolidate them to:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "a": 1,\n    "b": 2,\n    "c": 3,\n    "d": 4\n}\n')),(0,i.kt)("p",null,"And if you were paying attention, you noticed that the merge function in our module is ",(0,i.kt)("strong",{parentName:"p"},"not")," taking several object as arguments, but a flatten function (which outputs a single list). We have ",(0,i.kt)("inlineCode",{parentName:"p"},"...")," to thank for the trick.\nIn Terraform, ",(0,i.kt)("inlineCode",{parentName:"p"},"...")," (three dots) work like the Javascript spread operator: it expands our list into separate arguments.\nSo that\u2019s it. Our final template will literally be half the size of our original JSON, it\u2019s dynamic, reusable, and best of all \u2014 frees you from ever handling Amazon States Language in your project again."),(0,i.kt)("h2",{id:"final-files"},"Final files"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'# modules/templates/stepfunction_definition.tftpl\n\n{\n    "Comment": "My state machine",\n    "StartAt": "Choice",\n    "States": {\n        "Handle Notification": {\n            "Type": "Task",\n            "Resource": "arn:aws:states:::lambda:invoke",\n            "OutputPath": "$.Payload",\n            "Parameters": {\n              "Payload.$": "$",\n              "FunctionName": "${lambda_function_name}"\n            },\n            "End": true\n        },\n        "Choice": {\n            "Type": "Choice",\n            "Choices": ${jsonencode(choices)},\n            "Default": "Pass"\n        },\n        %{ for key, data in ssm_execution }\n        "${key}": ${jsonencode(data)},\n        %{ endfor }\n        "Pass": {\n            "Type": "Pass",\n            "End": true\n        }\n    }\n}\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'locals {\n    choices = flatten([for item in var.ssm_params: [\n        for key, value in item : {\n            "IsPresent": true,\n            "Next": "SSM Execution-${key}"\n            "Variable": "$.${key}",\n        }]\n    ])\n\n    ssm_execution = merge(flatten([for item in var.ssm_params: [ \n                    for key, value in item : {\n                        "SSM Execution-${key}": {\n                            "Type": "Task",\n                            "Parameters": {\n                              "DocumentName.$": "$.DocumentName",\n                              "Parameters": {"$.${key}": "${value}"}\n                            },\n                            "Resource": "arn:aws:states:::aws-sdk:ssm:startAutomationExecution",\n                            "Next": "Handle Notification",\n                            "ResultPath": "$.TaskResult"\n                        }\n                    }\n                    ]]\n                )...)\n\n    file = templatefile("${path.module}/templates/stepfunction_definition.tpl", {\n        lambda_function_name = var.lambda_function_name,\n        choices_list = local.choices,\n        ssm_execution = local.ssm_execution\n    })\n}\n\nvariable "lambda_function_name" {\n    description = "Lambda function name"\n    type        = string\n}\n\nvariable "ssm_params" {\n    description = "List of SSM param objects to be injected into the Step Function definition"\n    type = list\n}\n\nresource "aws_sfn_state_machine" "sfn_state_machine" {\n    name        = var.step_function_name\n    role_arn    = var.sf_role_arn\n    definition  = local.file\n}\n')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'# main.tf (full file)\n\nmodule "my_step_function" {\n    source                = "./modules/step_functions"\n    step_function_name    = "autoremediation_sf"\n    sf_role_arn           = "arn:aws:iam::123456789012:role/autoremediation_sf"\n    lambda_function_name  = "autoremediation_lambda"\n\n    ssm_params = [                \n        {"InstanceId": "States.Array($.InstanceId)"},    \n        {"SecurityGroupIds": "States.Array($.SecurityGroupIds)"}\n    ]\n}\n')))}p.isMDXComponent=!0}}]);