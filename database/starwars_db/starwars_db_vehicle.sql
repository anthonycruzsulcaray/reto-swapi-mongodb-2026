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
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(45) DEFAULT NULL,
  `id_film` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_vehicle_id_film_idx` (`id_film`),
  CONSTRAINT `fk_vehicle_id_film` FOREIGN KEY (`id_film`) REFERENCES `film` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (1,'https://swapi.dev/api/vehicles/4/',3),(2,'https://swapi.dev/api/vehicles/6/',3),(3,'https://swapi.dev/api/vehicles/7/',3),(4,'https://swapi.dev/api/vehicles/8/',3),(5,'https://swapi.dev/api/vehicles/8/',4),(6,'https://swapi.dev/api/vehicles/14/',4),(7,'https://swapi.dev/api/vehicles/16/',4),(8,'https://swapi.dev/api/vehicles/18/',4),(9,'https://swapi.dev/api/vehicles/19/',4),(10,'https://swapi.dev/api/vehicles/20/',4),(11,'https://swapi.dev/api/vehicles/8/',5),(12,'https://swapi.dev/api/vehicles/16/',5),(13,'https://swapi.dev/api/vehicles/18/',5),(14,'https://swapi.dev/api/vehicles/19/',5),(15,'https://swapi.dev/api/vehicles/24/',5),(16,'https://swapi.dev/api/vehicles/25/',5),(17,'https://swapi.dev/api/vehicles/26/',5),(18,'https://swapi.dev/api/vehicles/30/',5),(19,'https://swapi.dev/api/vehicles/33/',6),(20,'https://swapi.dev/api/vehicles/34/',6),(21,'https://swapi.dev/api/vehicles/35/',6),(22,'https://swapi.dev/api/vehicles/36/',6),(23,'https://swapi.dev/api/vehicles/37/',6),(24,'https://swapi.dev/api/vehicles/38/',6),(25,'https://swapi.dev/api/vehicles/42/',6),(26,'https://swapi.dev/api/vehicles/4/',7),(27,'https://swapi.dev/api/vehicles/44/',7),(28,'https://swapi.dev/api/vehicles/45/',7),(29,'https://swapi.dev/api/vehicles/46/',7),(30,'https://swapi.dev/api/vehicles/50/',7),(31,'https://swapi.dev/api/vehicles/51/',7),(32,'https://swapi.dev/api/vehicles/53/',7),(33,'https://swapi.dev/api/vehicles/54/',7),(34,'https://swapi.dev/api/vehicles/55/',7),(35,'https://swapi.dev/api/vehicles/56/',7),(36,'https://swapi.dev/api/vehicles/57/',7),(37,'https://swapi.dev/api/vehicles/33/',8),(38,'https://swapi.dev/api/vehicles/50/',8),(39,'https://swapi.dev/api/vehicles/53/',8),(40,'https://swapi.dev/api/vehicles/56/',8),(41,'https://swapi.dev/api/vehicles/60/',8),(42,'https://swapi.dev/api/vehicles/62/',8),(43,'https://swapi.dev/api/vehicles/67/',8),(44,'https://swapi.dev/api/vehicles/69/',8),(45,'https://swapi.dev/api/vehicles/70/',8),(46,'https://swapi.dev/api/vehicles/71/',8),(47,'https://swapi.dev/api/vehicles/72/',8),(48,'https://swapi.dev/api/vehicles/73/',8),(49,'https://swapi.dev/api/vehicles/76/',8),(50,'https://swapi.dev/api/vehicles/4/',9),(51,'https://swapi.dev/api/vehicles/44/',9),(52,'https://swapi.dev/api/vehicles/45/',9),(53,'https://swapi.dev/api/vehicles/46/',9),(54,'https://swapi.dev/api/vehicles/50/',9),(55,'https://swapi.dev/api/vehicles/51/',9),(56,'https://swapi.dev/api/vehicles/53/',9),(57,'https://swapi.dev/api/vehicles/54/',9),(58,'https://swapi.dev/api/vehicles/55/',9),(59,'https://swapi.dev/api/vehicles/56/',9),(60,'https://swapi.dev/api/vehicles/57/',9),(61,'https://swapi.dev/api/vehicles/4/',10),(62,'https://swapi.dev/api/vehicles/44/',10),(63,'https://swapi.dev/api/vehicles/45/',10),(64,'https://swapi.dev/api/vehicles/46/',10),(65,'https://swapi.dev/api/vehicles/50/',10),(66,'https://swapi.dev/api/vehicles/51/',10),(67,'https://swapi.dev/api/vehicles/53/',10),(68,'https://swapi.dev/api/vehicles/54/',10),(69,'https://swapi.dev/api/vehicles/55/',10),(70,'https://swapi.dev/api/vehicles/56/',10),(71,'https://swapi.dev/api/vehicles/57/',10),(72,'https://swapi.dev/api/vehicles/4/',11),(73,'https://swapi.dev/api/vehicles/44/',11),(74,'https://swapi.dev/api/vehicles/45/',11),(75,'https://swapi.dev/api/vehicles/46/',11),(76,'https://swapi.dev/api/vehicles/50/',11),(77,'https://swapi.dev/api/vehicles/51/',11),(78,'https://swapi.dev/api/vehicles/53/',11),(79,'https://swapi.dev/api/vehicles/54/',11),(80,'https://swapi.dev/api/vehicles/55/',11),(81,'https://swapi.dev/api/vehicles/56/',11),(82,'https://swapi.dev/api/vehicles/57/',11),(83,'https://swapi.dev/api/vehicles/4/',12),(84,'https://swapi.dev/api/vehicles/44/',12),(85,'https://swapi.dev/api/vehicles/45/',12),(86,'https://swapi.dev/api/vehicles/46/',12),(87,'https://swapi.dev/api/vehicles/50/',12),(88,'https://swapi.dev/api/vehicles/51/',12),(89,'https://swapi.dev/api/vehicles/53/',12),(90,'https://swapi.dev/api/vehicles/54/',12),(91,'https://swapi.dev/api/vehicles/55/',12),(92,'https://swapi.dev/api/vehicles/56/',12),(93,'https://swapi.dev/api/vehicles/57/',12),(94,'https://swapi.dev/api/vehicles/4/',13),(95,'https://swapi.dev/api/vehicles/44/',13),(96,'https://swapi.dev/api/vehicles/45/',13),(97,'https://swapi.dev/api/vehicles/46/',13),(98,'https://swapi.dev/api/vehicles/50/',13),(99,'https://swapi.dev/api/vehicles/51/',13),(100,'https://swapi.dev/api/vehicles/53/',13),(101,'https://swapi.dev/api/vehicles/54/',13),(102,'https://swapi.dev/api/vehicles/55/',13),(103,'https://swapi.dev/api/vehicles/56/',13),(104,'https://swapi.dev/api/vehicles/57/',13),(105,'https://swapi.dev/api/vehicles/4/',14),(106,'https://swapi.dev/api/vehicles/6/',14),(107,'https://swapi.dev/api/vehicles/7/',14),(108,'https://swapi.dev/api/vehicles/8/',14);
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
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
