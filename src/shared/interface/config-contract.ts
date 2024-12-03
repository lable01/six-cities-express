export interface ConfigContract<U> {
  get<T extends keyof U>(key: T): U[T];
}
