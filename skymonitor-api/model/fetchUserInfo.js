const database = require('./database');
const bcrypt = require('bcryptjs');

module.exports =  async (req, res, next) =>  {
    const FETCH_USER_ID = `SELECT * FROM utente WHERE email='${req.user.email}'`;

     database.getConnection(function(error, connection) {
         if (error) { res.status(500).send("DB error"); throw err; }

         connection.query(FETCH_USER_ID, async function(err, row, field) {
             connection.release();

             if (err) { res.status(500).send("DB error"); throw err; }

             if (!row[0])
                return res.status(400).send("Wrong email");

             const isValidPass = await bcrypt.compare(req.body.password, row[0].password);
             if (!isValidPass) return res.status(400).send("Wrong password.");
             res.user = {
                 id:   row[0].idUtente,
                 name: row[0].nome,
                 email: row[0].email
             }
             next();
         })
     })
}