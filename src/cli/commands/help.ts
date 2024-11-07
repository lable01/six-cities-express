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
        Пример для работы с командами приложения:
            ${chalk.blue('cli.js --<command> [--arguments]')}
        Команды для работы с приложением:
            ${chalk.yellow('--version')}
            ${chalk.yellow('--help')}
            ${chalk.yellow('--import <path>')}
            ${chalk.yellow('--generate <n> <path> <url>')}
        Команда для работы с docker (запускаем только команду):
            ${chalk.yellow('docker compose --file ./docker-compose.dev.yml --env-file ./.env --project-name "six-cities" up -d')}
        Команды для соединения с базой данных:
            ${chalk.yellow('npm run start:dev')}
    `),
    );
  }
}
