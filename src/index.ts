#!/usr/bin/env node
import {Command} from 'commander'


const program = new Command();

program
  .version('0.0.3')
  .description("An example CLI for ordering pizza's")
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq', 'Add bbq sauce')
  .option('-c, --cheese <type>', 'Add the specified type of cheese [marble]')
  .option('-C, --no-cheese', 'You do not want any cheese')
  .parse(process.argv);

const options = program.opts();

console.log('you ordered a pizza with:',options);
if (options.peppers) console.log('  - peppers');
if (options.pineapple) console.log('  - pineapple');
if (options.bbq) console.log('  - bbq');

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
// commander
//   .version('0.0.3')
//   .description("An example CLI for ordering pizza's")
//   .option('-p, --peppers', 'Add peppers')
//   .option('-P, --pineapple', 'Add pineapple')
//   .option('-b, --bbq', 'Add bbq sauce')
//   .option('-c, --cheese <type>', 'Add the specified type of cheese [marble]')
//   .option('-C, --no-cheese', 'You do not want any cheese')
//   .parse(process.argv);

// import Chalk from "chalk";

// const chalk = new Chalk()

// console.log(
//   chalk.red(
//     'hellow'
//   )
// );