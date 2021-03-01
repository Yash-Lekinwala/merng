import {ApolloServer} from "apollo-server";
import gql from "graphql-tag";
import mongoose from "mongoose";

import { MONGODB } from "./config.js";
import Post from "./models/Post.js";

const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: Date!
        username: String!
    }
    type Query{
        getPosts: [Post]
    }
`;

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('db connected');
        return server.listen({port:5000})
    })
    .then(res => {
    console.log(`Server running at ${res.url}`);
});