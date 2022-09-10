import mongoose from "mongoose"
import express from "express"
import { graphqlHTTP } from "express-graphql"
import schema from "./schema/schema.js"
import cors from "cors"
import bodyParser from "body-parser"
const app = express()

mongoose.connect("mongodb://localhost/proyecto")

mongoose.connection.once("open", () => {
    console.log("MongoDB connection has been established succesfully")
})

app.use(bodyParser.json({limit:"32mb", extended: true}))
app.use(bodyParser.urlencoded({limit:"32mb", extended: true}))
app.use(cors())

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(5000, () => {
    console.log("Listening on port 5000")
})

