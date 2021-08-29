const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3003;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = (app) => {
    // Basic route that sends the user first to the AJAX Page
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

    app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));

    app.get('/reservation', (req, res) => res.sendFile(path.join(__dirname, 'reservation.html')));


    // Create new Reservation - takes in JSON input
    app.post('/api/reservation', (req, res) => {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        const newReservation = req.body;

        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newReservation.routeName = newReservation.name.replace(/\s+/g, '').toLowerCase();
        console.log(newReservation);
    })
}

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
