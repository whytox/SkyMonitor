CREATE TABLE `volomonitorato` (
	`idVolo` CHAR(55) NOT NULL PRIMARY KEY,
	`origineIATA` CHAR(3) NOT NULL,
	`destinazioneIATA` CHAR(3) NOT NULL ,
	`data` DATE NOT NULL,
	`orarioPartenza` DATETIME NOT NULL,
	`orarioArrivo` DATETIME NOT NULL,
	`numeroVolo` CHAR(7) NOT NULL,
	UNIQUE (`origineIATA`, `destinazioneIATA`, `orarioPartenza`)
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;
