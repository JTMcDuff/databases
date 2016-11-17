CREATE DATABASE chat;

USE chat;

-- CREATE TABLE users (
--  id INT unsigned NOT NULL AUTO_INCREMENT,
--  name VARCHAR(30) NOT NULL,
--  PRIMARY KEY (id)
-- );

-- CREATE TABLE rooms (
--  id INT unsigned NOT NULL AUTO_INCREMENT,
--  room VARCHAR(30) NOT NULL,
--  PRIMARY KEY (id)
-- );

CREATE TABLE messages (
  id INT unsigned NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL,
  text VARCHAR(150) NOT NULL,
  roomname VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

