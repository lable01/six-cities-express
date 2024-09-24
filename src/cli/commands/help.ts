import { Command } from '../../shared/interface/index.js';
import chalk from 'chalk';

export class Help implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(
      chalk.green(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            ${chalk.blue('cli.js --<command> [--arguments]')}
        Команды:
            ${chalk.yellow('--version')}
            ${chalk.yellow('--help')}
            ${chalk.yellow('--import <path>')}
            ${chalk.yellow('--generate <n> <path> <url>')}
    `),
    );
  }
}
