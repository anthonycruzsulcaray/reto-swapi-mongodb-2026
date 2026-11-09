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
-- Table structure for table `planet`
--

DROP TABLE IF EXISTS `planet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(45) DEFAULT NULL,
  `id_film` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_planet_id_film_idx` (`id_film`),
  CONSTRAINT `fk_planet_id_film` FOREIGN KEY (`id_film`) REFERENCES `film` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planet`
--

LOCK TABLES `planet` WRITE;
/*!40000 ALTER TABLE `planet` DISABLE KEYS */;
INSERT INTO `planet` VALUES (2,'https://swapi.dev/api/planets/1/',3),(3,'https://swapi.dev/api/planets/2/',3),(4,'https://swapi.dev/api/planets/3/',3),(5,'https://swapi.dev/api/planets/4/',4),(6,'https://swapi.dev/api/planets/5/',4),(7,'https://swapi.dev/api/planets/6/',4),(8,'https://swapi.dev/api/planets/27/',4),(9,'https://swapi.dev/api/planets/1/',5),(10,'https://swapi.dev/api/planets/5/',5),(11,'https://swapi.dev/api/planets/7/',5),(12,'https://swapi.dev/api/planets/8/',5),(13,'https://swapi.dev/api/planets/9/',5),(14,'https://swapi.dev/api/planets/1/',6),(15,'https://swapi.dev/api/planets/8/',6),(16,'https://swapi.dev/api/planets/9/',6),(17,'https://swapi.dev/api/planets/1/',7),(18,'https://swapi.dev/api/planets/8/',7),(19,'https://swapi.dev/api/planets/9/',7),(20,'https://swapi.dev/api/planets/10/',7),(21,'https://swapi.dev/api/planets/11/',7),(22,'https://swapi.dev/api/planets/1/',8),(23,'https://swapi.dev/api/planets/2/',8),(24,'https://swapi.dev/api/planets/5/',8),(25,'https://swapi.dev/api/planets/8/',8),(26,'https://swapi.dev/api/planets/9/',8),(27,'https://swapi.dev/api/planets/12/',8),(28,'https://swapi.dev/api/planets/13/',8),(29,'https://swapi.dev/api/planets/14/',8),(30,'https://swapi.dev/api/planets/15/',8),(31,'https://swapi.dev/api/planets/16/',8),(32,'https://swapi.dev/api/planets/17/',8),(33,'https://swapi.dev/api/planets/18/',8),(34,'https://swapi.dev/api/planets/19/',8),(35,'https://swapi.dev/api/planets/1/',9),(36,'https://swapi.dev/api/planets/8/',9),(37,'https://swapi.dev/api/planets/9/',9),(38,'https://swapi.dev/api/planets/10/',9),(39,'https://swapi.dev/api/planets/11/',9),(40,'https://swapi.dev/api/planets/1/',10),(41,'https://swapi.dev/api/planets/8/',10),(42,'https://swapi.dev/api/planets/9/',10),(43,'https://swapi.dev/api/planets/10/',10),(44,'https://swapi.dev/api/planets/11/',10),(45,'https://swapi.dev/api/planets/1/',11),(46,'https://swapi.dev/api/planets/8/',11),(47,'https://swapi.dev/api/planets/9/',11),(48,'https://swapi.dev/api/planets/10/',11),(49,'https://swapi.dev/api/planets/11/',11),(50,'https://swapi.dev/api/planets/1/',12),(51,'https://swapi.dev/api/planets/8/',12),(52,'https://swapi.dev/api/planets/9/',12),(53,'https://swapi.dev/api/planets/10/',12),(54,'https://swapi.dev/api/planets/11/',12),(55,'https://swapi.dev/api/planets/1/',13),(56,'https://swapi.dev/api/planets/8/',13),(57,'https://swapi.dev/api/planets/9/',13),(58,'https://swapi.dev/api/planets/10/',13),(59,'https://swapi.dev/api/planets/11/',13),(60,'https://swapi.dev/api/planets/1/',14),(61,'https://swapi.dev/api/planets/2/',14),(62,'https://swapi.dev/api/planets/3/',14);
/*!40000 ALTER TABLE `planet` ENABLE KEYS */;
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
