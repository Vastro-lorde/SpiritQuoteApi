import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./_helpers/route.js";
import indexRoute from "./routes/index.route.js"
import 'dotenv/config';
import db from "./utils/db.js"

const app = express();

const port = process.env.PORT || 5012;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));
db().then(()=>{
  app.use(routes.home, indexRoute);
  app.listen(port, (err?) => {
    if (err) {
        return console.error(err);
    }
    console.log(`Server is running on port http://localhost:${port}`);
  });
}).catch((error)=>{
  console.log(`Error: ${error}`);
});


