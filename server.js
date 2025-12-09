const { buildSchema, graphql } = require("graphql");

const schema = buildSchema(`type Query { hello: String }`);

const rootValue = {
    hello() {
        return 'Hello World!';
    },
}

graphql({
    schema,
    source: '{ hello }',
    rootValue,
}).then((response) => {
    console.log(response);
})