import dotenv from "dotenv";
import connectmongo from "./db/index.js";
import app from "./app.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config({
  path: "./env",
});

connectmongo()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
// ROUTES DEFINE
app.use("/api/auth", userRoutes);
app.use("/api/notes", taskRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(
    ` Server is running at port : https://localhost:${process.env.PORT}`
  );
});
