import { Command } from '../../shared/interface/index.js';

export class Help implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            --version
            --help
            --import <path>
            --generate <n> <path> <url>
    `);
  }
}
