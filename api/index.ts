import express, { Request, Response } from "express"
import aws from "aws-sdk"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';
import fs from "fs"
dotenv.config();
const app = express();
app.use(bodyParser.json())
const port = 5000;
const apiUrl = process.env.API_URL;

const s3 = new aws.S3({
  endpoint: "sgp1.digitaloceanspaces.com",
});

const html = `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <script type="text/javascript">
      localStorage.setItem("apiUrl", '${apiUrl}')
      window.location.href = "/"
    </script>
  </body>
  </html>
`

app.use(express.static('public'))

app.get('/api', (req: Request, res: Response) => {
  res.send(html)
})

app.get("/api/users", (req: Request, res: Response) => {
  res.send(JSON.stringify({name : "thuya", age: 30}))
})

app.post("/api/uploads", (req: Request, res: Response) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    const myfile = JSON.parse(JSON.stringify(files.images));

    const filepath = myfile.filepath;
    const filename = uuidv4() + myfile.originalFilename;
    const fileStream = fs.createReadStream(filepath);

    s3.upload({
      Bucket: "msquarefdc",
      Key: `thuyasoe/${filename}`,
      ACL: 'public-read',
      Body: fileStream
    }, (err, data) => {
        if (err) {
          console.log(err);
          res.json({ message: "file upload error form s3 upload" });
        } else if (data) {
          console.log(data);
          res.json({ message: "success!" });
        }
      })
  });
})

app.listen(port, () => console.log(`server is listening at ${port}`))
