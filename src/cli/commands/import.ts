import { Command } from '../../shared/interface/index.js';

export class Import implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]) {}
}
