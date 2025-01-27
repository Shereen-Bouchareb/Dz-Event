-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2025 at 08:37 PM
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

--
-- Dumping data for table `checklisttasks`
--

INSERT INTO `checklisttasks` (`task_id`, `task_name`, `Prestataire_id`) VALUES
(1, 'Courts métrages ou montage vidéo résumant l’événement.', 1),
(2, '1', 0);

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

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`client_id`, `firstName`, `familyName`, `password`, `GmailAd`, `createdAt`) VALUES
(1, 'kamel', 'tari', '$2a$10$vqU/GVZZC6ctuzcyVC5t.uGF4a6aExQ/sCx/yyIvPU3eMT94phUfi', 'tari@gmail.com', '2025-01-04 21:48:11'),
(2, 'alaa', 'rhmn', '$2a$10$M98qKcR56oSCDz53aVzYoOMA0gpefH5Ciah3Mc1S6yhcMQs8mewL2', 'tarih@gmail.com', '2025-01-25 15:31:39');

-- --------------------------------------------------------

--
-- Table structure for table `commentaire`
--

CREATE TABLE `commentaire` (
  `comment_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `content` text NOT NULL,
  `rating` float DEFAULT NULL,
  `client_id` int(11) NOT NULL,
  `prestataire_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `commentaire`
--

INSERT INTO `commentaire` (`comment_id`, `created_at`, `content`, `rating`, `client_id`, `prestataire_id`) VALUES
(1, '2025-01-24 19:16:38', 'This is a great service!', 5, 1, 1),
(2, '2025-01-24 19:17:42', 'amazing!', 5, 1, 1),
(3, '2025-01-24 19:18:13', 'wooow saliha!', 5, 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `eventdate`
--

CREATE TABLE `eventdate` (
  `event_date_id` int(11) NOT NULL,
  `event_date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `eventdate`
--

INSERT INTO `eventdate` (`event_date_id`, `event_date`) VALUES
(2, '2025-02-14 00:00:00'),
(3, '2025-02-14 00:00:00'),
(4, '2025-02-14 00:00:00');

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
  `wilaya` enum('Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Béjaïa','Biskra','Béchar','Blida','Bouira','Tamanrasset','Tébessa','Tiaret','Tizi Ouzou','Alger','Djelfa','Jijel','Sétif','Saïda','Skikda','Sidi Bel Abbès','Annaba','Guelma','Constantine','Médéa','Mostaganem','M’sila','Mascara','Ouargla','Oran','El Bayadh','Illizi','Bordj Bou Arréridj','Boumerdès','El Tarf','Tindouf','Tissemsilt','El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma','Aïn Témouchent','Ghardaïa','Relizane') DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `prestataire`
--

INSERT INTO `prestataire` (`Prestataire_id`, `firstname`, `familyname`, `password`, `Gmail_ad`, `created_at`, `userBio`, `job_description`, `role`, `profile_pic_url`, `wilaya`) VALUES
(1, 'chirine', 'bouchareb', '$2a$10$QkdfMoqDpLiuHYvfGn8.uenAa/2XtncplNBHfG0ANJRrM13RSgGV.', 'chirine@gmail.com', '2025-01-04 19:47:55', 'professional photographer with over 10 years of experience in capturing life’s most precious moments. Specializing in portrait, event, and commercial photography', NULL, 'Photographer', NULL, 'Adrar'),
(2, 'zeyneb', 'draa', '$2a$10$c1kJpzXZi8EwVQXwy.hBhO/vUmhwzxj18/rA3Icjsl.HedW7QnJbO', 'zeyneb@gmail.com', '2025-01-04 21:17:12', 'professional photographer with over 10 years of experience in capturing life’s most precious moments. Specializing in portrait, event, and commercial photography', NULL, 'Photographer', NULL, 'Jijel'),
(5, 'saliha', 'baroudi', '$2a$10$fYli3dO3O2hc2RS/cjgxfOrU8iszwuTfj/joUXQkCRsYGIXPo1E/W', 'saliha@gmail.com', '2025-01-24 17:13:17', 'professional photographer with over 10 years of experience in capturing life’s most precious moments. Specializing in portrait, event, and commercial photography', 'As a photographer prestataire, John provides photography services for a variety of events and personal projects, including weddings, corporate events, product photography, and family portraits. ', 'Waiter', NULL, 'Tizi Ouzou');

-- --------------------------------------------------------

--
-- Table structure for table `reservationform`
--

CREATE TABLE `reservationform` (
  `form_id` int(11) NOT NULL,
  `address` text NOT NULL,
  `wilaya` varchar(50) NOT NULL,
  `num_tel` varchar(10) NOT NULL,
  `client_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `reservationform`
--

INSERT INTO `reservationform` (`form_id`, `address`, `wilaya`, `num_tel`, `client_id`, `created_at`) VALUES
(11, '123 Main Street', 'Algiers', '123456789', 1, '2025-01-26 13:44:35'),
(10, '123 Main Street', 'Algiers', '123456789', 1, '2025-01-26 13:44:31'),
(9, '123 Main Street', 'Algiers', '123456789', 1, '2025-01-26 13:38:19'),
(8, '123 Main Street', 'Algiers', '123456789', 1, '2025-01-26 13:37:27');

-- --------------------------------------------------------

--
-- Table structure for table `reserver`
--

CREATE TABLE `reserver` (
  `service_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `event_date_id` int(11) NOT NULL,
  `reserved_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reservation_status` enum('en attente','approved','rejected') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reserver`
--

INSERT INTO `reserver` (`service_id`, `client_id`, `event_date_id`, `reserved_at`, `reservation_status`) VALUES
(1, 1, 2, '2025-01-26 13:37:27', 'rejected'),
(1, 1, 3, '2025-01-26 13:44:31', 'en attente'),
(1, 1, 4, '2025-01-26 13:44:35', 'en attente');

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
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `service_name`, `ser_description`, `price`, `Prestataire_id`) VALUES
(1, 'Event Photography', 'Professional headshots, personal branding, and individual portrait sessions tailored to capture your unique personality.', 500.00, 1);

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
  ADD KEY `client_id` (`client_id`),
  ADD KEY `fk_prestataire_commentaire` (`prestataire_id`);

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
-- Indexes for table `reservationform`
--
ALTER TABLE `reservationform`
  ADD PRIMARY KEY (`form_id`),
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
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `commentaire`
--
ALTER TABLE `commentaire`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `eventdate`
--
ALTER TABLE `eventdate`
  MODIFY `event_date_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pictures`
--
ALTER TABLE `pictures`
  MODIFY `picture_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prestataire`
--
ALTER TABLE `prestataire`
  MODIFY `Prestataire_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reservationform`
--
ALTER TABLE `reservationform`
  MODIFY `form_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
