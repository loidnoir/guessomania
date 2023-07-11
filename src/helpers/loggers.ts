import chalk from 'chalk'

export function consoleSuccess(text: string) {
  console.log(chalk.bold(chalk.cyanBright(text)))
}