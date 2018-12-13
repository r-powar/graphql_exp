const express = require('express');
const graphQlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/graphql', graphQlHTTP({
    schema: schema,
    graphiql: true
}));

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
    console.log(`Listening to server on port ${PORT}`);
});