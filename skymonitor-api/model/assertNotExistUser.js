const pool = require('./database');

module.exports = (req, res, next) => {
    const FIND_USER = `SELECT idUtente FROM utente WHERE email='${req.user.email}'`;

    pool.getConnection(function(err, connection) {
        if (err) { res.status(500).send("DB error"); throw err; }

        connection.query(FIND_USER, function(error, row, field) {
            connection.release();

            if (error) { res.status(500).send("DB error"); throw err; }

            //console.log(row[0].idUtente);
            if (row[0]) return res.status(400).send("Email already exists.");
            next();
        })
    });

}