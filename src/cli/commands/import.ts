import { Command } from '../../shared/interface/index.js';
import { TSVFileReader } from '../../shared/libs/index.js';

export class Import implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]) {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
