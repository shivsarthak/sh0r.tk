const express = require('express');
const app = express();

app.get('/', (req, res) => {

    res.send(`<h1>Url Shortener<h1>`);

});

app.get('/:id', (req, res) => {

    res.json({
        url: `req.params.id`
    });

});

app.listen(3000, function () {
    console.log('Server is listening on port 8080')
});