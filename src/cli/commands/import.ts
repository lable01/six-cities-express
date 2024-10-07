import { Command } from '../../shared/interface/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { OfferData } from '../../shared/types/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

export class Import implements Command {
  private onImportedOffer(offer: OfferData): void {
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.addListener('line', this.onImportedOffer);
    fileReader.addListener('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
