import express from "express";

//Routes file
import routes from "./routes/index.js";
const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.send("hello");
});

app.use(routes);
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
