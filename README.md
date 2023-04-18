

<!-- markdownlint-configure-file {

"MD013": {

"code_blocks": false,

"tables": false

},

"MD033": false,

"MD041": false

} -->

<div align="center">



# Clean code Template cli



</div>



![npm](https://img.shields.io/npm/dw/clean_code_template_cli) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/clean_code_template_cli)

![npm](https://img.shields.io/npm/v/clean_code_template_cli)



## Getting started



This cli is a tool for generate clean code using template from Rodrigo Manguinhos clean-typescript







# 1. **Install command**

  Global install

```bash

npm i clean_code_template_cli -g

```

OR with npx


```bash

npx clean_code_template_cli

```



# 2. Name File



The name of the file must be used with camel Case or snake case or  to put inside classNames and transfom correctly name of files like Like NameOfFile



# 3. Sub Folders



The sub folders can be created adding pre paths like /path/NameOfFile



# 4. Commands



all commands will be uses with clean_code_template_cli create



CREATING



All commands must used with folder name like /name/ArquiveName


## Controller



Will create a controller inside a folder /src/application/controllers



```sh

clean_code_template_cli create {{nameFile}} -ctl

```



will create



```ts

import { Controller } from '@/application/controllers'

import { HttpResponse, ok } from '@/application/helpers'

import { ValidationBuilder as Builder, Validator } from 'library-validators'

import { CreateCustomer } from '@/domain/contracts/repos'

import { {{ className }}UseCase } from '@/domain/use-cases'



type HttpRequest = {

name: string

nickname: string

email: string

inscription: string

firstName: string

lastName: string

password: string

domain: string

}

type Model = Error | CreateCustomer.Output



export class {{ className }}Controller extends Controller {

constructor (private readonly {{ className }}: {{ className }}UseCase) {

super()

}



async perform (input: HttpRequest): Promise<HttpResponse<Model>> {

const data = await this.{{ className }}(input)

return ok(data)

}



override buildValidators ({ name, email, inscription, firstName, lastName, password, domain }: HttpRequest): Validator[] {

return [

...Builder.of({ value: name, fieldName: 'name' }).required().build(),

...Builder.of({ value: email, fieldName: 'email' }).required().build(),

...Builder.of({ value: firstName, fieldName: 'firstName' }).required().build(),

...Builder.of({ value: lastName, fieldName: 'lastName' }).required().build(),

...Builder.of({ value: inscription, fieldName: 'inscription' }).required().build(),

...Builder.of({ value: password, fieldName: 'password' }).required().build(),

...Builder.of({ value: domain, fieldName: 'domain' }).required().build()

]

}

}



```



## Contract



Will generate a contract file to use for a repository or gateway, does't have test file

```sh

clean_code_template_cli create {{nameFile}} -cta

```



will create



```ts

export interface {{ className }} {

{{ classNameLower }}: (input: {{ className }}.Input) => Promise<{{ className }}.Output>

}



export namespace {{ className }} {

export type Input = {

{{ properites }}

}

export type Output = undefined | {

{{ properites }}

}

}



```


## UseCase

This command will generate Usecase file inside /src/domain/use-cases

```sh

clean_code_template_cli create {{nameFile}} -use

```

will create

```ts

//import { LoadFacebookUser, TokenGenerator } from '@/domain/contracts/gateways'

//import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos'

//import { AccessToken, FacebookAccount, AuthenticationError } from '@/domain/entities'



type Setup = () => {{ className }}

type Input = { {{ properties }} }

type Output = { accessToken: string }

export type {{ className }} = (input: Input) => Promise<Output>



export const setup{{ className }}: Setup = () => async input => {



}

```

## Gateway

This command will generate Gateway file inside /src/infra/gateways


```sh

clean_code_template_cli create {{nameFile}} -gat

```

will create

```ts

//import { {{ className }} } from '@/infra/gateways'



export class {{ className }} // implements

{

constructor(

// private readonly httpClient: HttpGetClient,

){}



async handle(input: {{ className }}.Input): Promise<{{ className }}.Output>{



}

}



```
## Repository


This command will generate Repository file inside /src/infra/repos/postgres

```sh

clean_code_template_cli create {{nameFile}} -rep

```

will create

```ts

//import { {{ className }}Show, {{ className }}Update } from '@/domain/contracts/repos'

import { PgRepository } from '@/infra/repos/postgres/repository'

import { Pg{{ className }} } from './entities'



export class Pg{{ className }}Repository extends PgRepository // implements {

async {{ className }} (input: {{ className }}.Input): Promise<{{ className }}.Output> {



}



async show ({ id }: {{ className }}Show.Input): Promise<{{ className }}Show.Output> {

const pg{{classNameLower}}Repo = await this.getRepository(Pg{{className}})

const {{classNameLower}} = await pg{{className}}Repo.findOne({ id })



if ({{classNameLower}} !== undefined) {

return {

id: {{classNameLower}}.id,

contactId: {{classNameLower}}.contactId,

email: {{classNameLower}}.email,

default: {{classNameLower}}.default as boolean,

created_at: {{classNameLower}}.createdAt,

updated_at: {{classNameLower}}.updatedAt

}

}

}

async store (input: {{ className }}Store.Input): Promise<{{ className }}Store.Output> {

const pg{{ className }}Repo = await this.getRepository(Pg{{ className }})

const contactEmail = await pg{{ className }}Repo.save(input)



return {

id: contactEmail.id,

contactId: contactEmail.contactId,

email: contactEmail.email,

default: contactEmail.default as boolean,

created_at: contactEmail.createdAt

}

}



async update ({ emailId, ...input }: {{ className }}Update.Input): Promise<{{ className }}Update.Output> {

const pg{{ className }}Repo = await this.getRepository(Pg{{ className }})



const result = await pg{{ className }}.update({ id: emailId }, input)



return result.affected != null && result.affected > 0

}



async delete ({ id }: {{ className }}Delete.Input): Promise<{{ className }}Delete.Output> {

const pg{{ className }}Repo = await this.getRepository(Pg{{ className }})



const result = await pg{{ className }}Repo.delete({ id })



return result.affected != null && result.affected > 0

}

}



```

## Entities

This command will generate Entities file inside /src/domain/entities

```sh

clean_code_template_cli create {{nameFile}} -ent

```

will create

```ts

export class {{ className }} {

constructor( {{ properties }} ){}



execute(): Promise<void>{}

}



```
## Error

This command will generate Error file inside /src/domain/entities/errors


```sh

clean_code_template_cli create {{nameFile}} -err

```

will create

```ts

export class {{ className }} extends Error {

constructor () {

super('{{ className }}')

this.name = '{{ className }}'

}

}

```


## Adapter



This command will generate Adapter file inside /src/main/adapter



```sh

clean_code_template_cli create {{nameFile}} -adp

```



will create

```ts

import { Controller } from '@/application/controllers'



import { RequestHandler } from 'express'



type Adapter = (controller: Controller) => RequestHandler



export const adapt{{ className }}: Adapter = controller => async (req, res) => {

const { statusCode, data } = await controller.handle({ ...req.body, ...req.locals, ...req.params, ...req.query })

const json = [200, 204].includes(statusCode) ? data : { error: data.message }

res.status(statusCode).json(json)

}

```


## Decorator

```sh

clean_code_template_cli create {{nameFile}} -dec

```

This command will generate Decorator file inside /src/aplication/decorator

```ts
import { {{ className }} } from '@/application/contracts'

import { Controller } from '@/application/controllers'

import { HttpResponse } from '@/application/helpers'

import { Validator } from '@/domain/contracts'



export class {{ className }}Controller extends Controller {

constructor (

private readonly decoratee: Controller,

private readonly db: {{ className }}

) {

super()

}



override buildValidators (httpRequest: any): Validator[] {

return this.decoratee.buildValidators(httpRequest)

}



async perform (httpRequest: any): Promise<HttpResponse> {

await this.db.openTransaction()



try {

const httpResponse = await this.decoratee.perform(httpRequest)

await this.db.commit()

return httpResponse

} catch (error) {

await this.db.rollback()

throw error

} finally {

await this.db.closeTransaction()

}

}

}
```


## Route

```sh

clean_code_template_cli create {{nameFile}} -rot

```

This command will generate Decorator file inside /src/main/routes

```ts
import { adaptExpressRoute as adapt } from '@/main/adapters'

import { make{{ className }} } from '@/main/factories/application/controllers'



import { Router } from 'express'



export default (router: Router): void => {

router.post('/message/send', adapt(make{{ className }}()))

}
```

## Validation

```sh

clean_code_template_cli create {{nameFile}} -val

```

This command will generate Decorator file inside /src/main/routes

```ts
// import { InvalidFieldError } from '@/application/errors'

import { Validator } from './validator'



export class {{ className }} implements Validator {

constructor (

private readonly value: Date,

private readonly field: string

) { }



validate (): Error | undefined {

// if (isNaN(Date.parse(this.value.toString()))) return new InvalidFieldError(this.field)

}

}
```

# 5. Combined Commands

## Test



This command need be combined with ctl,use,gat,rep,ent to generate a test

```sh

clean_code_template_cli create {{nameFile}} -ctl -test

```



## Properties



This command need be combined with ctl,use,gat,rep,ent and add properties file



```sh

clean_code_template_cli create {{nameFile}} -pro

```

## OnlyTest



This command need be combined with ctl,use,gat,rep,ent to generate only a test file



```sh

clean_code_template_cli create {{nameFile}} -onlyTest

```



# Author

- **Lucas Pereira**

