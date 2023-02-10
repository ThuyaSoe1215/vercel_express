import express, { Request, Response } from "express"
import dotenv from "dotenv"
dotenv.config();
const app = express();
const port = 5000;
const apiUrl = process.env.API_URL;

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

app.listen(port, () => console.log(`server is listening at ${port}`))
