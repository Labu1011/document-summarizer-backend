import express from 'express'
import { config } from 'dotenv'

config();

const app = express()

app.get("/", (req, res) => {
    res.send("Hello world");
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})