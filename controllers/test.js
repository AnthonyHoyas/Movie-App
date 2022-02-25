const sqlite3 = require('sqlite3').verbose();




const testdb = (req, res) => {

  let sendData = {data: []};

  let db = new sqlite3.Database('db/db.moviedatabase', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the movie database.');
  });
   db.serialize(() => {
    db.each(`SELECT * FROM test`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log('hello')
      console.log(row.content)
      sendData.data.push(row.content)

    });
    // res.send(sendData)
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log(sendData)
    res.send(sendData)
    console.log('Close the database connection.');
  });

}

const addTest = (data) => {
  let db = new sqlite3.Database('db/db.moviedatabase');
  // db.run(`INSERT INTO movie (title, url, type, year) VALUES ("terminator", "enroule.jpg", "film", "sdlfn")`, function(err) {
  db.run(`INSERT INTO test (content) VALUES (?)`, [data.data], function(err) {
      if (err) {
        return console.log(err);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
  });

  console.log(data)
  db.close();

}

exports.addTest = addTest;
exports.testdb = testdb;