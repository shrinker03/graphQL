const express = require("express");
const { buildSchema } = require("graphql");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");


const schema = buildSchema(`type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
}`)

const rootValue = {
    quoteOfTheDay() {
        return 'Padhle lado...'
    },
    random() {
        return Math.random();
    },
    rollThreeDice() {
        return [1, 2, 3].map(() => 1 + Math.floor(Math.random() * 6));
    }
}

const app = express();
// Serve the actual API logic at /graphql
app.all('/graphql', createHandler({
    schema,
    rootValue
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');