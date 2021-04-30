CREATE TABLE StoricoPrezzi
(
	volo CHAR(55)  NOT NULL REFERENCES volomonitorato (codiceVolo),
	dataPrezzo DATE NOT NULL DEFAULT current_timestamp(),
	prezzo FLOAT NOT NULL,
	PRIMARY KEY (volo, dataPrezzo)
	
)