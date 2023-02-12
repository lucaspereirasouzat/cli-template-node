#!/usr/bin/env node
import { Command } from 'commander'
// import packajson from 'package.json'
import adapter from './main/adapter'

const program = new Command()
program
  .name('clean_code_template_cli')
  .description('CLI based on template clean arquiteture')
  .version('0.0.34')

program
  .command('create <name>')
  .description('Create a new file based on a template')
  .option('-test, --tests', 'Create test')
  .option('-onlyTest', '--onlyTest', 'Run only test')
  .option('-pro', '--properties', 'Properties')
  .option('-cta, --contract', 'Create Contract')
  .option('-err, --error', 'Create error')
  .option('-ctl, --controller', 'Create Controller')
  .option('-use, --useCase', 'Create UseCases')
  .option('-gat, --gateWay', 'Create Gateway')
  .option('-rep, --repo', 'Create repository')
  .option('-ent, --entity', 'Create entity')
  .action((name, options) => {
    console.log('entrou')

    adapter(name, options, process.cwd())
  })

program.parse(process.argv)

const options = program.opts()
if (options.debug) console.log('options', options)
