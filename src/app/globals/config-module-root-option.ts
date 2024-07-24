import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';

export enum NODE_ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export enum APP_SAVING_STATE {
  IN_MEMORY = 'in-memory',
  CLOUD = 'cloud',
}

const validationSchema = z.object({
  NODE_ENV: z.nativeEnum(NODE_ENV).default(NODE_ENV.DEVELOPMENT),
  APP_SAVING_STATE: z
    .nativeEnum(APP_SAVING_STATE)
    .default(APP_SAVING_STATE.IN_MEMORY),
  PORT: z.number().min(0).max(65535).default(3000),
  AWS_PASSWORD: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  S3_BUCKET: z.string(),
});

export type SchemaEnvironment = z.infer<typeof validationSchema>;

export const ConfigModuleRootOption: ConfigModuleOptions = {
  envFilePath: ['.env.development', '.env.production', '.env.test'],
  isGlobal: true,
  validate: validationSchema.parse,
  validationSchema,
  validationOptions: {
    allowUnknown: false,
    abortEarly: true,
  },
};
