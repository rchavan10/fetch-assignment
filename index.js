const express = require('express');
const bodyParser = require('body-parser')
const port = 3000;


const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let points = 0;

function getAlphaNumeric(name) {
    const alphaNumeric = /[A-Za-z0-9]/g;
    const validChars = name.match(alphaNumeric); 
    points += validChars?.length ?? 0;

}

function totalCal(total) {
    if (total % 1 === 0) {
        points += 50;
    }

    if ( total % 0.25 === 0) {
        points += 25;
    }
}

app.get('/', (req, res) => {
    res.send('Hello World')
  })

app.post('/receipts/process', (req, res) => {
    points = 0;
    let retailerName = req.body.retailer;
    let totalPrice = Number(req.body.total);

    getAlphaNumeric(retailerName);
    totalCal(totalPrice);

    res.send('Points:' + JSON.stringify(points));

    // res.send('Receipt recieved: ' + JSON.stringify(receipt));
})  


app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

