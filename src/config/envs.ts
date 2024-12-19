import * as joi from 'joi';
import 'dotenv/config';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  API_KEY_GOOGLE_GEMINI: string;
  JWT_SECRET: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    API_KEY_GOOGLE_GEMINI: joi.string().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: EnvVars = value;

export const envs = {
  port: envsVars.PORT,
  databaseUrl: envsVars.DATABASE_URL,
  apiKeyGoogleGemini: envsVars.API_KEY_GOOGLE_GEMINI,
  jwtSecret: envsVars.JWT_SECRET,
};
