-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dateforyou
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `table_id` varchar(45) NOT NULL,
  `reservation_start` datetime NOT NULL,
  `reservation_end` datetime NOT NULL,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `restaurant_id` varchar(45) DEFAULT NULL,
  `notes` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,'10','2023-09-19 22:30:00','2023-09-20 00:30:00','Eryk','Szczepanek','2',NULL),(2,'10','2023-09-20 00:00:00','2023-09-20 01:00:00','Eryk',NULL,'2',NULL),(3,'10','2023-09-21 15:00:00','2023-09-21 17:00:00','Kamilka',NULL,'2',NULL),(4,'10','2023-09-20 14:00:00','2023-09-20 16:00:00','Test','','2',''),(5,'10','2023-09-20 17:00:00','2023-09-20 19:00:00','Nowy Lokal','','2',''),(6,'10','2023-09-20 19:30:00','2023-09-20 21:30:00','Eryk','','2',''),(7,'10','2023-10-17 12:00:00','2023-10-17 14:00:00','erer','','2',''),(8,'1','2023-10-18 12:00:00','2023-10-18 14:33:00','Eryk','Szczepanek','3','Chce by na stole były kwiotki');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `local_number` varchar(45) DEFAULT NULL,
  `street_number` varchar(45) NOT NULL,
  `user_id` int NOT NULL,
  `zipcode` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `open_hour` time NOT NULL,
  `close_hour` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (2,'Sushi Kamilka','Wrocław','Buforowa','69','100',2,'52-200',NULL,NULL,'10:00:00','22:00:00'),(3,'Jedzonko','Bełchatów','Smugowa','24','19',1,'97-400',NULL,NULL,'10:00:00','22:00:00'),(4,'Pełny Brzuszek','Piotrków Trybunalski','Belzacka',NULL,'34',1,'97-300',NULL,NULL,'10:00:00','22:00:00'),(5,'Smakówka','Warszawa','Piłsudskiego','64','4',1,'00-321',NULL,'','10:00:00','22:00:00'),(7,'U Eryka','Łódź','Piotrkowska','12','34',1,'94-233',NULL,NULL,'10:00:00','22:00:00'),(9,'Super Smaki','Wrocław','Rynek','54c','5',1,'51-030',NULL,'','10:00:00','22:00:00'),(10,'BUBUIDUDU','dudolandia','dudus','1','1',2,'11-111',NULL,NULL,'10:00:00','22:00:00'),(11,'Polskie Jadło','Wrocław','Zaolziańska','4','12',1,'50-325',NULL,NULL,'10:00:00','22:00:00'),(12,'Nowy Lokal','Kraków','Piłsudskiego','','150',1,'30-123','698008803','Elegancka restauracja elo elo','10:00:00','22:00:00');
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `capacity` int NOT NULL,
  `restaurant_id` int NOT NULL,
  `y` int NOT NULL,
  `x` int NOT NULL,
  `table_number` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tables`
--

LOCK TABLES `tables` WRITE;
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
INSERT INTO `tables` VALUES (1,4,3,202,321,1),(2,2,3,425,640,2),(3,6,3,0,0,3),(4,5,3,425,2,4),(5,5,3,196,0,5),(7,1,4,172,48,1),(8,12,3,203,640,64),(9,1,2,425,0,1),(10,1,2,0,640,2),(11,1,12,216,306,1);
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `login` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `company_name` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `street` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Eryk','Szczepanek','Erykov9','$2b$10$O4d7Ca7OyQsEGL9Ekj1UyOPZ5hNIdc8rWWJ4QkiwoIQvYtHPhi.ia','Eryk Developer','Wrocław','Ulicowa 100/12','szczepanekeryk@gmail.com'),(2,'Kamila','Adamiec','Kamila98','$2b$10$b6jCioA77nqtA23m0i9SQOxYgx2Q8Bp9O7bMhXA.YwZFzA.FnSmpO','Bubuś S.A.','Kaniów','Jagodowa 1','kadamiec@icloud.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-20 14:39:33
