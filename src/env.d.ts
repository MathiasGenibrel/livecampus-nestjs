import { SchemaEnvironment } from './app/globals/config-module-root-option';

declare namespace NodeJS {
  interface ProcessEnv extends SchemaEnvironment {}
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends SchemaEnvironment {}
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
