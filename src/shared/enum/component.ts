export const Component = {
  RestApp: Symbol.for('RestApp'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  CityService: Symbol.for('CityService'),
  CityModel: Symbol.for('CityModel'),
} as const;
