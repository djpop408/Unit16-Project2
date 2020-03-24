DROP DATABASE IF EXISTS travel_db;
CREATE DATABASE travel_db;
USE travel_db;

CREATE TABLE travel
(
	id int NOT NULL AUTO_INCREMENT,
	city varchar(300) NOT NULL,
	flight varchar(300) NOT NULL,,
	PRIMARY KEY (id)
);

INSERT INTO travel (city, flight) VALUES ("Los Angeles, CA", "Jetblue");
