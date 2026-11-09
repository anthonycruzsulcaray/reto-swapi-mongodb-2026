CREATE DATABASE  IF NOT EXISTS `starwars_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `starwars_db`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: starwars_db
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `starship`
--

DROP TABLE IF EXISTS `starship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `starship` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(45) DEFAULT NULL,
  `id_film` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_starship_id_film_idx` (`id_film`),
  CONSTRAINT `fk_starship_id_film` FOREIGN KEY (`id_film`) REFERENCES `film` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `starship`
--

LOCK TABLES `starship` WRITE;
/*!40000 ALTER TABLE `starship` DISABLE KEYS */;
INSERT INTO `starship` VALUES (1,'https://swapi.dev/api/starships/2/',3),(2,'https://swapi.dev/api/starships/3/',3),(3,'https://swapi.dev/api/starships/5/',3),(4,'https://swapi.dev/api/starships/9/',3),(5,'https://swapi.dev/api/starships/10/',3),(6,'https://swapi.dev/api/starships/11/',3),(7,'https://swapi.dev/api/starships/12/',3),(8,'https://swapi.dev/api/starships/13/',3),(9,'https://swapi.dev/api/starships/3/',4),(10,'https://swapi.dev/api/starships/10/',4),(11,'https://swapi.dev/api/starships/11/',4),(12,'https://swapi.dev/api/starships/12/',4),(13,'https://swapi.dev/api/starships/15/',4),(14,'https://swapi.dev/api/starships/17/',4),(15,'https://swapi.dev/api/starships/21/',4),(16,'https://swapi.dev/api/starships/22/',4),(17,'https://swapi.dev/api/starships/23/',4),(18,'https://swapi.dev/api/starships/2/',5),(19,'https://swapi.dev/api/starships/3/',5),(20,'https://swapi.dev/api/starships/10/',5),(21,'https://swapi.dev/api/starships/11/',5),(22,'https://swapi.dev/api/starships/12/',5),(23,'https://swapi.dev/api/starships/15/',5),(24,'https://swapi.dev/api/starships/17/',5),(25,'https://swapi.dev/api/starships/22/',5),(26,'https://swapi.dev/api/starships/23/',5),(27,'https://swapi.dev/api/starships/27/',5),(28,'https://swapi.dev/api/starships/28/',5),(29,'https://swapi.dev/api/starships/29/',5),(30,'https://swapi.dev/api/starships/31/',6),(31,'https://swapi.dev/api/starships/32/',6),(32,'https://swapi.dev/api/starships/39/',6),(33,'https://swapi.dev/api/starships/40/',6),(34,'https://swapi.dev/api/starships/41/',6),(35,'https://swapi.dev/api/starships/21/',7),(36,'https://swapi.dev/api/starships/32/',7),(37,'https://swapi.dev/api/starships/39/',7),(38,'https://swapi.dev/api/starships/43/',7),(39,'https://swapi.dev/api/starships/47/',7),(40,'https://swapi.dev/api/starships/48/',7),(41,'https://swapi.dev/api/starships/49/',7),(42,'https://swapi.dev/api/starships/52/',7),(43,'https://swapi.dev/api/starships/58/',7),(44,'https://swapi.dev/api/starships/2/',8),(45,'https://swapi.dev/api/starships/32/',8),(46,'https://swapi.dev/api/starships/48/',8),(47,'https://swapi.dev/api/starships/59/',8),(48,'https://swapi.dev/api/starships/61/',8),(49,'https://swapi.dev/api/starships/63/',8),(50,'https://swapi.dev/api/starships/64/',8),(51,'https://swapi.dev/api/starships/65/',8),(52,'https://swapi.dev/api/starships/66/',8),(53,'https://swapi.dev/api/starships/68/',8),(54,'https://swapi.dev/api/starships/74/',8),(55,'https://swapi.dev/api/starships/75/',8),(56,'https://swapi.dev/api/starships/21/',9),(57,'https://swapi.dev/api/starships/32/',9),(58,'https://swapi.dev/api/starships/39/',9),(59,'https://swapi.dev/api/starships/43/',9),(60,'https://swapi.dev/api/starships/47/',9),(61,'https://swapi.dev/api/starships/48/',9),(62,'https://swapi.dev/api/starships/49/',9),(63,'https://swapi.dev/api/starships/52/',9),(64,'https://swapi.dev/api/starships/58/',9),(65,'https://swapi.dev/api/starships/21/',10),(66,'https://swapi.dev/api/starships/32/',10),(67,'https://swapi.dev/api/starships/39/',10),(68,'https://swapi.dev/api/starships/43/',10),(69,'https://swapi.dev/api/starships/47/',10),(70,'https://swapi.dev/api/starships/48/',10),(71,'https://swapi.dev/api/starships/49/',10),(72,'https://swapi.dev/api/starships/52/',10),(73,'https://swapi.dev/api/starships/58/',10),(74,'https://swapi.dev/api/starships/21/',11),(75,'https://swapi.dev/api/starships/32/',11),(76,'https://swapi.dev/api/starships/39/',11),(77,'https://swapi.dev/api/starships/43/',11),(78,'https://swapi.dev/api/starships/47/',11),(79,'https://swapi.dev/api/starships/48/',11),(80,'https://swapi.dev/api/starships/49/',11),(81,'https://swapi.dev/api/starships/52/',11),(82,'https://swapi.dev/api/starships/58/',11),(83,'https://swapi.dev/api/starships/21/',12),(84,'https://swapi.dev/api/starships/32/',12),(85,'https://swapi.dev/api/starships/39/',12),(86,'https://swapi.dev/api/starships/43/',12),(87,'https://swapi.dev/api/starships/47/',12),(88,'https://swapi.dev/api/starships/48/',12),(89,'https://swapi.dev/api/starships/49/',12),(90,'https://swapi.dev/api/starships/52/',12),(91,'https://swapi.dev/api/starships/58/',12),(92,'https://swapi.dev/api/starships/21/',13),(93,'https://swapi.dev/api/starships/32/',13),(94,'https://swapi.dev/api/starships/39/',13),(95,'https://swapi.dev/api/starships/43/',13),(96,'https://swapi.dev/api/starships/47/',13),(97,'https://swapi.dev/api/starships/48/',13),(98,'https://swapi.dev/api/starships/49/',13),(99,'https://swapi.dev/api/starships/52/',13),(100,'https://swapi.dev/api/starships/58/',13),(101,'https://swapi.dev/api/starships/2/',14),(102,'https://swapi.dev/api/starships/3/',14),(103,'https://swapi.dev/api/starships/5/',14),(104,'https://swapi.dev/api/starships/9/',14),(105,'https://swapi.dev/api/starships/10/',14),(106,'https://swapi.dev/api/starships/11/',14),(107,'https://swapi.dev/api/starships/12/',14),(108,'https://swapi.dev/api/starships/13/',14);
/*!40000 ALTER TABLE `starship` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-08 23:07:14
