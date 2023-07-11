/**
 * Importing necessary dependencies
 */
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;

/**
 * Creating instance of the Express application
 */
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let points = 0;
let getData = {}

/**
 * Below function calculates the points based on the total 
 * alphanumeric characters in a given string
 */
const getAlphaNumeric = (name) => {
    const alphaNumeric = /[A-Za-z0-9]/g;
    const validChars = name.match(alphaNumeric); 
    points += validChars?.length ?? 0;

}

/**
 * Below function calculates the points based on the number 
 * of items
 */
const itemCalculator = (items) => {
    let multiplier = Math.floor(items / 2)
    points += multiplier * 5
    
}

/**
 * Below function calculates the points based on the 
 * total amount of the receipt
 */
const totalCal = (total) => {
    if (total % 1 === 0) {
        points += 50;
    }

    if ( total % 0.25 === 0) {
        points += 25;
    }
}

/**
 * Below function calculates the points based on the 
 * short description of every item in the receipt
 */
const itemDescCal = (items) => {
    items.map(item => {
        let itemDesc = item.shortDescription.trim()
        if (itemDesc.length % 3 === 0) {
            points += Math.ceil(item.price * 0.2);
        }
    });
}

/**
 * Below function calculates the points on the basis
 * of the day of purchase is odd 
 */
const oddDayCal = (date) => {
    const day = date.split("-")[2];
    if (day % 2 !== 0) {
        points += 6;
    }
}

/**
 * Below function calculates the points based on the 
 * time of the purchase
 */
const timeCal = (time) => {
    const [hours, minutes] = time.split(":");
    const formattedTime = hours + minutes;
    if (formattedTime > 1400 && formattedTime < 1600) {
        points += 10;
    }
}

/**
 * The below POST method processes the reciept by calculating the points
 * based on the rules and returns a response with the generated receipt id
 */
app.post('/receipts/process', (req, res) => {
    points = 0;

    // Extracting necessary information from the request body for processing the receipt
    let retailerName = req.body.retailer;
    let totalPrice = Number(req.body.total);
    let countItems = req.body.items.length;
    let allItems = req.body.items;
    let dateOfPurchase = req.body.purchaseDate;
    let timeOfPurcahse = req.body.purchaseTime;

    getAlphaNumeric(retailerName);
    totalCal(totalPrice);
    itemCalculator(countItems);
    itemDescCal(allItems);
    oddDayCal(dateOfPurchase);
    timeCal(timeOfPurcahse);

    // Generating unique identity for the receipt
    const ident = uuidv4()

    // Creating a response object with the generated id
    const receiptResponse = {
        id: ident,        
    }
    
    // Storing the points associated with the receipt id in local system storage
    getData[ident] = points;

    res.json(receiptResponse);

})

/**
 * The GET request retrieves the points associated with the specific receipt id 
 * as a JSON response
 */
app.get('/receipts/:id/points', (req, res) => {
    const userId = req.params.id;
    res.json({"points":getData[userId]})
})

/** 
 * Starts the server and listens on the specified port
 */
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

