import express from "express";
import "dotenv/config";
import fileUpload from "express-fileupload";
import cors from "cors";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public")); //serve image and data
app.use(fileUpload());
app.use(helmet()); //for secure http headers
app.use(cors());

app.get("/", (req, res) => {
  return res.json({ message: "Hello, Its Working.." });
});

//Import API Routes
import ApiRoutes from "./routes/api.js";
app.use("/api", ApiRoutes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
