const express = require("express");
const { buildSchema } = require("graphql");
// FIX: Import from the specific Express adapter
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");

const schema = buildSchema(`type Query { hello: String }`);

const rootValue = {
  hello() {
    return 'Hello World!';
  },
}

const app = express();

// Serve the Ruru (GraphiQL) UI at the root
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

// Serve the actual API logic at /graphql
app.all('/graphql', createHandler({
    schema,
    rootValue
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');