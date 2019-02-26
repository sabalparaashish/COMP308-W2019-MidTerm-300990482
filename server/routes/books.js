// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/detail', (req, res, next) => {

res.render("books/detail", {
  title:"Add a New Book"
});

});

// POST process the Bok Details page and create a new Book - CREATE
router.post('/detail', (req, res, next) => {

  let new_book=book({
    "Title":req.body.title,
    "Description":req.body.description,
    "Price":req.body.price,
    "Author":req.body.author,
    "Genre":req.body.genre
  });

  book.create(new_book,(err,book)=>{
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/books');
    }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/details/:id', (req, res, next) => {

    
  let id = req.params.id;

  book.findById(id, (err, contactObject) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          // show the edit view
          res.render("books/details", {
              title: "Edit book",
              books: contactObject
          });
      }
  });
  
});
// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {

    
  let id = req.params.id;

  let updatedbook = book({
    _id: id,
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre    
  });

  book.update({_id: id}, updatedbook, (err) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          // refresh the contact-list
          res.redirect('/books');
      }
  })
});
// GET - process the delete by user id
router.get('/:id', (req, res, next) => {

  let id = req.params.id;

  book.remove({_id: id}, (err) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          // refresh the contact list
          res.redirect('/books');
      }
  });
});


module.exports = router;
