import { Connection } from "moongoose";

declare global {
  var mongoose: {
    conn: connection | null;
    promise: Promise<Connection> | null;
  };
}

export {};
