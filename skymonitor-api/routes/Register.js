const router = require('express').Router();
const validateUserData = require('../model/validateUserData');
const assertNotExistUser = require('../model/assertNotExistUser');
const pool = require('../model/database');
const bcrypt = require('bcryptjs');

/*
 * API router che registra un utente.
 */
router.post('/register', validateUserData, assertNotExistUser, async (req, res) => {

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(req.user.password, salt);

    // Prepare query
    const INSERT_USER = `INSERT INTO utente (nome, email, password) values 
    ('${req.user.name}', '${req.user.email}', '${hashed_pass}')`;

    pool.getConnection(function(error, connection) {
        if (error) { res.status(500).send("DB error"); throw err; }

        // Execute query
        connection.query(INSERT_USER, function(err, row) {
            connection.release();

            if (err) { res.status(500).send("DB error"); throw err; }
            //console.log(row);
            res.status(200).send("User registered.");
        });
    });
});


module.exports = router;