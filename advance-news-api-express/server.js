import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  return res.json({ message: "Hello, Its Working..." });
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
