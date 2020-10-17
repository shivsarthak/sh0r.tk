const PORT = process.env.PORT || 8080;
const express = require('express');
const app = express();
const url = process.env.DB_URL || "demo";
const db = require('monk')(url);


function randomStr(len) {
    return Math.random().toString(36).slice(2, len + 2);
}


app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));

app.post('/', async(req, res, next) => {
    try {
        var id = req.body.tag;
        console.log(id == "");
        if (id == "") {
            id = randomStr(4);
        }
        const collection = db.get('urlDB');
        const result = await collection.findOne({ tag: id });
        if (result) {
            throw new Error("Tag already Exists");
        }
        const write = await collection.insert({ tag: id, url: req.body.url });
        res.send(`<h3>Url is : <a href="http://sh0r.tk/${write.tag}">http://sh0r.tk/${write.tag}</a></h3>`, 200);
        client.close();

    } catch (err) {
        next(err.message);
    }
});

app.get('/:id', async(req, res) => {
    try {
        const collection = db.get('urlDB');
        var result = await collection.findOne({ tag: req.params.id });
        if (result)
            res.redirect(result.url);
        else {
            res.status(404).send("NOT FOUND");
        }
    } catch (err) {
        console.log(err);
        res.send("Error Occured try again", 500);
    }
});



app.listen(PORT, function() {
    console.log('Server is listening on port ' + PORT)
});