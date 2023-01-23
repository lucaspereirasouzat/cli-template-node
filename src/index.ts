#!/usr/bin/env node
import { Command } from "commander";
import fs, { existsSync } from "fs";
import adapter from './main/adapter'
// import { makeController } from "./factories/domain/use-cases/create-usecase";

const program = new Command();
// console.log(process.cwd())
program
  .name("template-clean-arquiteture")
  .description("CLI based on template clean arquiteture")
  .version("0.0.1");

program
  .command("create <name>")
  .description("Create a new file based on a template")
  .option("-t, --tests", "Create test")
  .option("-co, --contract", "Create Contract")
  .option("-c, --controller", "Create Controller")
  .option("-u, --useCase", "Create UseCases")
  .option("-g, --gateWay", "Create Gateway")
  .option("-r, --repo", "Create repository")
  .action((name, options) => {
    adapter(name, options, process.cwd())
    // console.log('ithens', name, options, __dirname);
  });

program.parse(process.argv);

const options = program.opts();
if (options.debug) console.log('options', options);
