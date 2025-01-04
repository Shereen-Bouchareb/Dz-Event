-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : Dim 22 déc. 2024 à 10:33
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dz_events`
--

-- --------------------------------------------------------

--
-- Structure de la table `availability`
--

DROP TABLE IF EXISTS `availability`;
CREATE TABLE IF NOT EXISTS `availability` (
  `Dispo_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `status` enum('Available','Unavailable') NOT NULL,
  `Prestataire_id` int(11) NOT NULL,
  PRIMARY KEY (`Dispo_id`),
  KEY `Prestataire_id` (`Prestataire_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `checklisttasks`
--

DROP TABLE IF EXISTS `checklisttasks`;
CREATE TABLE IF NOT EXISTS `checklisttasks` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `task_name` varchar(255) NOT NULL,
  `Prestataire_id` int(11) NOT NULL,
  PRIMARY KEY (`task_id`),
  KEY `Prestataire_id` (`Prestataire_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `familyName` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `GmailAd` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `GmailAd` (`GmailAd`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
CREATE TABLE IF NOT EXISTS `commentaire` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `content` text NOT NULL,
  `rating` float DEFAULT NULL,
  `client_id` int(11) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `client_id` (`client_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `eventdate`
--

DROP TABLE IF EXISTS `eventdate`;
CREATE TABLE IF NOT EXISTS `eventdate` (
  `event_date_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_date` date NOT NULL,
  PRIMARY KEY (`event_date_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pictures`
--

DROP TABLE IF EXISTS `pictures`;
CREATE TABLE IF NOT EXISTS `pictures` (
  `picture_id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Prestataire_id` int(11) NOT NULL,
  PRIMARY KEY (`picture_id`),
  KEY `Prestataire_id` (`Prestataire_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `prestataire`
--

DROP TABLE IF EXISTS `prestataire`;
CREATE TABLE IF NOT EXISTS `prestataire` (
  `Prestataire_id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `familyname` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `Gmail_ad` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `userBio` text,
  `Job_description` text,
  `role` varchar(50) DEFAULT NULL,
  `profile_pic_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Prestataire_id`),
  UNIQUE KEY `Gmail_ad` (`Gmail_ad`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `reservationfrom`
--

DROP TABLE IF EXISTS `reservationfrom`;
CREATE TABLE IF NOT EXISTS `reservationfrom` (
  `from_id` int(11) NOT NULL AUTO_INCREMENT,
  `address` text NOT NULL,
  `wilaya` varchar(50) NOT NULL,
  `num_tel` varchar(10) NOT NULL,
  `client_id` int(11) NOT NULL,
  PRIMARY KEY (`from_id`),
  UNIQUE KEY `num_tel` (`num_tel`),
  KEY `client_id` (`client_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `reserver`
--

DROP TABLE IF EXISTS `reserver`;
CREATE TABLE IF NOT EXISTS `reserver` (
  `Prestataire_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `event_date_id` int(11) NOT NULL,
  `reserved_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `reservation_status` enum('en attente','refusé','accepté') NOT NULL,
  PRIMARY KEY (`Prestataire_id`,`client_id`,`event_date_id`),
  KEY `client_id` (`client_id`),
  KEY `event_date_id` (`event_date_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_name` varchar(100) NOT NULL,
  `ser_description` text,
  `price` decimal(10,2) NOT NULL,
  `Prestataire_id` int(11) NOT NULL,
  PRIMARY KEY (`service_id`),
  KEY `Prestataire_id` (`Prestataire_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
