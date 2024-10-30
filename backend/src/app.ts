// TODO : establish MongoDB connections and then run the server

import express from "express";
import userRoutes from "./routes/userRoutes";
import flashCardRoutes from "./routes/flashCardRoutes"
import toDoRoutes from "./routes/toDoRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// User, flashCard, toDo routes
app.use("src/routes/userRoutes.ts", userRoutes);
app.use("src/routes/flashCardRoutes.ts", flashCardRoutes)
app.use("/src/routes/toDoRoutes.ts", toDoRoutes);

const mongoURI = process.env.MONGODB_URI || "";
// Connect to MongoDB using URI
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Database connection successful');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
