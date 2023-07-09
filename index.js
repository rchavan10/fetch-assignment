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

function itemCalculator(items) {
    let multiplier = Math.floor(items / 2)
    points += multiplier * 5
    
}


function totalCal(total) {
    if (total % 1 === 0) {
        points += 50;
    }

    if ( total % 0.25 === 0) {
        points += 25;
    }
}

function itemDescCal(items) {
    items.map(item => {
        let itemDesc = item.shortDescription.trim()
        if (itemDesc.length % 3 === 0) {
            points += Math.ceil(item.price * 0.2);
        }
    });
}

app.get('/', (req, res) => {
    res.send('Hello World')
  })

app.post('/receipts/process', (req, res) => {
    points = 0;
    let retailerName = req.body.retailer;
    let totalPrice = Number(req.body.total);
    let countItems = req.body.items.length;
    let allItems = req.body.items

    getAlphaNumeric(retailerName);
    totalCal(totalPrice);
    itemCalculator(countItems);
    itemDescCal(allItems);

    // res.send('total items:' + JSON.stringify(totalItems));
    res.send('Points: ' + JSON.stringify(points))
    // res.send('Receipt recieved: ' + JSON.stringify(receipt));
})  


app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

