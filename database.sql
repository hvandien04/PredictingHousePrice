-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: housepredict
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `UserID` varchar(50) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Role` varchar(50) NOT NULL,
  `State` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `FeedbackID` varchar(50) NOT NULL,
  `UserID` varchar(50) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Message` text,
  `Title` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`FeedbackID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `account` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predictedhouse`
--

DROP TABLE IF EXISTS `predictedhouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `predictedhouse` (
  `PHouseID` varchar(30) NOT NULL,
  `PredictionID` varchar(50) DEFAULT NULL,
  `HouseType` varchar(50) DEFAULT NULL,
  `Area` decimal(10,2) DEFAULT NULL,
  `Address` varchar(200) DEFAULT NULL,
  `Floors` int DEFAULT NULL,
  `Bedrooms` int DEFAULT NULL,
  PRIMARY KEY (`PHouseID`),
  KEY `PredictionID` (`PredictionID`),
  CONSTRAINT `predictedhouse_ibfk_1` FOREIGN KEY (`PredictionID`) REFERENCES `prediction` (`PredictionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predictedhouse`
--

LOCK TABLES `predictedhouse` WRITE;
/*!40000 ALTER TABLE `predictedhouse` DISABLE KEYS */;
/*!40000 ALTER TABLE `predictedhouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prediction`
--

DROP TABLE IF EXISTS `prediction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prediction` (
  `PredictionID` varchar(50) NOT NULL,
  `UserID` varchar(50) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `PredictedPrice` decimal(15,2) DEFAULT NULL,
  `ConfidenceScore` float DEFAULT NULL,
  PRIMARY KEY (`PredictionID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `prediction_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `account` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prediction`
--

LOCK TABLES `prediction` WRITE;
/*!40000 ALTER TABLE `prediction` DISABLE KEYS */;
/*!40000 ALTER TABLE `prediction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sellinghouse`
--

DROP TABLE IF EXISTS `sellinghouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sellinghouse` (
  `PHouseID` varchar(30) NOT NULL,
  `Title` varchar(200) DEFAULT NULL,
  `UserID` varchar(50) DEFAULT NULL,
  `Area` decimal(10,2) DEFAULT NULL,
  `Address` varchar(200) DEFAULT NULL,
  `Floors` int DEFAULT NULL,
  `Bedrooms` int DEFAULT NULL,
  `Bathrooms` int DEFAULT NULL,
  `LegalStatus` varchar(50) DEFAULT NULL,
  `Price` decimal(15,2) DEFAULT NULL,
  `Description` text,
  `Image` varchar(200) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`PHouseID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `sellinghouse_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `account` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sellinghouse`
--

LOCK TABLES `sellinghouse` WRITE;
/*!40000 ALTER TABLE `sellinghouse` DISABLE KEYS */;
/*!40000 ALTER TABLE `sellinghouse` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-04 19:01:14
