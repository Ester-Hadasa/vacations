-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2023 at 09:56 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tagging_vacations_db`
--
CREATE DATABASE IF NOT EXISTS `tagging_vacations_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tagging_vacations_db`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `user_id` int(11) NOT NULL,
  `vacation_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`user_id`, `vacation_id`) VALUES
(4, 8),
(6, 2),
(19, 11),
(19, 9),
(19, 8),
(24, 2),
(24, 12),
(24, 4),
(26, 2),
(26, 4),
(27, 9),
(27, 8),
(27, 26),
(19, 26),
(24, 11),
(24, 3),
(24, 7),
(24, 2),
(24, 26),
(28, 2),
(28, 8),
(19, 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `role`) VALUES
(4, 'Alice', 'Wilson', 'alicewilson@gmail.com', '5fd95b3011064495d605696cb8ba21b7e1238a12d3abb4e29110a69c27a2ecafb794d0592db27a524ad9cce01a6386dbddd887833a4c2c2eee8ea49050d23616', 0),
(6, 'Linda', 'Davis', 'lindadavis@gmail.com', '0b69a70c9507051062b30495b5d05e5788fdf08ae49cd9f15d017b974352f1217aa7ca73b7c801761afb247f89988b0de1086a238943a15b351bd9d7d9bf6cad', 0),
(19, 'orel', 'Shmueli', 'orelSmueli@gmail.com', '0b69a70c9507051062b30495b5d05e5788fdf08ae49cd9f15d017b974352f1217aa7ca73b7c801761afb247f89988b0de1086a238943a15b351bd9d7d9bf6cad', 0),
(20, 'ester', 'shitrit', 'es0534185663@gmail.com', 'e4775aed636d2e2869c297e44e9cd1be0a9cf15815776e84402d36d5607e1d427dc892f4f80a4489d8eae8fd828d306d00f4780d86d59326b2db7b5d06f784cb', 1),
(24, 'yahakov', 'shalom', 'yahakov@gmail.com', '809070af580b0730851cb51b261797a0d0d3c4efccd44a58b5317f457baaa2db5e56c6fde613f9ef28c11bbd506cbe9c9b19bc06a74e170b298d80083980eadb', 0),
(25, 'mehir', 'levi', 'mehir@gmail.com', '3a0e5850e0e2532f9f0a1424ebdb0ac0da16aa98b31f815db1332330403379b841991ca005c3ba2d9a2e309590c3e25c0276d53a4448a6c5b94c18d80fa2f292', 0),
(26, 'aviram', 'asis', 'aviram@gmail.com', 'e285585ad2a3477270a384742b116e4845e3705dc97289d383dbf3d4a6e67875678f187f0a92df05d5a6df06f23c5983e06ef6a1a1977f65299c5189d6c29b90', 0),
(27, 'omer', 'ben joya ', 'omer10818@walla.com', '2a138598883f7a2c84c8ae922a4f606734d5694d1e7c4e7d8666610cb47ee2d81063543c06055fa30c671ebc1742c83d8a0985edc8e5016e5069a8d0635bce5f', 0),
(28, 'Dov', 'Zilberman', 'dov@gmail.com', '06e88657d0b4fe7621b63e616929067c77260f7cbcecdebecb25eed3bd3d5efb28c20bcc5405abcc46fe4fe2fe071a1ef19540e7cd6e7efcf5f940e0b51837b4', 0);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacation_id` int(11) NOT NULL,
  `destination` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacation_id`, `destination`, `description`, `start_date`, `end_date`, `price`, `image_name`) VALUES
(1, 'Hawaii', 'Escape to the tropical paradise of Hawaii. Immerse yourself in the stunning natural beauty of this island chain, featuring lush rainforests, pristine beaches, and volcanic landscapes. Whether you\'re relaxing on the beach, exploring breathtaking waterfalls, or snorkeling in crystal-clear waters, Hawaii offers an unforgettable holiday experience.', '2023-06-15', '2023-06-30', 2500.00, 'hawaii.jpg'),
(2, 'Paris, France', 'Experience the romance of Paris, France.Paris is one of the few world capitals that has rarely seen destruction by catastrophe or war. For this, even its earliest history is still visible in its streetmap, and centuries of rulers adding their respective architectural marks on the capital has resulted in an accumulated wealth of history-rich monuments and buildings whose beauty played a large part in giving the city the reputation it has today', '2023-12-10', '2024-12-25', 3500.00, 'paris.jpg'),
(3, 'Cancun, Mexico', 'Relax and unwind on the white sandy beaches of Cancun, Mexico. Dive into the turquoise waters of the Caribbean, explore ancient Mayan ruins, and enjoy the vibrant nightlife.', '2024-08-05', '2024-08-20', 1800.00, 'd2132867-92a5-441f-8d89-18af06375d70_cancun.jpg'),
(4, 'Tokyo, Japan', 'Discover the bustling metropolis of Tokyo, Japan. Witness the perfect blend of modern skyscrapers and ancient temples. Savor delicious sushi, visit historic shrines, and immerse yourself in Japanese culture. Price: $4000.00', '2024-09-02', '2024-09-17', 4000.00, '60c1aa9c-0741-49cb-8b89-df20ee8e3719_tokyo.jpg'),
(5, 'New York City, USA', 'Explore the vibrant city of New York, USA. Enjoy Broadway shows, walk through Central Park, and admire iconic skyscrapers like the Empire State Building.', '2024-10-10', '2024-10-25', 3000.00, 'nyc.jpg'),
(7, 'Sydney, Australia', 'Experience the beauty of Sydney, Australia. From the Sydney Opera House to the pristine beaches, this city has it all. Immerse yourself in Australian culture and explore the diverse wildlife.', '2024-12-05', '2024-12-20', 4200.00, 'sydney.jpg'),
(8, 'Bali, Indonesia', 'Relax in the lush paradise of Bali, Indonesia. Enjoy serene beaches, spiritual temples, and a rich cultural experience.', '2024-01-15', '2024-01-30', 2200.00, 'bali.jpg'),
(9, 'Rome, Italy', 'Travel back in time to ancient Rome, Italy. Explore the Colosseum, Roman Forum, and taste delectable Italian cuisine.', '2024-02-10', '2024-02-25', 3700.00, 'rome.jpg'),
(10, 'Rio de Janeiro, Brazil', 'Immerse yourself in the vibrant culture of Rio de Janeiro, Brazil. Dance to samba music, marvel at Christ the Redeemer, and relax on beautiful beaches. ', '2024-03-05', '2024-03-20', 2600.00, 'rio.jpg'),
(11, 'Dubai, UAE', 'Indulge in the luxury and modernity of Dubai, United Arab Emirates. Shop in extravagant malls, ascend the Burj Khalifa, and embark on desert adventures.', '2024-04-02', '2024-04-17', 4500.00, 'dubai.jpg'),
(12, 'Cape Town, South Africa', 'Explore the stunning landscapes of Cape Town, South Africa. From Table Mountain to the Cape of Good Hope, you\'ll encounter breathtaking natural wonders. Immerse yourself in a diverse culture.', '2024-05-10', '2024-05-25', 3200.00, 'capetown.jpg'),
(26, 'Barcelona, Spain', 'Visit the charming city of Barcelona, Spain. Marvel at the unique architecture of Antoni Gaudí, enjoy tapas in the bustling streets, and explore the rich history and artistic heritage of the city. ', '2023-11-12', '2023-11-27', 2800.00, 'barcelona.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `vacation_id` (`vacation_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
