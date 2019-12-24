
DROP TABLE IF EXISTS readtheseyo;

CREATE TABLE IF NOT EXISTS
readtheseyo (
  id SERIAL PRIMARY KEY,
  book_author VARCHAR(255) NOT NULL,
  book_title VARCHAR(255) NOT NULL,
  book_ISBN VARCHAR(255) NOT NULL,
  book_imgURL 
  book_description VARCHAR(255) NOT NULL
);


