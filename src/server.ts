import bodyParser from "body-parser";
import express from "express";
import cors from "cors";


const app = express();

const port = process.env.PORT || 5012;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors<Request>());

app.get("/", (req, res) => {
  res.status(200).send("Spirit Quotes");
});

app.listen(port, (err?) => {
    if (err) {
        return console.error(err);
    }
  console.log(`Server is running on port http://localhost:${port}`);
});