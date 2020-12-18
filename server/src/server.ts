import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { buildSchema } from "type-graphql";
import { mongoose } from "@typegoose/typegoose";
import cors from "cors";

const main = async () => {
  // Get express app
  const app = express();

  app.use(cors());

  // Connect to MongoDB
  mongoose.connect("mongodb://localhost/queara", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection error:\n"));
  db.once("open", () => {
    console.log("Connection successfully established");
  });

  // Configure Apollo Server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      // Any resolver found in "./resolvers" will be automatically imported
      resolvers: [path.join(__dirname, "/resolvers/**/*.{ts,js}")],
      dateScalarMode: "timestamp"
    })
  });

  // Give Apollo Server an endpoint to use with express
  apolloServer.applyMiddleware({ app });

  // Just a test REST endpoint for express
  app.get("/", (_, res) => {
    res.send({
      test: "This is an endpoint to make sure express is working"
    });
  });

  app.post("/signin", (_, res) => {
    console.log("request at signin");
  });

  app.listen(8000, () => {
    console.log("Listening at localhost:8000");
  });
};

main();
