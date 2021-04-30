CREATE TABLE `monitoraggio` (
	`utente` INT(6) NOT NULL REFERENCES utente (idUtente),
	`volo` CHAR(55) NOT NULL REFERENCES volomonitorato (idVolo),
	`sogliaPrezzo` FLOAT NULL DEFAULT NULL,
	PRIMARY KEY (`utente`, `volo`)
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB