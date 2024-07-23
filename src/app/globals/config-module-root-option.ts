import { ConfigModuleOptions } from '@nestjs/config';
import { z } from 'zod';

export enum NODE_ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

const validationSchema = z.object({
  NODE_ENV: z.nativeEnum(NODE_ENV).default(NODE_ENV.DEVELOPMENT),
  PORT: z.number().min(0).max(65535).default(3000),
  AWS_PASSWORD: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  S3_BUCKET: z.string(),
});

export type SchemaEnvironment = z.infer<typeof validationSchema>;

export const ConfigModuleRootOption: ConfigModuleOptions = {
  envFilePath: ['.env.development', '.env.production', '.env.test'],
  validate: validationSchema.parse,
  validationSchema,
  validationOptions: {
    allowUnknown: false,
    abortEarly: true,
  },
};
