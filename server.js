require("dotenv").config()
const express = require("express")
const cors = require("cors")
const {scopePerRequest} = require("awilix-express")
const container = require("./infrastructure/config/di/container")
const router = require("./infrastructure/api/user/router")
const {initializeDatabase} = require("./infrastructure/db")
const errorMiddleware = require("./infrastructure/helpers/errorMiddleware")


const PORT = process.env.PORT || 5000
const app = express()
console.log(container)
app.use(scopePerRequest(container))

const userRouter = container.resolve('userRouter')

app.use(express.json())
app.use(cors())
app.use(errorMiddleware)
app.use("/api", userRouter)

const start = async () =>{
	try {
		await initializeDatabase()
		app.listen(PORT, () => console.log(`server started ${PORT}`))
	}catch (e) {
		console.log(e)
	}
}

start().then()