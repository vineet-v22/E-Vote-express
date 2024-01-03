DROP DATABASE IF EXISTS evoteexpress;
CREATE DATABASE evoteexpress;
USE evoteexpress;

CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    city VARCHAR(50) DEFAULT 'Indore',
    pin_code INT UNSIGNED DEFAULT 452020,
    dob DATE NOT NULL,
    reg_date DATE
);

CREATE TABLE pending_users (
    username VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    city VARCHAR(50) DEFAULT 'Indore',
    pin_code INT UNSIGNED DEFAULT 452020,
    dob DATE NOT NULL,
    reg_date DATE
);


CREATE TABLE elections (
    election_id INT UNSIGNED PRIMARY KEY,
    election_name VARCHAR(50) NOT NULL,
    edate DATE NOT NULL,
    start_time TIME DEFAULT '08:00:00',
    end_time TIME DEFAULT '18:00:00'
);

CREATE TABLE candidates(
username VARCHAR(50) ,
election_id INT UNSIGNED ,
vote_count INT DEFAULT 0,
PRIMARY KEY(username,election_id),
FOREIGN KEY(username) REFERENCES users(username),
FOREIGN KEY (election_id) REFERENCES elections(election_id)
);

CREATE TABLE votes (
    username VARCHAR(50),
    election_id INT UNSIGNED,
    candidate_username VARCHAR(50) NOT NULL,
    PRIMARY KEY (username , election_id),
    FOREIGN KEY(username) REFERENCES users(username),
    FOREIGN KEY (election_id , candidate_username)
        REFERENCES candidates (election_id , username)
);

CREATE TABLE results (
    election_id INT UNSIGNED,
    username VARCHAR(50),
    standing INT UNSIGNED NOT NULL,
    vote_count INT UNSIGNED DEFAULT 0,
    PRIMARY KEY (election_id , username),
    FOREIGN KEY (election_id , username)
        REFERENCES candidates (election_id , username),
    FOREIGN KEY (election_id)
        REFERENCES elections (election_id)
);

CREATE TABLE requests(
req_id INTEGER UNSIGNED AUTO_INCREMENT,
username VARCHAR(50),
title TEXT,
description TEXT,
PRIMARY KEY(req_id),
FOREIGN KEY(username) REFERENCES users(username)
);

