import mongoose from "mongoose";
import destination from "../models/DestinationReview.js";

//model
import place from "../models/Place.js";

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const uri = "mongodb+srv://kanakkhandelwal0202:WluzMgLBXjrOKnC6@cluster0.fsz85zm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function run() {
  try {
    // Example: Set all users' status to "active"
    const result = await place.deleteMany({}, { name: "Jaipur" });
    console.log("Deletion complete:", result);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.disconnect();
  }
}
async function run2() {
  try {
    // Example: Set all users' status to "active"
    const result = await destination.deleteMany({}, { place: "Jaipur" });
    console.log("Deletion complete:", result);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    mongoose.disconnect();
  }
}

run2();

