#!/usr/bin/env node

import { Command } from 'commander'
import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { addFunc, helloWorld } from 'misc-lib'

const program = new Command()

program
  .name('misc-cli')
  .description('CLI tool for misc operations')
  .version('1.0.0')

program
  .command('greet')
  .description('Greets a user using the library')
  .argument('[name]', 'name to greet')
  .action((name) => {
    console.log(helloWorld(name))
  })

program
  .command('add')
  .description('Adds two numbers')
  .requiredOption('-a, --first <number>', 'first number')
  .requiredOption('-b, --second <number>', 'second number')
  .action((options) => {
    const sum = addFunc(Number(options.first), Number(options.second))
    console.log(`Sum: ${sum}`)
  })

program
  .command('interactive')
  .description('Interactive mode')
  .action(async () => {
    const rl = readline.createInterface({ input, output })

    try {
      const name = await rl.question('What is your name? ')
      console.log(helloWorld(name))

      const num1 = await rl.question('Enter number 1: ')
      const num2 = await rl.question('Enter number 2: ')

      const sum = addFunc(Number(num1), Number(num2))
      console.log(`The result is ${sum}`)
    } finally {
      rl.close()
    }
  })

program.parse()
