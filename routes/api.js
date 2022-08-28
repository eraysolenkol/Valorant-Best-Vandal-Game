const express = require('express');
const router = express.Router();


const database = require('../database/database');

var db = database.db;


router.post('/update', (req, res) => {
    let uuid = req.body.uuid;
    db.query('UPDATE Skins SET points = points + 10 WHERE uuid = ?', uuid , (err) => {
        if (err) {
            res.send({'error':err.code});
        } else {
            res.send({'message':'points updated'});
        }
    });
});


router.get('/skins', (req, res) => {
    db.query("SELECT * FROM Skins ORDER BY points DESC", "", (err, result) => {
        if (err) {
            res.send({'error':err.code})
        } else {
            res.send(result);
        } 
    });
});


module.exports = router;