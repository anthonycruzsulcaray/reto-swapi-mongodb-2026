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
-- Table structure for table `specie`
--

DROP TABLE IF EXISTS `specie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(45) DEFAULT NULL,
  `id_film` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_specie_id_film_idx` (`id_film`),
  CONSTRAINT `fk_specie_id_film` FOREIGN KEY (`id_film`) REFERENCES `film` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specie`
--

LOCK TABLES `specie` WRITE;
/*!40000 ALTER TABLE `specie` DISABLE KEYS */;
INSERT INTO `specie` VALUES (1,'https://swapi.dev/api/species/1/',3),(2,'https://swapi.dev/api/species/2/',3),(3,'https://swapi.dev/api/species/3/',3),(4,'https://swapi.dev/api/species/4/',3),(5,'https://swapi.dev/api/species/5/',3),(6,'https://swapi.dev/api/species/1/',4),(7,'https://swapi.dev/api/species/2/',4),(8,'https://swapi.dev/api/species/3/',4),(9,'https://swapi.dev/api/species/6/',4),(10,'https://swapi.dev/api/species/7/',4),(11,'https://swapi.dev/api/species/1/',5),(12,'https://swapi.dev/api/species/2/',5),(13,'https://swapi.dev/api/species/3/',5),(14,'https://swapi.dev/api/species/5/',5),(15,'https://swapi.dev/api/species/6/',5),(16,'https://swapi.dev/api/species/8/',5),(17,'https://swapi.dev/api/species/9/',5),(18,'https://swapi.dev/api/species/10/',5),(19,'https://swapi.dev/api/species/15/',5),(20,'https://swapi.dev/api/species/1/',6),(21,'https://swapi.dev/api/species/2/',6),(22,'https://swapi.dev/api/species/6/',6),(23,'https://swapi.dev/api/species/11/',6),(24,'https://swapi.dev/api/species/12/',6),(25,'https://swapi.dev/api/species/13/',6),(26,'https://swapi.dev/api/species/14/',6),(27,'https://swapi.dev/api/species/15/',6),(28,'https://swapi.dev/api/species/16/',6),(29,'https://swapi.dev/api/species/17/',6),(30,'https://swapi.dev/api/species/18/',6),(31,'https://swapi.dev/api/species/19/',6),(32,'https://swapi.dev/api/species/20/',6),(33,'https://swapi.dev/api/species/21/',6),(34,'https://swapi.dev/api/species/22/',6),(35,'https://swapi.dev/api/species/23/',6),(36,'https://swapi.dev/api/species/24/',6),(37,'https://swapi.dev/api/species/25/',6),(38,'https://swapi.dev/api/species/26/',6),(39,'https://swapi.dev/api/species/27/',6),(40,'https://swapi.dev/api/species/1/',8),(41,'https://swapi.dev/api/species/2/',8),(42,'https://swapi.dev/api/species/3/',8),(43,'https://swapi.dev/api/species/6/',8),(44,'https://swapi.dev/api/species/15/',8),(45,'https://swapi.dev/api/species/19/',8),(46,'https://swapi.dev/api/species/20/',8),(47,'https://swapi.dev/api/species/23/',8),(48,'https://swapi.dev/api/species/24/',8),(49,'https://swapi.dev/api/species/25/',8),(50,'https://swapi.dev/api/species/26/',8),(51,'https://swapi.dev/api/species/27/',8),(52,'https://swapi.dev/api/species/28/',8),(53,'https://swapi.dev/api/species/29/',8),(54,'https://swapi.dev/api/species/30/',8),(55,'https://swapi.dev/api/species/33/',8),(56,'https://swapi.dev/api/species/34/',8),(57,'https://swapi.dev/api/species/35/',8),(58,'https://swapi.dev/api/species/36/',8),(59,'https://swapi.dev/api/species/37/',8),(60,'https://swapi.dev/api/species/1/',9),(61,'https://swapi.dev/api/species/2/',9),(62,'https://swapi.dev/api/species/6/',9),(63,'https://swapi.dev/api/species/12/',9),(64,'https://swapi.dev/api/species/13/',9),(65,'https://swapi.dev/api/species/15/',9),(66,'https://swapi.dev/api/species/28/',9),(67,'https://swapi.dev/api/species/29/',9),(68,'https://swapi.dev/api/species/30/',9),(69,'https://swapi.dev/api/species/31/',9),(70,'https://swapi.dev/api/species/32/',9),(71,'https://swapi.dev/api/species/33/',9),(72,'https://swapi.dev/api/species/34/',9),(73,'https://swapi.dev/api/species/35/',9),(74,'https://swapi.dev/api/species/1/',10),(75,'https://swapi.dev/api/species/2/',10),(76,'https://swapi.dev/api/species/6/',10),(77,'https://swapi.dev/api/species/12/',10),(78,'https://swapi.dev/api/species/13/',10),(79,'https://swapi.dev/api/species/15/',10),(80,'https://swapi.dev/api/species/28/',10),(81,'https://swapi.dev/api/species/29/',10),(82,'https://swapi.dev/api/species/30/',10),(83,'https://swapi.dev/api/species/31/',10),(84,'https://swapi.dev/api/species/32/',10),(85,'https://swapi.dev/api/species/33/',10),(86,'https://swapi.dev/api/species/34/',10),(87,'https://swapi.dev/api/species/35/',10),(88,'https://swapi.dev/api/species/1/',11),(89,'https://swapi.dev/api/species/2/',11),(90,'https://swapi.dev/api/species/6/',11),(91,'https://swapi.dev/api/species/12/',11),(92,'https://swapi.dev/api/species/13/',11),(93,'https://swapi.dev/api/species/15/',11),(94,'https://swapi.dev/api/species/28/',11),(95,'https://swapi.dev/api/species/29/',11),(96,'https://swapi.dev/api/species/30/',11),(97,'https://swapi.dev/api/species/31/',11),(98,'https://swapi.dev/api/species/32/',11),(99,'https://swapi.dev/api/species/33/',11),(100,'https://swapi.dev/api/species/34/',11),(101,'https://swapi.dev/api/species/35/',11),(102,'https://swapi.dev/api/species/1/',12),(103,'https://swapi.dev/api/species/2/',12),(104,'https://swapi.dev/api/species/6/',12),(105,'https://swapi.dev/api/species/12/',12),(106,'https://swapi.dev/api/species/13/',12),(107,'https://swapi.dev/api/species/15/',12),(108,'https://swapi.dev/api/species/28/',12),(109,'https://swapi.dev/api/species/29/',12),(110,'https://swapi.dev/api/species/30/',12),(111,'https://swapi.dev/api/species/31/',12),(112,'https://swapi.dev/api/species/32/',12),(113,'https://swapi.dev/api/species/33/',12),(114,'https://swapi.dev/api/species/34/',12),(115,'https://swapi.dev/api/species/35/',12),(116,'https://swapi.dev/api/species/1/',13),(117,'https://swapi.dev/api/species/2/',13),(118,'https://swapi.dev/api/species/6/',13),(119,'https://swapi.dev/api/species/12/',13),(120,'https://swapi.dev/api/species/13/',13),(121,'https://swapi.dev/api/species/15/',13),(122,'https://swapi.dev/api/species/28/',13),(123,'https://swapi.dev/api/species/29/',13),(124,'https://swapi.dev/api/species/30/',13),(125,'https://swapi.dev/api/species/31/',13),(126,'https://swapi.dev/api/species/32/',13),(127,'https://swapi.dev/api/species/33/',13),(128,'https://swapi.dev/api/species/34/',13),(129,'https://swapi.dev/api/species/35/',13),(130,'https://swapi.dev/api/species/1/',14),(131,'https://swapi.dev/api/species/2/',14),(132,'https://swapi.dev/api/species/3/',14),(133,'https://swapi.dev/api/species/4/',14),(134,'https://swapi.dev/api/species/5/',14);
/*!40000 ALTER TABLE `specie` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-08 23:07:15
