export interface Config<U> {
  get(key: string): string | undefined;
  get<T extends keyof U>(key: T): U[T];
}
