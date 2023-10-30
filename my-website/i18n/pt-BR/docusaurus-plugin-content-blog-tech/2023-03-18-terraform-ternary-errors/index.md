---
slug: terraform-ternary-error
title: 'Solução: Terraform não deixa ternários terem tipos diferentes'
authors: manu
tags: [infra, terraform, gambiarra, devops]
---

Você já encontrou esse erro no Terraform, quando o que você queria era exatamente ter tipos diferentes no resultado do ternário?

>The true and false result expressions must have consistent types
> > As expressões de resultado verdadeiro e falso devem ter tipos consistentes

Vou dar dois exemplos de como contornar esse problema, mas a regra geral é esta aqui:


```terraform
atributo = [
    <resultado caso true>, 
    <resultado caso false>
    ][<condicional> ? 0 : 1]
```

<!--truncate-->

## Exemplo simples

```hcl
locals {
    valor_dinamico = [
      {"regiao": "${var.regiao}"}, 
      "indisponível"
      ][var.regiao == "eu-west-1" ? 0 : 1 ]
}
```

No exemplo acima, `local.valor_dinamico` vai ser avaliado como `{"regiao: "eu-west-1"}`, que é um `objeto`, se a região da AWS for a Irlanda; e retorna `"indisponível"`, que é uma `string`, se for alguma outra região.

### Pera, como é que é?

Em vez de usar o ternário da maneira tradicional, nós usamos uma tupla (também conhecida como lista com tipos mistos) e aproveitamos a estrutura do ternário para avaliar qual índice contém o valor que precisamos. 

No fundo, estamos selecionando se queremos o primeiro ou segundo valor que está na tupla, como se fosse tupla[0] ou tupla[1].

Obrigada Mariux pelo truque.

## Um exemplo menos simples

Você também pode fazer coisas mais complexas e dinâmicas, se quiser. Não estou dizendo que seja recomendável ou bonito, mas às vezes a gente faz o que tem que ser feito.

No meu caso, a lógica ternária que eu precisava era usado em uma Step Function. Eu tinha um objeto, e se esse objeto tivesse só uma chave (key), eu precisava de um JSON. Se o objeto tivesse mais do que uma chave, eu precisava de um JSON diferente. 

A coisa é meio feia porque tem lógica em tudo quanto é lugar, mas aqui vai o resultado:

```hcl
variable "ssm_params" {
    description = "Parâmetro exigido pelo SSM Documents para ativar rotação de chaves KMS"
    default     = [{"KeyId": "States.Array($.KeyId)",
                    "AutomationAssumeRole": "States.Array($.AutomationAssumeRole)"}]
}

locals {
  choices = [for item in var.ssm_params: [
    merge(flatten([
      # Caso: Existe apenas uma condição (isTrue)
      for key, value in item: {
        "IsPresent": true,
        "Next": "SSM-${key}",
        "Variable": "$.${key}"
      }
    ])...), 
    merge([
      # Case: Existem várias condições (AND) 
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
}
``` 

Minha tupla tem dois valores, os dois começam com `merge`. O primeiro merge é um objeto, e o segundo é um array, e nos dois casos, os valores são dinâmicos.

Depois, a parte do condicional também é dinâmico. Eu extraio as chaves do objeto, coloco as chaves em um array só usando `flatten` e avalio o tamanho desse array de chaves. Se tiver só uma chave, meu resultado final é o primeiro valor da tupla. Caso contrário, o resultado final será o segundo valor da tupla, que é o array.

Não me pergunte como eu não joguei o computador pela janela. Mas funcionou. E eu nunca mais quero precisar fazer uma coisa dessas. :P
