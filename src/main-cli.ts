#!/usr/bin/env node
import 'reflect-metadata';

import {
  CLIApplication,
  Help,
  Version,
  Import,
  Generate,
} from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new Help(),
    new Version(),
    new Import(),
    new Generate(),
  ]);
  cliApplication.processCommand(process.argv);
}

bootstrap();
