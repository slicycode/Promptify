import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "Promptify",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);

    isConnected = true;

    console.log("=> new database connection");
  } catch (error) {
    console.log("=> error connecting to database:", error);
  }
};
