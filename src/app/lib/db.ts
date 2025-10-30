import mongoose, { Mongoose } from "mongoose";

const MONGO_URL = process.env.MONGO_URL as string;

if (!MONGO_URL) {
  throw new Error("Defina a variável MONGO_URL no arquivo .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDatabase(): Promise<Mongoose> {
  if (cached.conn) {
    console.log("✅ Usando conexão existente com o MongoDB");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🔌 Criando nova conexão com o MongoDB...");

    cached.promise = mongoose.connect(MONGO_URL)
      .then((mongoose) => {
        console.log("✅ Conectado ao MongoDB");
        return mongoose;
      })
      .catch((error) => console.log(error));
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
