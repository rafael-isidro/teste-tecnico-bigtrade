import express from "express";
import "dotenv/config";

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  return res.send("API working");
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log(`Server is running on PORT: ${PORT}`)
);

export default server;
