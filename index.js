import {ApolloServer} from "apollo-server";
import mongoose from "mongoose";

import { MONGODB } from "./config.js";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/typeDefs.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
})

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('db connected');
        return server.listen({port:5000})
    })
    .then(res => {
    console.log(`Server running at ${res.url}`);
});