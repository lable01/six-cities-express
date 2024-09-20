import { CLIApplication, Help, Version } from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([new Help(), new Version()]);
  cliApplication.processCommand(process.argv);
}

bootstrap();
