import { env } from '@/lib/env.mjs';

declare global {
  export namespace NodeJS {
    type Env = typeof env;

    export interface ProcessEnv extends Env {}
  }
}
