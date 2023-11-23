"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7156],{9969:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"dynamic-json-in-terraform","metadata":{"permalink":"/blog/pt-BR/tech/dynamic-json-in-terraform","source":"@site/i18n/pt-BR/docusaurus-plugin-content-blog-tech/2023-03-18-dynamic-json-in-terraform/index.md","title":"Como Gerar JSON Din\xe2mico no Terraform","description":"Quem programa n\xe3o se aguenta, n\xe9? N\xe3o pode ver uma coisinha declarativa que j\xe1 quer fazer um loop, colocar uma l\xf3gica, faz qualquer coisa menos... declara\xe7\xe3o.","date":"2023-03-18T00:00:00.000Z","formattedDate":"18 de mar\xe7o de 2023","tags":[{"label":"infra","permalink":"/blog/pt-BR/tech/tags/infra"},{"label":"terraform","permalink":"/blog/pt-BR/tech/tags/terraform"},{"label":"IaC","permalink":"/blog/pt-BR/tech/tags/ia-c"},{"label":"step functions","permalink":"/blog/pt-BR/tech/tags/step-functions"},{"label":"devops","permalink":"/blog/pt-BR/tech/tags/devops"}],"readingTime":9.34,"hasTruncateMarker":true,"authors":[{"name":"Manu Magalh\xe3es","title":"Engenheira de DevSecOps","url":"https://github.com/magmanu","imageURL":"https://github.com/magmanu.png","key":"manu"}],"frontMatter":{"slug":"dynamic-json-in-terraform","title":"Como Gerar JSON Din\xe2mico no Terraform","authors":"manu","tags":["infra","terraform","IaC","step functions","devops"]},"nextItem":{"title":"Solu\xe7\xe3o: Terraform n\xe3o deixa tern\xe1rios terem tipos diferentes","permalink":"/blog/pt-BR/tech/terraform-ternary-error"}},"content":"Quem programa n\xe3o se aguenta, n\xe9? N\xe3o pode ver uma coisinha declarativa que j\xe1 quer fazer um loop, colocar uma l\xf3gica, faz qualquer coisa menos... declara\xe7\xe3o.\\n\\nAqui vou mostrar como gerar um JSON din\xe2mico no Terraform. Neste artigo vou usar Step Functions como exemplo, mas voc\xea pode usar o JSON que quiser.\\n\\n## O que vamos fazer\\n\\nO JSON abaixo vai sofrer uma transforma\xe7\xe3o. Vamos substituir os valores est\xe1ticos por:\\n\\n1. [Uma vari\xe1vel](#caso-1-injetando-uma-vari\xe1vel-no-json)\\n2. [Uma lista din\xe2mica](#caso-2-injetando-uma-lista-no-json)\\n3. [Um ou mais objetos din\xe2micos](#caso-3-injetando-um-objeto-no-json)\\n\\n\x3c!--truncate--\x3e\\n\\n(Adicionei coment\xe1rios n\xe3o idiom\xe1ticos dentro do c\xf3digo, mas \xe9 s\xf3 para deixar bem claro o que estamos fazendo.)\\n\\n```json\\n# JSON de refer\xeancia\\n{\\n    \\"Comment\\": \\"My state machine\\",\\n    \\"StartAt\\": \\"Choice\\",\\n    \\"States\\": {\\n        \\"Handle Notification\\": {\\n            \\"Type\\": \\"Task\\",\\n            \\"Resource\\": \\"arn:aws:states:::lambda:invoke\\",\\n            \\"OutputPath\\": \\"$.Payload\\",\\n            \\"Parameters\\": {\\n              \\"Payload.$\\": \\"$\\",\\n              \\"FunctionName\\": \\"my_function_name\\"  <-- Caso 1: Substituir a string expl\xedcita por uma string din\xe2mica\\n            },\\n            \\"End\\": true\\n        },\\n        \\"Choice\\": {\\n          \\"Type\\": \\"Choice\\",\\n          \\"Choices\\": [                            -------\\n             {                                           |\\n               \\"IsPresent\\": true,                        |\\n               \\"Next\\": \\"SSM Execution-InstanceId\\",       |\\n               \\"Variable\\": \\"$.InstanceId\\"                |\\n              },                                         |\\n              {                                          |-- Caso 2: Substituir por uma lista din\xe2mica\\n               \\"IsPresent\\": true,                        |\\n               \\"Next\\": \\"SSM Execution-SecurityGroupIds\\", |\\n               \\"Variable\\": \\"$.SecurityGroupIds\\"          |\\n              }                                          |\\n            ],                                     -------\\n            \\"Default\\": \\"Pass\\"\\n        },\\n        \\"SSM Execution-InstanceId\\": {          -------\\n            \\"Next\\": \\"Pass\\",                          |\\n            \\"Parameters\\": {                          |\\n                \\"DocumentName.$\\": \\"$.DocumentName\\",  |\\n                \\"Parameters\\": {                      |\\n                    \\"InstanceId.$\\": \\"States.Array($.InstanceId)\\"\\n                }                                    |\\n              },                                     |\\n            \\"Resource\\": \\"arn:aws:states:::aws-sdk:ssm:startAutomationExecution\\",\\n            \\"ResultPath\\": \\"$.TaskResult\\",            |\\n            \\"Type\\": \\"Task\\"                           |\\n        },                                           |-- Caso 3: Substituir por um ou mais objetos din\xe2micos\\n        \\"SSM Execution-SecurityGroupIds\\": {          |\\n            \\"Next\\": \\"Pass\\",                          |\\n            \\"Parameters\\": {                          |\\n                \\"DocumentName.$\\": \\"$.DocumentName\\",  |\\n                \\"Parameters\\": {                      |\\n                    \\"SecurityGroupIds.$\\": \\"States.Array($.SecurityGroupIds)\\"\\n                }                                    |\\n            },                                       |\\n            \\"Resource\\": \\"arn:aws:states:::aws-sdk:ssm:startAutomationExecution\\",\\n            \\"ResultPath\\": \\"$.TaskResult\\",            |\\n            \\"Type\\": \\"Task\\"                           |\\n        },                                     -------\\n        \\"Pass\\": {\\n            \\"Type\\": \\"Pass\\",\\n            \\"End\\": true\\n        }\\n    }\\n}\\n```\\n\\nPrimeiro, salve o JSON acima em formato de template. Voc\xea pode usar a extens\xe3o `.tpl` ou `.tftpl`. Embora o Terraform recomende usar a segunda op\xe7\xe3o, n\xe3o existe uma regra r\xedgida sobre qual extens\xe3o usar.\\n\\n## Caso 1: Injetando uma vari\xe1vel no JSON\\n\\nVamos come\xe7ar atualizando o valor `FunctionName` no template, usando interpola\xe7\xe3o:\\n\\n```json\\n# modules/templates/stepfunction_definition.tftpl (parcial)\\n\\n{\\"Handle Notification\\": {\\n        \\"Type\\": \\"Task\\",\\n        \\"Resource\\": \\"arn:aws:states:::lambda:invoke\\",\\n        \\"OutputPath\\": \\"$.Payload\\",\\n        \\"Parameters\\": {\\n          \\"Payload.$\\": \\"$\\",\\n          \\"FunctionName\\": \\"${nome_da_lambda}\\"  <--- Aqui! --\x3e\\n        },\\n        \\"End\\": true\\n      }\\n}\\n```\\n\\nO template precisa ser renderizado como um JSON v\xe1lido, ent\xe3o vamos usar a fun\xe7\xe3o `templatefile` do Terraform. Pra isso, usamos dois argumentos: o caminho (path) do template e um mapa de vari\xe1veis a serem injetadas na runtime (execu\xe7\xe3o). Vou tentar manter o m\xf3dulo o mais din\xe2mico poss\xedvel, e vou incluir locals, vari\xe1veis e resources (recursos) do Terraform para mostrar como as coisas funcionam juntas.\\n\\n```json\\n# modules/stepfunction.tf (arquivo completo)\\n\\nlocals {\\n    file = templatefile(\\"${path.module}/templates/stepfunction_definition.tpl\\", {\\n        nome_da_lambda = var.nome_da_lambda\\n    })\\n}\\nvariable \\"nome_da_lambda\\" {\\n    description = \\"Nome da lambda\\"\\n    type        = string\\n}\\n\\nresource \\"aws_sfn_state_machine\\" \\"sfn_state_machine\\" {\\n    name        = var.nome_da_step_function\\n    role_arn    = var.sf_role_arn\\n    definition  = local.file\\n}\\n```\\n\\nAgora vamos salvar um `main.tf` um n\xedvel acima, onde os valores expl\xedcitos (hardcoded) ser\xe3o definidos.\\n\\n```json\\n# main.tf (arquivo completo)\\n\\nmodule \\"minha_step_function\\" {\\n  source                = \\"./modules/step_functions\\"\\n  nome_da_step_function    = \\"autoremedia\xe7\xe3o\\"\\n  sf_role_arn           = \\"arn:aws:iam::123456789012:role/autoremedia\xe7\xe3o\\"\\n  nome_da_lambda  = \\"lambda_de_autoremedia\xe7\xe3o\\"\\n}\\n```\\n\\nSe quiser conferir que a vari\xe1vel foi injetada com sucesso, execute `terraform init && terraform plan` no terminal.\\n\\n## Caso 2: Injetando uma lista no JSON\\n\\nS\xf3 pra lembrar, esta \xe9 a lista que estamos refatorando:\\n\\n```json\\n# modules/templates/stepfunction_definition.tftpl (parcial)\\n\\n\\"Choice\\": {\\n    \\"Type\\": \\"Choice\\",\\n    \\"Choices\\": [                              -------\\n        {                                           |\\n          \\"IsPresent\\": true,                        |\\n          \\"Next\\": \\"SSM Execution-InstanceId\\",       |\\n          \\"Variable\\": \\"$.InstanceId\\"                |\\n        },                                          |\\n        {                                           |--- Case 2: Abstrair a lista\\n          \\"IsPresent\\": true,                        |\\n          \\"Next\\": \\"SSM Execution-SecurityGroupIds\\", |\\n          \\"Variable\\": \\"$.SecurityGroupIds\\"          |\\n        }                                           |\\n    ],                                        -------\\n    \\"Default\\": \\"Pass\\"\\n}\\n```\\n\\nVamos refatorar o template de novo. Vamos usar uma fun\xe7\xe3o do Terraform chamada `jsonencode`, que faz a lista de objetos usada no template ser renderizada como JSON:\\n\\n```json\\n# modules/templates/stepfunction_definition.tftpl(parcial)\\n\\n\\"Choice\\": {\\n    \\"Type\\": \\"Choice\\",\\n    \\"Choices\\": ${jsonencode(lista_de_op\xe7\xf5es)},  <--- A lista toda vai ficar em uma linha s\xf3! --\x3e\\n    \\"Default\\": \\"Pass\\"\\n    }\\n ```\\n\\nAgora, vamos ver duas maneiras de passar a lista para o template.\\n\\n### A solu\xe7\xe3o mais simples: lista expl\xedcita\\n\\nUma op\xe7\xe3o \xe9 criar uma vari\xe1vel que vai passar uma lista pronta:\\n\\n```json\\n# modules/stepfunction.tf (parcial)\\n\\nlocals {\\n    file = templatefile(\\"${path.module}/templates/stepfunction_definition.tpl\\", {\\n        nome_da_lambda = var.nome_da_lambda\\n        lista_de_op\xe7\xf5es = var.minha_lista   <------- Adicionamos esta linha --\x3e\\n    })\\n}\\n\\nvariable \\"minha_lista\\" {                <-------- E esta vari\xe1vel --\x3e\\n    description = \\"A lista que voc\xea quiser\\"\\n    type = list\\n}\\n```\\n\\nAgora, no m\xf3dulo `main.tf`, passe os valores das vari\xe1veis. O JSON ficou \xe9 din\xe2mico, mas a lista \xe9 ainda \xe9 meio \u201cest\xe1tica\u201d porque foi definida explicitamente no m\xf3dulo principal. E v\xe1rias vezes, isso basta.\\n\\n```json\\n# main.tf (arquivo completo)\\n\\nmodule \\"minha_step_function\\" {\\n    source                = \\"./modules/step_functions\\"\\n    nome_da_step_function    = \\"autoremedia\xe7\xe3o\\"\\n    sf_role_arn           = \\"arn:aws:iam::123456789012:role/autoremedia\xe7\xe3o\\"\\n    nome_da_lambda  = \\"lambda_de_autoremedia\xe7\xe3o\\"\\n\\n    minha_lista = [{                            <-------- Aqui colocamos o valor expl\xedcito --\x3e\\n        \\"IsPresent\\": true,\\n        \\"Next\\": \\"SSM Execution-InstanceId\\",\\n        \\"Variable\\": \\"$.InstanceId\\"\\n    }]\\n}\\n```\\n\\n### A solu\xe7\xe3o com muita l\xf3gica: lista din\xe2mica\\n\\nMas e se voc\xea quiser que a lista em si tamb\xe9m seja din\xe2mica? Por exemplo, voc\xea quer gerar a lista extraindo os valores de um par\xe2metro, e depois enviar a lista para o json?\\nEm nosso exemplo, vamos gerar as listas de `Next` e `Variable` extraindo as chaves (keys) que est\xe3o em `ssm_params`, no arquivo principal `main.tf`:\\n\\n```json\\n# main.tf (arquivo completo)\\n\\nmodule \\"minha_step_function\\" {\\n    source                = \\"./modules/step_functions\\"\\n    nome_da_step_function    = \\"autoremedia\xe7\xe3o\\"\\n    sf_role_arn           = \\"arn:aws:iam::123456789012:role/autoremedia\xe7\xe3o\\"\\n    nome_da_lambda  = \\"lambda_de_autoremedia\xe7\xe3o\\"\\n\\n                       <--- Tiramos a lista est\xe1tica que estava aqui --\x3e\\n    ssm_params = [     <--- Vamos gerar uma lista usando as chaves deste objeto! --\x3e\\n        {\\"InstanceId\\": \\"States.Array($.InstanceId)\\"},    \\n        {\\"SecurityGroupIds\\": \\"States.Array($.SecurityGroupIds)\\"}\\n    ]\\n}\\n```\\n\\nNosso m\xf3dulo vai ficar assim:\\n\\n```json\\n# modules/stepfunction.tf (arquivo completo)\\n\\nlocals {\\n    lista_de_op\xe7\xf5es = flatten([for item in var.ssm_params: [\\n        for chave, valor in item : {\\n            \\"IsPresent\\": true,\\n            \\"Next\\": \\"SSM Execution-${chave}\\"\\n            \\"Variable\\": \\"$.${chave}\\",\\n        }]\\n    ])\\n    file = templatefile(\\"${path.module}/templates/stepfunction_definition.tpl\\", {\\n        nome_da_lambda = var.nome_da_lambda,\\n        lista_de_op\xe7\xf5es = local.lista_de_op\xe7\xf5es\\n    })\\n}\\n\\nvariable \\"nome_da_lambda\\" {\\n    description = \\"Nome da lambda\\"\\n    type        = string\\n}\\n\\nvariable \\"ssm_params\\" {\\n    description = \\"Lista dos par\xe2metros de SSM a serem injetados\\"\\n    type = list\\n}\\n\\nresource \\"aws_sfn_state_machine\\" \\"sfn_state_machine\\" {\\n    name        = var.nome_da_step_function\\n    role_arn    = aws_iam_role.step_function_role_arn\\n    definition  = local.file\\n}\\n```\\n\\nCome\xe7ando com a linha `lista_de_op\xe7\xf5es = flatten([for item in var.ssm_params:` ignore `flatten` por um momento e observe o loop. \\n\\n`ssm_params` \xe9 uma lista, e vamos ver cada item. O loop est\xe1 entre colchetes, o que significa que o resultado ser\xe1 uma lista. O `:` que se segue \xe9 apenas parte da sintaxe do loop.\\n\\nNa linha a seguir, temos outro loop: `for chave, valor in item : {` . Este loop passa em cada objeto do `ssm_params`, acessando a chave e o valor. Assim, podemos extrair e reestruturar os dados. O loop tamb\xe9m \xe9 colocado entre colchetes, o que significa que, infelizmente, cada objeto estar\xe1 dentro de uma lista pr\xf3pria. O resultado final vai ficar assim: `[[obj1],[obj2]]`\\n\\nAgora, lembra do `flatten`? Essa fun\xe7\xe3o do Terraform \xe9 necess\xe1ria porque precisamos achatar (flatten) esse resultado que est\xe1 cheio de aninhamento (nesting) desnecess\xe1rio. O flatten faz nosso resultado ficar assim: `[obj1, obj2]`.\\n\\nPronto.\\n\\n## Caso 3: Injetando um objeto no JSON\\n\\nAgora, a parte mais emocionante. Vamos abstrair objetos inteiros. (Neste caso, significa que etapas inteiras das Step Functions podem ficar din\xe2micas!)\\nIss o \xe9 o que estamos refatorando:\\n\\n```json\\n\\"Steps\\": {\\n    \\"SSM Execution-InstanceId\\": {             -------\\n            \\"Next\\": \\"Pass\\",                          |\\n            \\"Parameters\\": {                          |\\n                \\"DocumentName.$\\": \\"$.DocumentName\\",  |\\n                \\"Parameters\\": {                      |\\n                    \\"InstanceId.$\\": \\"States.Array($.InstanceId)\\"\\n                }                                    |\\n              },                                     |\\n            \\"Resource\\": \\"arn:aws:states:::aws-sdk:ssm:startAutomationExecution\\",\\n            \\"ResultPath\\": \\"$.TaskResult\\",            |\\n            \\"Type\\": \\"Task\\"                           |\\n        },                                           |---------- ISSO TUDO!\\n        \\"SSM Execution-SecurityGroupIds\\": {          |\\n            \\"Next\\": \\"Pass\\",                          |\\n            \\"Parameters\\": {                          |\\n                \\"DocumentName.$\\": \\"$.DocumentName\\",  |\\n                \\"Parameters\\": {                      |\\n                    \\"SecurityGroupIds.$\\": \\"States.Array($.SecurityGroupIds)\\"\\n                }                                    |\\n            },                                       |\\n            \\"Resource\\": \\"arn:aws:states:::aws-sdk:ssm:startAutomationExecution\\",\\n            \\"ResultPath\\": \\"$.TaskResult\\",            |\\n            \\"Type\\": \\"Task\\"                           |\\n        }                                     -------\\n}\\n```\\n\\nPra variar, vamos modificar o template:\\n\\n```json\\n# modules/templates/stepfunction_definition.tftpl (parcial)\\n\\n\\"States\\": {\\n    \\"Choice\\": {\\n      \\"Type\\": \\"Choice\\",\\n      \\"Choices\\": ${jsonencode(choices)},\\n      \\"Default\\": \\"Pass\\"\\n    },\\n    %{ for chave, data in ssm_execution }   <--- A parte que vamos adicionar agora ---\x3e\\n        \\"${chave}\\": ${jsonencode(data)},\\n    %{ endfor }\\n    \\"Handle Notification\\": {<--- bl\xe1bl\xe1--\x3e}\\n    }\\n```\\n\\nSe seu linter reclamar, mantenha a f\xe9 que t\xe1 tudo certo.  \\n\\nMas o que est\xe1 acontecendo? Estamos usando a sintaxe [diretiva do Terraform](https://developer.hashicorp.com/terraform/language/expressions/strings#directives) `%{}` para escrever uma string din\xe2mica (pois \xe9, templates s\xe3o tratados como strings) .\\n\\nA linha `%{ for chave, data in ssm_execution }` informa \xe0 fun\xe7\xe3o `templatefile` que uma itera\xe7\xe3o vai come\xe7ar, e que cs\xf3 termina quando chegar na linha `%{ endfor }`. Enquanto isso, a fun\xe7\xe3o vai ontinuar criando pares de chave-valor com o formato `\\"minha_chave\\": {\\"meu\\": \\"json\\"},`.\\n\\nLegal, n\xe9?\\n\\nEnt\xe3o agora vamos adicionar o valor local `ssm_execution`, a l\xf3gica que ir\xe1 preencher tudo isso.\\n\\n```json\\n# modules/stepfunction.tf (parcial)\\n\\nlocals {\\n    choices = flatten([for item in var.ssm_params: [\\n        for chave, valor in item : {\\n            \\"IsPresent\\": true,\\n            \\"Next\\": \\"SSM Execution-${chave}\\"\\n            \\"Variable\\": \\"$.${chave}\\",\\n        }]\\n    ])\\n\\n    <--- Olha ele aqui! --\x3e\\n    ssm_execution = merge(flatten([for item in var.ssm_params: [ \\n                    for chave, valor in item : {\\n                        \\"SSM Execution-${chave}\\": {\\n                            \\"Type\\": \\"Task\\",\\n                            \\"Parameters\\": {\\n                              \\"DocumentName.$\\": \\"$.DocumentName\\",\\n                              \\"Parameters\\": {\\"$.${chave}\\": \\"${valor}\\"}\\n                            },\\n                            \\"Resource\\": \\"arn:aws:states:::aws-sdk:ssm:startAutomationExecution\\",\\n                            \\"Next\\": \\"Handle Notification\\",\\n                            \\"ResultPath\\": \\"$.TaskResult\\"\\n                        }\\n                    }\\n                    ]]\\n                )...)\\n\\n    file = templatefile(\\"${path.module}/templates/stepfunction_definition.tpl\\", {\\n        nome_da_lambda = var.nome_da_lambda,\\n        lista_de_op\xe7\xf5es = local.choices,\\n        ssm_execution = local.ssm_execution <--- Oh hi! --\x3e\\n    })\\n}\\n```\\n\\nJ\xe1 estamos familiarizados com loops e flatten, ent\xe3o vamos falar sobre as novidades: `merge` e `...`.\\n\\n`merge` \xe9 uma fun\xe7\xe3o do Terraform que junta v\xe1rios objetos em um s\xf3. Ent\xe3o, se tivermos dois objetos assim:\\n\\n```json\\n   {\\n     \\"a\\": 1,\\n     \\"b\\": 2\\n   },\\n   {\\n     \\"c\\": 3,\\n     \\"d\\": 4\\n   }\\n```\\n\\na fun\xe7\xe3o `merge` vai transform\xe1-los em:\\n\\n```json\\n{\\n     \\"a\\": 1,\\n     \\"b\\": 2,\\n     \\"c\\": 3,\\n     \\"d\\": 4\\n}\\n```\\n\\nE se voc\xea estava prestando aten\xe7\xe3o, notou que a fun\xe7\xe3o merge em nosso m\xf3dulo **n\xe3o** est\xe1 usando objetos como argumento, ela est\xe1 usando a fun\xe7\xe3o flatten (que gera uma \xfanica lista). O truque est\xe1 aqui: `...`.\\n\\nNo Terraform, `...` (tr\xeas pontos) funciona como o operador spread em Javascript: ele expande a lista em argumentos separados, individuais.\\n\\nEnt\xe3o \xe9 isso. Nosso template final ficou literalmente com metade do tamanho do JSON original. Ele \xe9 din\xe2mico, reutiliz\xe1vel e o melhor de tudo \u2013 voc\xea nunca mais vai precisar o Amazon States Language no seu projeto. Vale cada minuto investido.\\n\\n## Arquivos Finais\\n\\n```json\\n# modules/templates/stepfunction_definition.tftpl\\n\\n{\\n    \\"Comment\\": \\"My state machine\\",\\n    \\"StartAt\\": \\"Choice\\",\\n    \\"States\\": {\\n        \\"Handle Notification\\": {\\n            \\"Type\\": \\"Task\\",\\n            \\"Resource\\": \\"arn:aws:states:::lambda:invoke\\",\\n            \\"OutputPath\\": \\"$.Payload\\",\\n            \\"Parameters\\": {\\n              \\"Payload.$\\": \\"$\\",\\n              \\"FunctionName\\": \\"${nome_da_lambda}\\"\\n            },\\n            \\"End\\": true\\n        },\\n        \\"Choice\\": {\\n            \\"Type\\": \\"Choice\\",\\n            \\"Choices\\": ${jsonencode(choices)},\\n            \\"Default\\": \\"Pass\\"\\n        },\\n        %{ for chave, data in ssm_execution }\\n        \\"${chave}\\": ${jsonencode(data)},\\n        %{ endfor }\\n        \\"Pass\\": {\\n            \\"Type\\": \\"Pass\\",\\n            \\"End\\": true\\n        }\\n    }\\n}\\n```\\n\\n```json\\nlocals {\\n    choices = flatten([for item in var.ssm_params: [\\n        for chave, valor in item : {\\n            \\"IsPresent\\": true,\\n            \\"Next\\": \\"SSM Execution-${chave}\\"\\n            \\"Variable\\": \\"$.${chave}\\",\\n        }]\\n    ])\\n\\n    ssm_execution = merge(flatten([for item in var.ssm_params: [ \\n                    for chave, valor in item : {\\n                        \\"SSM Execution-${chave}\\": {\\n                            \\"Type\\": \\"Task\\",\\n                            \\"Parameters\\": {\\n                              \\"DocumentName.$\\": \\"$.DocumentName\\",\\n                              \\"Parameters\\": {\\"$.${chave}\\": \\"${valor}\\"}\\n                            },\\n                            \\"Resource\\": \\"arn:aws:states:::aws-sdk:ssm:startAutomationExecution\\",\\n                            \\"Next\\": \\"Handle Notification\\",\\n                            \\"ResultPath\\": \\"$.TaskResult\\"\\n                        }\\n                    }\\n                    ]]\\n                )...)\\n\\n    file = templatefile(\\"${path.module}/templates/stepfunction_definition.tpl\\", {\\n        nome_da_lambda = var.nome_da_lambda,\\n        lista_de_op\xe7\xf5es = local.choices,\\n        ssm_execution = local.ssm_execution\\n    })\\n}\\n\\nvariable \\"nome_da_lambda\\" {\\n    description = \\"Nome da lambda\\"\\n    type        = string\\n}\\n\\nvariable \\"ssm_params\\" {\\n    description = \\"Lista dos par\xe2metros de SSM a serem injetados\\"\\n    type = list\\n}\\n\\nresource \\"aws_sfn_state_machine\\" \\"sfn_state_machine\\" {\\n    name        = var.nome_da_step_function\\n    role_arn    = var.sf_role_arn\\n    definition  = local.file\\n}\\n```\\n\\n```json\\n# main.tf (arquivo completo)\\n\\nmodule \\"minha_step_function\\" {\\n    source                = \\"./modules/step_functions\\"\\n    nome_da_step_function    = \\"autoremedia\xe7\xe3o\\"\\n    sf_role_arn           = \\"arn:aws:iam::123456789012:role/autoremedia\xe7\xe3o\\"\\n    nome_da_lambda  = \\"lambda_de_autoremedia\xe7\xe3o\\"\\n\\n    ssm_params = [                \\n        {\\"InstanceId\\": \\"States.Array($.InstanceId)\\"},    \\n        {\\"SecurityGroupIds\\": \\"States.Array($.SecurityGroupIds)\\"}\\n    ]\\n}\\n```"},{"id":"terraform-ternary-error","metadata":{"permalink":"/blog/pt-BR/tech/terraform-ternary-error","source":"@site/i18n/pt-BR/docusaurus-plugin-content-blog-tech/2023-03-18-terraform-ternary-errors/index.md","title":"Solu\xe7\xe3o: Terraform n\xe3o deixa tern\xe1rios terem tipos diferentes","description":"Voc\xea j\xe1 encontrou esse erro no Terraform, quando o que voc\xea queria era exatamente ter tipos diferentes no resultado do tern\xe1rio?","date":"2023-03-18T00:00:00.000Z","formattedDate":"18 de mar\xe7o de 2023","tags":[{"label":"infra","permalink":"/blog/pt-BR/tech/tags/infra"},{"label":"terraform","permalink":"/blog/pt-BR/tech/tags/terraform"},{"label":"gambiarra","permalink":"/blog/pt-BR/tech/tags/gambiarra"},{"label":"devops","permalink":"/blog/pt-BR/tech/tags/devops"}],"readingTime":2.68,"hasTruncateMarker":true,"authors":[{"name":"Manu Magalh\xe3es","title":"Engenheira de DevSecOps","url":"https://github.com/magmanu","imageURL":"https://github.com/magmanu.png","key":"manu"}],"frontMatter":{"slug":"terraform-ternary-error","title":"Solu\xe7\xe3o: Terraform n\xe3o deixa tern\xe1rios terem tipos diferentes","authors":"manu","tags":["infra","terraform","gambiarra","devops"]},"prevItem":{"title":"Como Gerar JSON Din\xe2mico no Terraform","permalink":"/blog/pt-BR/tech/dynamic-json-in-terraform"},"nextItem":{"title":"Como Migrar do CodeCommit para o GitHub \u2014 Mantendo sua pipeline Amplify","permalink":"/blog/pt-BR/tech/migrate-codecommit-to-github"}},"content":"Voc\xea j\xe1 encontrou esse erro no Terraform, quando o que voc\xea queria era exatamente ter tipos diferentes no resultado do tern\xe1rio?\\n\\n>The true and false result expressions must have consistent types  \\n> *Express\xf5es com resultado true ou false devem ter tipos consistentes*\\n\\nVou dar dois exemplos de como contornar esse problema, mas a regra geral \xe9 esta aqui:\\n\\n\\n```terraform\\natributo = [\\n    <valor caso true>, \\n    <valor caso false>\\n    ][<condicional> ? 0 : 1]\\n```\\n\\n\x3c!--truncate--\x3e\\n\\n## Exemplo simples\\n\\n```hcl\\nlocals {\\n    valor_dinamico = [\\n      {\\"regiao\\": \\"${var.regiao}\\"}, \\n      \\"indispon\xedvel\\"\\n      ][var.regiao == \\"eu-west-1\\" ? 0 : 1 ]\\n}\\n```\\n\\nNo exemplo acima, `local.valor_dinamico` vai ser avaliado como `{\\"regiao: \\"eu-west-1\\"}`, que \xe9 um `objeto`, se a regi\xe3o da AWS for a Irlanda; e retorna `\\"indispon\xedvel\\"`, que \xe9 uma `string`, se for alguma outra regi\xe3o.\\n\\n### Pera, como \xe9 que \xe9?\\n\\nEm vez de usar o tern\xe1rio da maneira tradicional, n\xf3s usamos uma tupla (tamb\xe9m conhecida como lista com tipos mistos) e aproveitamos a estrutura do tern\xe1rio para avaliar qual \xedndice cont\xe9m o valor de que precisamos.\\n\\nNo fundo, estamos selecionando se queremos o primeiro ou segundo valor que est\xe1 na tupla, como se fosse  `tupla[0]` ou `tupla[1]`.\\n\\nObrigada Mariux pelo truque.\\n\\n## Um exemplo menos simples\\n\\nTamb\xe9m d\xe1 pra fazer coisas mais complexas e din\xe2micas. N\xe3o estou dizendo fica bonito ou que seja recomend\xe1vel, mas \xe0s vezes a gente faz o que tem que ser feito.\\n\\nNo meu caso, a l\xf3gica tern\xe1ria que eu precisava era usada em uma Step Function. Eu tinha um objeto, e se esse objeto tivesse s\xf3 uma chave (key), eu precisava de um JSON. Se o objeto tivesse mais do que uma chave, eu precisava de um JSON diferente. \\n\\nA coisa fica meio feia porque tem l\xf3gica em tudo quanto \xe9 lugar, mas aqui vai o resultado:\\n\\n```hcl\\nvariable \\"ssm_params\\" {\\n    description = \\"Par\xe2metro exigido pelo SSM Documents para ativar rota\xe7\xe3o de chaves KMS\\"\\n    default     = [{\\"KeyId\\": \\"States.Array($.KeyId)\\",\\n                    \\"AutomationAssumeRole\\": \\"States.Array($.AutomationAssumeRole)\\"}]\\n}\\n\\nlocals {\\n  choices = [for item in var.ssm_params: [\\n    merge(flatten([\\n      # Caso: Existe apenas uma condi\xe7\xe3o (isTrue)\\n      for key, value in item: {\\n        \\"IsPresent\\": true,\\n        \\"Next\\": \\"SSM-${key}\\",\\n        \\"Variable\\": \\"$.${key}\\"\\n      }\\n    ])...), \\n    merge([\\n      # Caso: Existem v\xe1rias condi\xe7\xf5es (AND) \\n      { \\"And\\" : [\\n          for key, value in item: \\n            {\\n              \\"IsPresent\\": true,\\n              \\"Variable\\": \\"$.${key}\\"\\n            }\\n        ],\\n      \\"Next\\": \\"SSM-${join(\\"\\", sort([keys(item)]...))}\\"\\n      }\\n    ]...)\\n    ][length(flatten([keys(item)])) == 1 ? 0 : 1]\\n]\\n}\\n```\\n\\nMinha tupla tem dois valores, os dois come\xe7am com `merge` e resultam em um array de objetos com valores gerados dinamicamente. E como d\xe1 pra ver, a estrutura dos objetos \xe9 em cada caso \xe9 diferente, e foi por isso que a solu\xe7\xe3o padr\xe3o para tern\xe1rios n\xe3o funcionaria.\\n\\nA seguir, a parte do condicional tamb\xe9m \xe9 din\xe2mica. A gente extrai as chaves do objeto, coloca as chaves em um \xfanico array usando `flatten` e avalia o tamanho desse array. Se tiver s\xf3 um elemento no array, o resultado final ser\xe1 o primeiro valor da tupla. Caso contr\xe1rio, o resultado final ser\xe1 o segundo valor da tupla.\\n\\nN\xe3o me pergunte como eu n\xe3o joguei o computador pela janela. Mas funcionou. E eu nunca mais quero precisar fazer uma coisa dessas, porque se a coisa \xe9 declarativa n\xe3o era pra ter l\xf3gica complexa, n\xe9. Enfim. :P"},{"id":"migrate-codecommit-to-github","metadata":{"permalink":"/blog/pt-BR/tech/migrate-codecommit-to-github","source":"@site/i18n/pt-BR/docusaurus-plugin-content-blog-tech/2021-10-13-migrate-codecommit-to-github/index.md","title":"Como Migrar do CodeCommit para o GitHub \u2014 Mantendo sua pipeline Amplify","description":"Este tutorial inclui orienta\xe7\xf5es para tr\xeas cen\xe1rios de administra\xe7\xe3o no GitHub:","date":"2021-10-13T00:00:00.000Z","formattedDate":"13 de outubro de 2021","tags":[{"label":"infra","permalink":"/blog/pt-BR/tech/tags/infra"},{"label":"github","permalink":"/blog/pt-BR/tech/tags/github"},{"label":"amplify","permalink":"/blog/pt-BR/tech/tags/amplify"},{"label":"aws","permalink":"/blog/pt-BR/tech/tags/aws"},{"label":"ci/cd","permalink":"/blog/pt-BR/tech/tags/ci-cd"},{"label":"tutorial","permalink":"/blog/pt-BR/tech/tags/tutorial"}],"readingTime":4.9,"hasTruncateMarker":true,"authors":[{"name":"Manu Magalh\xe3es","title":"Engenheira de DevSecOps","url":"https://github.com/magmanu","imageURL":"https://github.com/magmanu.png","key":"manu"}],"frontMatter":{"slug":"migrate-codecommit-to-github","title":"Como Migrar do CodeCommit para o GitHub \u2014 Mantendo sua pipeline Amplify","authors":"manu","tags":["infra","github","amplify","aws","ci/cd","tutorial"]},"prevItem":{"title":"Solu\xe7\xe3o: Terraform n\xe3o deixa tern\xe1rios terem tipos diferentes","permalink":"/blog/pt-BR/tech/terraform-ternary-error"}},"content":"Este tutorial inclui orienta\xe7\xf5es para tr\xeas cen\xe1rios de administra\xe7\xe3o no GitHub:\\n\\n1. Quando o repo est\xe1 na sua conta pessoal;\\n2. Quando o repo est\xe1 dentro de uma organiza\xe7\xe3o no GitHub e a galera da administra\xe7\xe3o te d\xe1 as permiss\xf5es necess\xe1rias; e\\n3. Quando o repo est\xe1 dentro de uma organiza\xe7\xe3o no GitHub e a galera da administra\xe7\xe3o N\xc3O te d\xe1 as permiss\xf5es necess\xe1rias.\\n\\n_Pr\xe9-requisitos: Acesso e permiss\xf5es relevantes para CodeCommit e Amplify. Voc\xea tamb\xe9m precisa de uma conta ativa no GitHub._\\n\\n\x3c!--truncate--\x3e\\n\\n## Migrando o Repo\\n\\n1. Abra o terminal e fa\xe7a cd para a pasta onde est\xe1 o repo do CodeCommit.\\n2. Execute `git remote get-url origin` para obter o URL para clonar o projeto a ser migrado para o GitHub.\\n3. Crie uma pasta tempor\xe1ria executando `mkdir ../temp-clone` e abra-a na CLI executando `cd ../temp-clone`.\\n4. Execute `git clone --bare` seguido do URL que voc\xea pegou na etapa 2. Um exemplo seria `git clone --bare <https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/nome-do-diretorio-do-codecommit>`.\\n\\n<br/>\\n\\n:::note Nota Educativa\\n\\nO sufixo (flag) `--bare` \xe9 uma forma de clonar o repo cortando todos os v\xednculos com o remoto (CodeCommit, neste caso). Voc\xea ainda vai ter todos os branches, tags e tal, mas o repo clonado fica completamente independente do remoto.\\n\\n:::\\n\\n<br/>\\n\\n5. Crie um novo repo no GitHub. Para evitar problemas, n\xe3o adicione nenhum README, .gitignore nem nada. Depois de clicar em \u201cCreate repo\u201d (Criar repo), a \xfanica coisa a fazer \xe9 copiar o URL como mostrado abaixo. N\xe3o execute nenhum git init, n\xe3o fa\xe7a um commit inicial, nada. S\xf3 copia o link.\\n\\n<br/>\\n\\n![Git clone SSH](./clone_ssh.webp)\\n\\n<br/>\\n\\n6. Voltando ao terminal, execute `cd nome-do-diretorio-do-codecommit.git`, e depois fa\xe7a um push mirror seguido pelo URL que voc\xea obteve na etapa 5. No exemplo acima, o comando seria `git push --mirror <https://github.com/my-username/my-project.git>`.\\n\\n\xc9 isso, a migra\xe7\xe3o acabou.\\n\\n### Confirme\\n\\nPara confirmar que deu tudo certo, volte ao GitHub e atualize a p\xe1gina. O repo vai estar todo bonitinho l\xe1, com hist\xf3rico de commits, as branches e o resto todo.  \\nPara usar repo migrado para o GitHub, \xe9 s\xf3 fazer o clone de sempre e seguir com a vida :)\\n\\n### Arrume\\n\\nSe voc\xea seguiu as instru\xe7\xf5es, agora \xe9 hora de excluir sua pasta tempor\xe1ria. Volte para o terminal e execute `cd ../..` e `rm -rf temp-clone`. Se voc\xea usou a pasta tmp do sistema operacional, pode pular essa etapa.\\n\\n\\n## Redirecionando a pipeline do Amplify\\n\\nAgora que voc\xea migrou o c\xf3digo para o GitHub, como voc\xea mant\xe9m a pipeline Amplify que estava ligada ao repo no CodeCommit?\\n\\n### Execute o comando `update-app`\\n```\\nAWS_PROFILE=PERFIL AWS_DEFAULT_REGION=REGI\xc3O aws amplify update-app --app-id AMPLIFY_APP_ID --repository REPOSITORY_URL --access-token ACCESS_TOKEN\\n```\\n\\n`AMPLIFY_APP_ID`: para encontrar a ID da sua aplica\xe7\xe3o, acesse o console do Amplify. Em App settings (Configura\xe7\xf5es do aplicativo), clique em General (Geral) e procure o ARN da aplica\xe7\xe3o. A ID da aplica\xe7\xe3o \xe9 a sequ\xeancia alfanum\xe9rica no final do ARN. A ID \xe9 mostrada como REDACTED na imagem abaixo:\\n\\n<br/>\\n\\n![Amplify App Id](./amplify_data.webp)\\n\\n<br/>\\n\\n`REPOSITORY_URL`: \xc9 o URL que voc\xea usou na etapa 5 da migra\xe7\xe3o.  \\n`ACCESS_TOKEN`: o token de acesso \xe9 um token que voc\xea pode gerar no GitHub. Pode ser o PAT (token de acesso pessoal) de quem administra o repo, mas se for um projeto profissional, prefira usar um [token de acesso do usu\xe1rio gerado por um app no GitHub](https://docs.github.com/pt/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app).\\n\\n### Reautentique o app Amplify\\n\\n:::tip XP da vida real\\n\\nAs empresas podem restringir bastante quais apps s\xe3o aprovados no GitHub. Se por algum motivo o app Amplify n\xe3o for aprovado, pule para a se\xe7\xe3o [\\"A abordagem via Webhook\\"](#a-abordagem-via-webhook).\\n:::\\n\\nAgora voc\xea pode reconectar sua aplica\xe7\xe3o. Na mesma p\xe1gina em que obteve o ARN, acima do ARN tem o bot\xe3o \u201cReconnect repository\u201d (Reconectar reposit\xf3rio). Ao clicar nele, a p\xe1gina de aprova\xe7\xe3o no GitHub \xe9 aberta.\\n\\n- **Se o reposit\xf3rio migrado N\xc3O estiver em uma Organiza\xe7\xe3o**, clique no bot\xe3o \u201cAuthorize aws-amplify-console\u201d (Autorizar aws-amplify-console). O console do Amplify vai abrir, e l\xe1 voc\xea pode selecionar o repo. Pronto, fim.\\n- **Se o reposit\xf3rio migrado estiver em uma Organiza\xe7\xe3o**, clique no bot\xe3o para solicitar a permiss\xe3o OAuth para o app Amplify. Uma mensagem de solicita\xe7\xe3o pendente fica dispon\xedvel at\xe9 que a administra\xe7\xe3o a aprove (voc\xea vai receber um e-mail quando isso acontecer).\\n\\n<br/>\\n\\n![Authorize Amplify Github App](./authorize_amplify_app.webp)\\n\\n<br/>\\n\\nDepois da aprova\xe7\xe3o, volte para o app Amplify e clique em \u201cReconnect repository\u201d (Reconectar reposit\xf3rio) novamente. Os repos da sua organiza\xe7\xe3o e da sua pr\xf3pria conta aparecem, para voc\xea escolher um deles. Fim.\\n\\n### A Abordagem via Webhook\\n\\nSe voc\xea n\xe3o puder usar o app Amplify no GitHub, voc\xea pode usar um webhook. Para isso, em App settings (Configura\xe7\xf5es do aplicativo), clique em General (Geral), selecione Build Settings (Configura\xe7\xf5es de compila\xe7\xe3o) e clique em Create Webhook (Criar Webhook),  ambos mostrados em laranja abaixo.\\n\\n<br/>\\n\\n![Amplify Build Settings](./amplify_build_settings.webp)\\n\\n<br/>\\n\\nNo pop-up, digite um nome e selecione um branch para fazer o build. O novo webhook ser\xe1 exibido na interface do Amplify. Copie o URL porque vamos precisar dele no GitHub.\\n\\n<br/>\\n\\n![Amplify Incming Webhooks](./amplify_incoming_webhooks.webp)\\n\\n<br/>\\n\\nAgora volte para o repo no GitHub, selecione Configura\xe7\xf5es > Webhooks e clique no bot\xe3o Add webhook (Adicionar webhook).\\n\\n<br/>\\n\\n![Adding GitHub Webhooks](./github_webhooks.webp)\\n\\nAcabou, finalmente.\\n\\n### Limita\xe7\xf5es do webhook\\n\\nSe voc\xea usar o webhook, lembre-se de que:\\n\\n- Se precisar conectar v\xe1rios branches ao Amplify, voc\xea vai precisar de um webhook no Amplify para cada branch, e vai precisar adicionar cada webhook ao GitHub, um por um. Se bater a tenta\xe7\xe3o de fazer um script, converse com a galera que faz admin do Github na sua empresa e tenta aprovar o app Amplify. Ningu\xe9m merece viver na gambiarra.  \\n- Qualquer git push vai espoletar (trigger) o webhook em cada deploy no Amplify. Em outras palavras, se voc\xea tiver as branches \u201cmain\u201d, \u201crelease\u201d, \u201cdev\u201d, \u201cfeature/a\u201d e \u201cfeature/b\u201d, toda vez que algu\xe9m fizer um push em \u201cdev\u201d, a pipeline vai espoletar em todas as cinco branches.\\n\\nEspero ter sido \xfatil, at\xe9 mais!"}]}')}}]);