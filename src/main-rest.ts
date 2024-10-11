import { PinoLogger } from './shared/libs/pino-logger/index.js';
import { RestApp } from './rest/index.js';

async function bootstrap() {
  const logger = new PinoLogger();

  const application = new RestApp(logger);
  await application.init();
}

await bootstrap();
