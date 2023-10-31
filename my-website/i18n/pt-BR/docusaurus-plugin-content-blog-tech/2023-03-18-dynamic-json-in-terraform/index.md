---
slug: dynamic-json-in-terraform
title: Como Gerar JSON Dinâmico no Terraform
authors: manu
tags: [infra, terraform, IaC, step functions, devops]
---

Quem programa não se aguenta, né? Não pode ver uma coisinha declarativa que já quer fazer um loop, colocar uma lógica, faz qualquer coisa menos... declaração.

Aqui vou mostrar como gerar um JSON dinâmico no Terraform. Neste artigo vou usar Step Functions como exemplo, mas você pode usar o JSON que quiser.

## O que vamos fazer

O JSON abaixo vai sofrer uma transformação. Vamos substituir os valores estáticos por:

1. [Uma variável](#caso-1-injetando-uma-variável-no-json)
2. [Uma lista dinâmica](#caso-2-injetando-uma-lista-no-json)
3. [Um ou mais objetos dinâmicos](#caso-3-injetando-um-objeto-no-json)

<!--truncate-->

(Adicionei comentários não idiomáticos dentro do código, mas é só para deixar bem claro o que estamos fazendo.)

```json
# JSON de referência
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
              "FunctionName": "my_function_name"  <-- Caso 1: Substituir a string explícita por uma string dinâmica
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
              {                                          |-- Caso 2: Substituir por uma lista dinâmica
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
        },                                           |-- Caso 3: Substituir por um ou mais objetos dinâmicos
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

Primeiro, salve o JSON acima em formato de template. Você pode usar a extensão `.tpl` ou `.tftpl`. Embora o Terraform recomende usar a segunda opção, não existe uma regra rígida sobre qual extensão usar.

## Caso 1: Injetando uma variável no JSON

Vamos começar atualizando o valor `FunctionName` no template, usando interpolação:

```json
# modules/templates/stepfunction_definition.tftpl (parcial)

{"Handle Notification": {
        "Type": "Task",
        "Resource": "arn:aws:states:::lambda:invoke",
        "OutputPath": "$.Payload",
        "Parameters": {
          "Payload.$": "$",
          "FunctionName": "${nome_da_lambda}"  <--- Aqui! -->
        },
        "End": true
      }
}
```

O template precisa ser renderizado como um JSON válido, então vamos usar a função `templatefile` do Terraform. Pra isso, usamos dois argumentos: o caminho (path) do template e um mapa de variáveis a serem injetadas na runtime (execução). Vou tentar manter o módulo o mais dinâmico possível, e vou incluir locals, variáveis e resources (recursos) do Terraform para mostrar como as coisas funcionam juntas.

```json
# modules/stepfunction.tf (arquivo completo)

locals {
    file = templatefile("${path.module}/templates/stepfunction_definition.tpl", {
        nome_da_lambda = var.nome_da_lambda
    })
}
variable "nome_da_lambda" {
    description = "Nome da lambda"
    type        = string
}

resource "aws_sfn_state_machine" "sfn_state_machine" {
    name        = var.nome_da_step_function
    role_arn    = var.sf_role_arn
    definition  = local.file
}
```

Agora vamos salvar um `main.tf` um nível acima, onde os valores explícitos (hardcoded) serão definidos.

```json
# main.tf (arquivo completo)

module "minha_step_function" {
  source                = "./modules/step_functions"
  nome_da_step_function    = "autoremediação"
  sf_role_arn           = "arn:aws:iam::123456789012:role/autoremediação"
  nome_da_lambda  = "lambda_de_autoremediação"
}
```

Se quiser conferir que a variável foi injetada com sucesso, execute `terraform init && terraform plan` no terminal.

## Caso 2: Injetando uma lista no JSON

Só pra lembrar, esta é a lista que estamos refatorando:

```json
# modules/templates/stepfunction_definition.tftpl (parcial)

"Choice": {
    "Type": "Choice",
    "Choices": [                              -------
        {                                           |
          "IsPresent": true,                        |
          "Next": "SSM Execution-InstanceId",       |
          "Variable": "$.InstanceId"                |
        },                                          |
        {                                           |--- Case 2: Abstrair a lista
          "IsPresent": true,                        |
          "Next": "SSM Execution-SecurityGroupIds", |
          "Variable": "$.SecurityGroupIds"          |
        }                                           |
    ],                                        -------
    "Default": "Pass"
}
```

Vamos refatorar o template de novo. Vamos usar uma função do Terraform chamada `jsonencode`, que faz a lista de objetos usada no template ser renderizada como JSON:

```json
# modules/templates/stepfunction_definition.tftpl(parcial)

"Choice": {
    "Type": "Choice",
    "Choices": ${jsonencode(lista_de_opções)},  <--- A lista toda vai ficar em uma linha só! -->
    "Default": "Pass"
    }
 ```

Agora, vamos ver duas maneiras de passar a lista para o template.

### A solução mais simples: lista explícita

Uma opção é criar uma variável que vai passar uma lista pronta:

```json
# modules/stepfunction.tf (parcial)

locals {
    file = templatefile("${path.module}/templates/stepfunction_definition.tpl", {
        nome_da_lambda = var.nome_da_lambda
        lista_de_opções = var.minha_lista   <------- Adicionamos esta linha -->
    })
}

variable "minha_lista" {                <-------- E esta variável -->
    description = "A lista que você quiser"
    type = list
}
```

Agora, no módulo `main.tf`, passe os valores das variáveis. O JSON ficou é dinâmico, mas a lista é ainda é meio “estática” porque foi definida explicitamente no módulo principal. E várias vezes, isso basta.

```json
# main.tf (arquivo completo)

module "minha_step_function" {
    source                = "./modules/step_functions"
    nome_da_step_function    = "autoremediação"
    sf_role_arn           = "arn:aws:iam::123456789012:role/autoremediação"
    nome_da_lambda  = "lambda_de_autoremediação"

    minha_lista = [{                            <-------- Aqui colocamos o valor explícito -->
        "IsPresent": true,
        "Next": "SSM Execution-InstanceId",
        "Variable": "$.InstanceId"
    }]
}
```

### A solução com muita lógica: lista dinâmica

Mas e se você quiser que a lista em si também seja dinâmica? Por exemplo, você quer gerar a lista extraindo os valores de um parâmetro, e depois enviar a lista para o json?
Em nosso exemplo, vamos gerar as listas de `Next` e `Variable` extraindo as chaves (keys) que estão em `ssm_params`, no arquivo principal `main.tf`:

```json
# main.tf (arquivo completo)

module "minha_step_function" {
    source                = "./modules/step_functions"
    nome_da_step_function    = "autoremediação"
    sf_role_arn           = "arn:aws:iam::123456789012:role/autoremediação"
    nome_da_lambda  = "lambda_de_autoremediação"

                       <--- Tiramos a lista estática que estava aqui -->
    ssm_params = [     <--- Vamos gerar uma lista usando as chaves deste objeto! -->
        {"InstanceId": "States.Array($.InstanceId)"},    
        {"SecurityGroupIds": "States.Array($.SecurityGroupIds)"}
    ]
}
```

Nosso módulo vai ficar assim:

```json
# modules/stepfunction.tf (arquivo completo)

locals {
    lista_de_opções = flatten([for item in var.ssm_params: [
        for chave, valor in item : {
            "IsPresent": true,
            "Next": "SSM Execution-${chave}"
            "Variable": "$.${chave}",
        }]
    ])
    file = templatefile("${path.module}/templates/stepfunction_definition.tpl", {
        nome_da_lambda = var.nome_da_lambda,
        lista_de_opções = local.lista_de_opções
    })
}

variable "nome_da_lambda" {
    description = "Nome da lambda"
    type        = string
}

variable "ssm_params" {
    description = "Lista dos parâmetros de SSM a serem injetados"
    type = list
}

resource "aws_sfn_state_machine" "sfn_state_machine" {
    name        = var.nome_da_step_function
    role_arn    = aws_iam_role.step_function_role_arn
    definition  = local.file
}
```

Começando com a linha `lista_de_opções = flatten([for item in var.ssm_params:` ignore `flatten` por um momento e observe o loop. 

`ssm_params` é uma lista, e vamos ver cada item. O loop está entre colchetes, o que significa que o resultado será uma lista. O `:` que se segue é apenas parte da sintaxe do loop.

Na linha a seguir, temos outro loop: `for chave, valor in item : {` . Este loop passa em cada objeto do `ssm_params`, acessando a chave e o valor. Assim, podemos extrair e reestruturar os dados. O loop também é colocado entre colchetes, o que significa que, infelizmente, cada objeto estará dentro de uma lista própria. O resultado final vai ficar assim: `[[obj1],[obj2]]`

Agora, lembra do `flatten`? Essa função do Terraform é necessária porque precisamos achatar (flatten) esse resultado que está cheio de aninhamento (nesting) desnecessário. O flatten faz nosso resultado ficar assim: `[obj1, obj2]`.

Pronto.

## Caso 3: Injetando um objeto no JSON

Agora, a parte mais emocionante. Vamos abstrair objetos inteiros. (Neste caso, significa que etapas inteiras das Step Functions podem ficar dinâmicas!)
Iss o é o que estamos refatorando:

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
        },                                           |---------- ISSO TUDO!
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

Pra variar, vamos modificar o template:

```json
# modules/templates/stepfunction_definition.tftpl (parcial)

"States": {
    "Choice": {
      "Type": "Choice",
      "Choices": ${jsonencode(choices)},
      "Default": "Pass"
    },
    %{ for chave, data in ssm_execution }   <--- A parte que vamos adicionar agora --->
        "${chave}": ${jsonencode(data)},
    %{ endfor }
    "Handle Notification": {<--- bláblá-->}
    }
```

Se seu linter reclamar, mantenha a fé que tá tudo certo.  

Mas o que está acontecendo? Estamos usando a sintaxe [diretiva do Terraform](https://developer.hashicorp.com/terraform/language/expressions/strings#directives) `%{}` para escrever uma string dinâmica (pois é, templates são tratados como strings) .

A linha `%{ for chave, data in ssm_execution }` informa à função `templatefile` que uma iteração vai começar, e que csó termina quando chegar na linha `%{ endfor }`. Enquanto isso, a função vai ontinuar criando pares de chave-valor com o formato `"minha_chave": {"meu": "json"},`.

Legal, né?

Então agora vamos adicionar o valor local `ssm_execution`, a lógica que irá preencher tudo isso.

```json
# modules/stepfunction.tf (parcial)

locals {
    choices = flatten([for item in var.ssm_params: [
        for chave, valor in item : {
            "IsPresent": true,
            "Next": "SSM Execution-${chave}"
            "Variable": "$.${chave}",
        }]
    ])

    <--- Olha ele aqui! -->
    ssm_execution = merge(flatten([for item in var.ssm_params: [ 
                    for chave, valor in item : {
                        "SSM Execution-${chave}": {
                            "Type": "Task",
                            "Parameters": {
                              "DocumentName.$": "$.DocumentName",
                              "Parameters": {"$.${chave}": "${valor}"}
                            },
                            "Resource": "arn:aws:states:::aws-sdk:ssm:startAutomationExecution",
                            "Next": "Handle Notification",
                            "ResultPath": "$.TaskResult"
                        }
                    }
                    ]]
                )...)

    file = templatefile("${path.module}/templates/stepfunction_definition.tpl", {
        nome_da_lambda = var.nome_da_lambda,
        lista_de_opções = local.choices,
        ssm_execution = local.ssm_execution <--- Oh hi! -->
    })
}
```

Já estamos familiarizados com loops e flatten, então vamos falar sobre as novidades: `merge` e `...`.

`merge` é uma função do Terraform que junta vários objetos em um só. Então, se tivermos dois objetos assim:

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

a função `merge` vai transformá-los em:

```json
{
     "a": 1,
     "b": 2,
     "c": 3,
     "d": 4
}
```

E se você estava prestando atenção, notou que a função merge em nosso módulo **não** está usando objetos como argumento, ela está usando a função flatten (que gera uma única lista). O truque está aqui: `...`.

No Terraform, `...` (três pontos) funciona como o operador spread em Javascript: ele expande a lista em argumentos separados, individuais.

Então é isso. Nosso template final ficou literalmente com metade do tamanho do JSON original. Ele é dinâmico, reutilizável e o melhor de tudo – você nunca mais vai precisar o Amazon States Language no seu projeto. Vale cada minuto investido.

## Arquivos Finais

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
              "FunctionName": "${nome_da_lambda}"
            },
            "End": true
        },
        "Choice": {
            "Type": "Choice",
            "Choices": ${jsonencode(choices)},
            "Default": "Pass"
        },
        %{ for chave, data in ssm_execution }
        "${chave}": ${jsonencode(data)},
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
        for chave, valor in item : {
            "IsPresent": true,
            "Next": "SSM Execution-${chave}"
            "Variable": "$.${chave}",
        }]
    ])

    ssm_execution = merge(flatten([for item in var.ssm_params: [ 
                    for chave, valor in item : {
                        "SSM Execution-${chave}": {
                            "Type": "Task",
                            "Parameters": {
                              "DocumentName.$": "$.DocumentName",
                              "Parameters": {"$.${chave}": "${valor}"}
                            },
                            "Resource": "arn:aws:states:::aws-sdk:ssm:startAutomationExecution",
                            "Next": "Handle Notification",
                            "ResultPath": "$.TaskResult"
                        }
                    }
                    ]]
                )...)

    file = templatefile("${path.module}/templates/stepfunction_definition.tpl", {
        nome_da_lambda = var.nome_da_lambda,
        lista_de_opções = local.choices,
        ssm_execution = local.ssm_execution
    })
}

variable "nome_da_lambda" {
    description = "Nome da lambda"
    type        = string
}

variable "ssm_params" {
    description = "Lista dos parâmetros de SSM a serem injetados"
    type = list
}

resource "aws_sfn_state_machine" "sfn_state_machine" {
    name        = var.nome_da_step_function
    role_arn    = var.sf_role_arn
    definition  = local.file
}
```

```json
# main.tf (arquivo completo)

module "minha_step_function" {
    source                = "./modules/step_functions"
    nome_da_step_function    = "autoremediação"
    sf_role_arn           = "arn:aws:iam::123456789012:role/autoremediação"
    nome_da_lambda  = "lambda_de_autoremediação"

    ssm_params = [                
        {"InstanceId": "States.Array($.InstanceId)"},    
        {"SecurityGroupIds": "States.Array($.SecurityGroupIds)"}
    ]
}
```
