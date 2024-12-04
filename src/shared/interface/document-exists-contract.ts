export interface DocumentExistsContract {
  exists(documentId: string): Promise<boolean>;
}
