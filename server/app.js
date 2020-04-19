const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const { PORT = 8087, USER, PASSWORD } = process.env;

const mongoUrl = `mongodb+srv://${USER}:${PASSWORD}@mongo-kogoo.mongodb.net/test?retryWrites=true&w=majority`;

const app = express();
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log('connected to the database'));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
