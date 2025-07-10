import { Connection } from 'moongoose';

declare global {
  var mongoose: {
    conn: connection | null;
    promise: Promise<Connection> | null;
  };

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
    }
  }
}

export {};
