#!/usr/bin/env node
import { Command } from 'commander'
import adapter from './main/adapter'

const program = new Command()
program
  .name('template-clean-arquiteture')
  .description('CLI based on template clean arquiteture')
  .version('0.0.1')

program
  .command('create <name>')
  .description('Create a new file based on a template')
  .option('-t, --tests', 'Create test')
  .option('-co, --contract', 'Create Contract')
  .option('-c, --controller', 'Create Controller')
  .option('-u, --useCase', 'Create UseCases')
  .option('-g, --gateWay', 'Create Gateway')
  .option('-r, --repo', 'Create repository')
  .option('-e, --entity', 'Create entity')
  .option('-p', '--properties', 'Properties')
  .action((name, options) => {
    console.log('entrou')

    adapter(name, options, process.cwd())
  })

program.parse(process.argv)

const options = program.opts()
if (options.debug) console.log('options', options)
