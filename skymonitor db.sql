-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versione server:              10.4.8-MariaDB - mariadb.org binary distribution
-- S.O. server:                  Win64
-- HeidiSQL Versione:            10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dump della struttura del database skymonitor
CREATE DATABASE IF NOT EXISTS `skymonitor` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `skymonitor`;

-- Dump della struttura di tabella skymonitor.aeroporto
CREATE TABLE IF NOT EXISTS `aeroporto` (
  `codiceIATA` char(3) NOT NULL,
  `città` varchar(20) NOT NULL,
  `nazione` varchar(20) NOT NULL,
  PRIMARY KEY (`codiceIATA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- L’esportazione dei dati non era selezionata.

-- Dump della struttura di tabella skymonitor.monitoraggio
CREATE TABLE IF NOT EXISTS `monitoraggio` (
  `utente` int(6) NOT NULL,
  `volo` char(55) NOT NULL,
  `sogliaPrezzo` float DEFAULT NULL,
  PRIMARY KEY (`utente`,`volo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- L’esportazione dei dati non era selezionata.

-- Dump della struttura di tabella skymonitor.storicoprezzi
CREATE TABLE IF NOT EXISTS `storicoprezzi` (
  `volo` char(55) NOT NULL,
  `dataPrezzo` datetime NOT NULL DEFAULT current_timestamp(),
  `prezzo` float NOT NULL,
  PRIMARY KEY (`volo`,`dataPrezzo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- L’esportazione dei dati non era selezionata.

-- Dump della struttura di tabella skymonitor.utente
CREATE TABLE IF NOT EXISTS `utente` (
  `idUtente` int(6) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `regDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `password` varchar(255) NOT NULL DEFAULT '',
  `nome` varchar(20) NOT NULL,
  PRIMARY KEY (`idUtente`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4;

-- L’esportazione dei dati non era selezionata.

-- Dump della struttura di tabella skymonitor.volomonitorato
CREATE TABLE IF NOT EXISTS `volomonitorato` (
  `idVolo` char(55) NOT NULL,
  `origineIATA` char(3) NOT NULL,
  `destinazioneIATA` char(3) NOT NULL,
  `data` date NOT NULL,
  `orarioPartenza` datetime NOT NULL,
  `orarioArrivo` datetime NOT NULL,
  `numeroVolo` char(7) NOT NULL,
  PRIMARY KEY (`idVolo`),
  UNIQUE KEY `origineIATA` (`origineIATA`,`destinazioneIATA`,`orarioPartenza`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- L’esportazione dei dati non era selezionata.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
