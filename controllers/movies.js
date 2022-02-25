const sqlite3 = require('sqlite3').verbose();

// CODE TO ADD MOVIE TO DATABASE


const moviedel = (data) => {
    console.log('jessaiedeDelincontroller');
    console.log(data.data);
    let db = new sqlite3.Database('db/db.moviedatabase');
    db.run(`DELETE FROM movie WHERE title="${data.data.title}"`, function(err) {
        if (err) {
          return console.log(err);
        }
        // get the last insert id
        console.log(`A row has been deleted with rowid ${this.lastID}`);
    });
  
    //console.log(data)
    db.close();

}

const moviedb = (req, res) => {

    let sendData = {data: []};
  
    let db = new sqlite3.Database('db/db.moviedatabase', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the movies database.');
    });
     db.serialize(() => {
      db.each(`SELECT * FROM movie`, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        console.log('hello');
        console.log(row);
        console.log(row.content)
        sendData.data.push(row)
  
      });
       //res.send(sendData)
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

const addMovie = (data) => {
    console.log(data);
    let db = new sqlite3.Database('db/db.moviedatabase');

    db.run(`INSERT INTO movie (title, url, type, year) VALUES ("${data.data.Title}", "${data.data.Poster}", "${data.data.Type}", "${data.data.Year}")`, function(err) {
        if (err) {
          return console.log(err);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
  
    //console.log(data)
    db.close();
  
  }
  exports.addMovie = addMovie;
  exports.moviedb = moviedb;
  exports.moviedel = moviedel;
