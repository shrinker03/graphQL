const express = require("express");
const { buildSchema } = require("graphql");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");


const schema = buildSchema(`type Query {
    rollDice(numDice: Int!, numSide: Int): [Int]    
}`);

const rootValue = {
    rollDice({numDice, numSide}) {
        const output = [];
        
        for (let i = 0; i < numDice; i++) {
            output.push(Math.floor(Math.random() * (numSide || 6)));
        }

        return output;
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