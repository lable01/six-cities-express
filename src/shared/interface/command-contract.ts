export interface CommandContract {
  getName(): string;
  execute(...parameters: string[]): void;
}
