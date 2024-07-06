import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export async function dbConnect() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
      // {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // }
    );
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDb connected successfully!!!");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit(); //end the process
    });
  } catch (error) {
    console.log("Something went wrong!!!", error);
    process.exit(1); // end process with some failure
  }
}
