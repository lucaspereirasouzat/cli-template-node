#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _commander = require("commander");
var program = new _commander.Command();
program.name("string-util").description("CLI to some JavaScript string utilities").version("0.8.0");
console.log("entrou clise");
program.command("create <name>").description("Create a new file based on a template").option("-c, --controller", "Create Controller").option("-u, --useCases", "Create Controller")// .option('-t, --template <template>', 'Template to use')
// .option('-d, --directory <directory>', 'Directory to save the file')
.action(function(name, options) {
    console.log(name, options);
//  const result = makeController().handle('src/resources/views/templates/Controller.html')
//   console.log(result);
//     try {
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
var options = program.opts();
if (options.debug) console.log(options);
