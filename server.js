import express from "express";
// import { ApolloServer, PubSub } from "apollo-server-express";
// import { importSchema } from "graphql-import";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";

import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import db from "./backend/db.js";
import routes from './backend/routes/index.js';
// require('dotenv-defaults').config();
import "dotenv-defaults/config.js";

// const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 4000;

// const typeDefs = importSchema("./backend/schema.graphql");
// const pubsub = new PubSub();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);
// app.use("/api", apiRoute);
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// const server = new ApolloServer({
//     typeDefs,
//     resolvers: {
//         Query,
//         Mutation,
//         Subscription,
//     },
//     context: {
//         db,
//         pubsub,
//     },
// });

// server.applyMiddleware({ app });
const httpServer = http.createServer(app);
// server.installSubscriptionHandlers(httpServer);

db.connect();

httpServer.listen(port, () => {
    console.log(`🚀 Server Ready at ${port}! 🚀`);
    // console.log(`Graphql Port at ${port}${server.subscriptionsPath}`);
});
