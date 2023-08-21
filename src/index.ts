import * as dotenv from "dotenv"
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { itemsRouter } from "./items/items.router"
import { errorHandler } from "./error.middleware"
import { notFoundhandler } from "./middleware/not-found.middleware"

dotenv.config()

if(!process.env.PORT) {
    process.exit(1)
}

const port : number = parseInt(process.env.PORT as string, 10)

const app = express()


app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/api/menu/items', itemsRouter)

app.use(errorHandler)
app.use(notFoundhandler)

app.listen(port, () => {
    console.log(`app listening on port ${port}`);

})