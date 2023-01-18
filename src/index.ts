#!/usr/bin/env node
import { Command } from "commander";
import fs, { existsSync } from "fs";
import { makeController } from "./factories/domain/use-cases/create-usecase";

const program = new Command();

program
  .name("template-clean-arquiteture")
  .description("CLI based on template clean arquiteture")
  .version("0.0.1");

program
  .command("create <name>")
  .description("Create a new file based on a template")
  .option("-t, --tests", "Create test")
  .option("-c, --controller", "Create Controller")
  .option("-u, --useCases", "Create UseCases")
  .option("-g, --gateWay", "Create gateway")
  .option("-r, --repo", "Create repository")

  // .option('-t, --template <template>', 'Template to use')
  // .option('-d, --directory <directory>', 'Directory to save the file')
  .action((name, options) => {
    console.log(name, options);

    // console.log(__dirname)

    const result = makeController().handle(__dirname, name);
    console.log(result);

    //        try {

    // console.log('entrou clise options',name, options)

    //     // Read the template file
    //     const templateContent = fs.readFileSync(options.template, 'utf8');
    //     console.log(templateContent);

    //     const fileContent = templateContent
    //    .replace('{{ className }}', 'MyClass')
    //   .replace(
    //     '{{ properties }}',
    //     JSON.stringify([{ name: 'myProp', type: 'string' }])
    //   );

    //   try {

    //     if(existsSync(options.directory)){
    //         fs.mkdirSync(`${options.directory}`);
    //     }
    //   } catch (error) {

    //   }

    //     // Create the new file
    //     const filePath = `${options.directory}/${name}`;
    //     fs.writeFileSync(filePath, fileContent);

    //     const result = fs.readFileSync(filePath, 'utf8');
    //     console.log(result);

    //     } catch (error) {
    //       console.log(error);
    //     }
  });

program.parse(process.argv);

const options = program.opts();
if (options.debug) console.log(options);
