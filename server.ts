import express from "express";
import * as path from "path";

const port: number = 3000;
const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./view")));
app.use(express.static(path.join(__dirname, "./build")));
app.use("/models", express.static(path.join(__dirname, "./models")));

app.get("/", (req: express.Request, res: express.Response) => res.sendFile("index.html"));

app.listen(port, () => console.log(`Serving in http:localhost:${port}`));
