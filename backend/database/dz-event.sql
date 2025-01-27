-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2025 at 10:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dz-event`
--

-- --------------------------------------------------------

--
-- Table structure for table `availability`
--

CREATE TABLE `availability` (
  `Dispo_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `status` enum('Available','Unavailable') NOT NULL,
  `Prestataire_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `checklisttasks`
--

CREATE TABLE `checklisttasks` (
  `task_id` int(11) NOT NULL,
  `task_name` varchar(255) NOT NULL,
  `Prestataire_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `client_id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `familyName` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `GmailAd` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `commentaire`
--

CREATE TABLE `commentaire` (
  `comment_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `content` text NOT NULL,
  `rating` float DEFAULT NULL,
  `client_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `eventdate`
--

CREATE TABLE `eventdate` (
  `event_date_id` int(11) NOT NULL,
  `event_date` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pictures`
--

CREATE TABLE `pictures` (
  `picture_id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT current_timestamp(),
  `Prestataire_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prestataire`
--

CREATE TABLE `prestataire` (
  `Prestataire_id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `familyname` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `Gmail_ad` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `userBio` text DEFAULT NULL,
  `job_description` text DEFAULT NULL,
  `role` enum('Photographer','Caterer','Venue Manager','DJ','Florist','Event Planner','Videographer','Makeup Artist','Hair Stylist','Security','Waiter','Decorator','Lighting Technician','Sound Engineer','Transporter','Other') DEFAULT NULL,
  `profile_pic_url` varchar(255) DEFAULT NULL,
  `wilaya` enum('Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Béjaïa','Biskra','Béchar','Blida','Bouira','Tamanrasset','Tébessa','Tiaret','Tizi Ouzou','Alger','Djelfa','Jijel','Sétif','Saïda','Skikda','Sidi Bel Abbès','Annaba','Guelma','Constantine','Médéa','Mostaganem','M’sila','Mascara','Ouargla','Oran','El Bayadh','Illizi','Bordj Bou Arréridj','Boumerdès','El Tarf','Tindouf','Tissemsilt','El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma','Aïn Témouchent','Ghardaïa','Relizane') NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `prestataire`
--

INSERT INTO `prestataire` (`Prestataire_id`, `firstname`, `familyname`, `password`, `Gmail_ad`, `created_at`, `userBio`, `job_description`, `role`, `profile_pic_url`, `wilaya`) VALUES
(1, 'chirine', 'bouchareb', '$2a$10$QkdfMoqDpLiuHYvfGn8.uenAa/2XtncplNBHfG0ANJRrM13RSgGV.', 'chirine@gmail.com', '2025-01-04 19:47:55', 'professional photographer with over 10 years of experience in capturing life’s most precious moments. Specializing in portrait, event, and commercial photography', NULL, 'Photographer', NULL, 'Adrar');

-- --------------------------------------------------------

--
-- Table structure for table `reservationfrom`
--

CREATE TABLE `reservationfrom` (
  `from_id` int(11) NOT NULL,
  `address` text NOT NULL,
  `wilaya` varchar(50) NOT NULL,
  `num_tel` varchar(10) NOT NULL,
  `client_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reserver`
--

CREATE TABLE `reserver` (
  `service_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `event_date_id` int(11) NOT NULL,
  `reserved_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reservation_status` enum('pending','accepted','rejected') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `ser_description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `Prestataire_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `availability`
--
ALTER TABLE `availability`
  ADD PRIMARY KEY (`Dispo_id`),
  ADD KEY `Prestataire_id` (`Prestataire_id`);

--
-- Indexes for table `checklisttasks`
--
ALTER TABLE `checklisttasks`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `Prestataire_id` (`Prestataire_id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`client_id`),
  ADD UNIQUE KEY `GmailAd` (`GmailAd`);

--
-- Indexes for table `commentaire`
--
ALTER TABLE `commentaire`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `eventdate`
--
ALTER TABLE `eventdate`
  ADD PRIMARY KEY (`event_date_id`);

--
-- Indexes for table `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`picture_id`),
  ADD KEY `Prestataire_id` (`Prestataire_id`);

--
-- Indexes for table `prestataire`
--
ALTER TABLE `prestataire`
  ADD PRIMARY KEY (`Prestataire_id`),
  ADD UNIQUE KEY `Gmail_ad` (`Gmail_ad`);

--
-- Indexes for table `reservationfrom`
--
ALTER TABLE `reservationfrom`
  ADD PRIMARY KEY (`from_id`),
  ADD UNIQUE KEY `num_tel` (`num_tel`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `reserver`
--
ALTER TABLE `reserver`
  ADD PRIMARY KEY (`service_id`,`client_id`,`event_date_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `Prestataire_id` (`Prestataire_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `availability`
--
ALTER TABLE `availability`
  MODIFY `Dispo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `checklisttasks`
--
ALTER TABLE `checklisttasks`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `commentaire`
--
ALTER TABLE `commentaire`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `eventdate`
--
ALTER TABLE `eventdate`
  MODIFY `event_date_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pictures`
--
ALTER TABLE `pictures`
  MODIFY `picture_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prestataire`
--
ALTER TABLE `prestataire`
  MODIFY `Prestataire_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `reservationfrom`
--
ALTER TABLE `reservationfrom`
  MODIFY `from_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;