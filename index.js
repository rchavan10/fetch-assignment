const express = require('express');
const bodyParser = require('body-parser')
const port = 3000;

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

function getAlphaNumeric(name) {
    const alphaNumeric = /[A-Za-z0-9]/g;
    const points = name.match(alphaNumeric);

    return points ? points.length : 0;
}

app.get('/', (req, res) => {
    res.send('Hello World')
  })

app.post('/receipts/process', (req, res) => {
    let points = 0;
    let retailerName = req.body.retailer;

    points += getAlphaNumeric(retailerName);

    res.send('Points gained:' + JSON.stringify(points));

    // res.send('Receipt recieved: ' + JSON.stringify(receipt));
})  


app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

