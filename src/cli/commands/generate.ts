import { Command } from '../../shared/interface/index.js';

export class Generate implements Command {
  public getName(): string {
    return '--generate';
  }

  public execute(...parameters: string[]): void {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    // Код для получения данных с сервера.
    // Формирование объявлений.
  }
}
