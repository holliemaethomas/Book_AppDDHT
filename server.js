'use strict';


// call in all requirements for project
const PORT = process.env.PORT || 3000
require('dotenv').config();
const express = require('express');
const app = express();
const superagent = require('superagent');
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', (e) => console.error(e));
client.connect();

// function to handle errors
function errors(error, res) {
  console.error(error);
  res.render('./pages/error');
}
console.log(errors);

// set view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

/////app.get for home page
app.get('/', (req, res) => {
  res.render('./pages/index');
});

function Book(bookObject) {
  this.title = bookObject.volumeInfo.title;
  this.authors = bookObject.volumeInfo.authors;
  this.description = bookObject.volumeInfo.description;
  this.image_url = bookObject.volumeInfo.imageLinks && bookObject.volumeInfo.imageLinks.thumbnail;
}

app.get('/', (req, res) => {
  const instruction = `SELECT * FROM books;`;
  client.query(instruction).then(function (sqlData) {
    const booksArray = sqlData.rows;
    console.log(booksArray)
    if (booksArray.length > 0) {
      res.render('pages/index', { booksArray })
    } else {
      res.render('pages/index')
    }

  });
});



// credit for this functionality is from class demo
app.post('/show', (req, res) => {
  superagent.get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.searchType}+in${req.body.query}`)
    .then(data => {
      const books = data.body.items.map(book => new Book(book))
      console.log(books)
      res.render('./pages/show', { books: books });
    })
    .catch(err => {
      errors(err, res)
    });
})

// .then(data => data.body.items.map(book => new Book(book.volumeInfo)))
//     console.log(book)
//     .then(results => res.render('pages/show', {results: results}))
//     .catch(err => {
//       errors(err, res)
//     });
//   })




app.listen(PORT, () => console.log(`Port ${PORT} for the win!`));

