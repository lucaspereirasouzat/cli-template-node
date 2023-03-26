
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
## Getting started

This cli is a tool for generate clean code using template from Rodrigo Manguinhos clean-typescript

## Author

- **Lucas Pereira**



## Installation


1. **Install command**

```sh
npm i clean_code_template_cli -g
```
OR for
```sh
npx clean_code_template_cli
```

2. Name File

The name of the file must be used with camel Case to put inside classNames and transfom correctly name of files like Like NameOfFile

3. Sub Folders

The sub folders can be created adding pre paths like /path/NameOfFile

4. Commands

all commands will be uses with  clean_code_template_cli create

CREATING

All commands must used with folder name like /name/ArquiveName

 - Controller

Will create a controller inside a folder /src/application/controllers

```sh
clean_code_template_cli create {{nameFile}} -ctl
```
 - Test

This command need be combined with ctl,use,gat,rep,ent to generate a test
```sh
clean_code_template_cli create {{nameFile}} -ctl -test
```
- Contract

Will generate a contract file to use for a repository or gateway
```sh
clean_code_template_cli create {{nameFile}} -cta
```
- Properties

This command need be combined with ctl,use,gat,rep,ent and add properties file

```sh
clean_code_template_cli create {{nameFile}} -pro
```
- OnlyTest

This command need be combined with ctl,use,gat,rep,ent to generate only a test file

```sh
clean_code_template_cli create {{nameFile}} -onlyTest
```
- UseCase

This command will generate Usecase file inside /src/domain/use-cases

```sh
clean_code_template_cli create {{nameFile}} -use
```
- Gateway

This command will generate Gateway file inside /src/infra/gateways

```sh
clean_code_template_cli create {{nameFile}} -gat
```
- Repository

This command will generate Repository file inside /src/infra/repos/postgres

```sh
clean_code_template_cli create {{nameFile}} -rep
```
- Entities

This command will generate Entities file inside /src/domain/entities

```sh
clean_code_template_cli create {{nameFile}} -ent
```

- Error

This command will generate Error file inside /src/domain/entities/errors

```sh
clean_code_template_cli create {{nameFile}} -err
```

