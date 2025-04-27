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
CREATE DATABASE IF NOT EXISTS housepredict;
use housepredict;
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
  `Message` varchar(200) DEFAULT NULL,
  `Title` varchar(200) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`FeedbackID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
  CONSTRAINT `prediction_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
  `Housetype` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`PHouseID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `sellinghouse_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sellinghouse`
--

INSERT INTO `sellinghouse` (`PHouseID`, `Title`, `UserID`, `Area`, `Address`, `Floors`, `Bedrooms`, `Bathrooms`, `LegalStatus`, `Price`, `Description`, `Image`, `State`, `HouseType`) VALUES
('1h1ji', 'Chung cư Nhà Bè', 'U56675', 68.00, 'Huyện Nhà Bè', 1, 3, 2, 'Chính chủ', 12.50, 'Chung cư ngoại ô', 'http://localhost:8080/uploads/7e2d119e-b0c6-41b7-90b0-f8ece81bb268_chung-cu-3-ngu.jpg', 'Chờ duyệt', 'Chung cư'),
('1XZXM', 'Chung cư Quận 4', 'U3C228', 75.00, 'Quận 4', 1, 3, 2, 'Sổ đỏ', 12.00, 'Chung cư đầy đủ tiện nghi', 'http://localhost:8080/uploads/cd2a1464-95dd-4a62-9c0b-6d7892b58efc_R.jpg', 'Chờ duyệt', 'Chung cư'),
('3oK39', 'Chung cư Quận 5', 'U3C228', 80.00, 'Quận 5', 1, 4, 3, 'Chính chủ', 15.00, 'Chung cư cao cấp', 'http://localhost:8080/uploads/de136cec-64f0-48b4-b4d9-7962a3ad98cd_1 (1)-thiet-ke-phong-khach-chung-cu-cao-cap.jpg', 'Chờ duyệt', 'Chung cư'),
('40PVa', 'Mặt tiền Quận 6', 'UE71C8', 54.00, 'Quận 6', 3, 4, 2, 'Chính chủ', 54.00, 'Nhà 2 mặt tiền', 'http://localhost:8080/uploads/a1794e63-bfd8-492a-98b7-b78557a63696_20250425091705-d9ff_wm.jpg', 'Chờ duyệt', 'Nhà mặt tiền'),
('4o3hS', 'Biệt thự Nhà Bè', 'U33521', 140.00, 'Huyện Nhà Bè', 2, 5, 3, 'Hợp đồng mua bán', 170.00, 'Biệt thự nghỉ dưỡng', 'http://localhost:8080/uploads/2084be8e-4091-479d-b46a-4d8ef85f82a6_biet-thu-nghi-duong-2-tang-hien-dai-tuong-le-1.jpg', 'Chờ duyệt', 'Biệt thự'),
('6NyBf', 'Mặt tiền Gò Vấp', 'UF8EFA', 28.00, 'Quận Gò Vấp', 4, 7, 3, 'Hợp đồng mua bán', 56.00, 'Nhà buôn bán thuận lợi', 'http://localhost:8080/uploads/fda3713a-23a5-4138-abed-6c371844c836_20250423101735-ac4f_wm.jpg', 'Chờ duyệt', 'Nhà mặt tiền'),
('6QfIs', 'Biệt thự Gò Vấp', 'U2688F', 150.00, 'Quận Gò Vấp', 2, 5, 3, 'Chính chủ', 190.00, 'Biệt thự đầy đủ tiện nghi', 'http://localhost:8080/uploads/86fba9e0-1f9c-462e-a651-73b2dae12b16_thiet-ke-biet-thu-hien-dai-2-tang-dep-bt21356-v5.jpg', 'Chờ duyệt', 'Biệt thự'),
('7zDvG', 'Nhà hẻm Quận 12', 'U8D064', 90.00, 'Quận 12', 2, 4, 3, 'Chính chủ', 17.00, 'Nhà cấu trúc kiên cố và đẹp', 'http://localhost:8080/uploads/4d310daa-9725-4d33-9231-75069c9a4549_20250407200254-793c_wm.jpg', 'Chờ duyệt', 'Nhà hẻm'),
('8je1t', 'Biệt thự Quận 10', 'U23A66', 400.00, 'Quận 10', 2, 5, 3, 'Chính chủ', 137.00, 'Biệt thự gần biển', 'http://localhost:8080/uploads/76b3fcda-5e21-49d3-9d4d-656e44188f05_biet-thu-2-tang-hien-dai-100m2.jpg', 'Đang bán', 'Biệt thự'),
('8kPlR', 'Nhà hẻm Bình Tân', 'U72AF5', 80.00, 'Quận Bình Tân', 2, 4, 2, 'Sổ đỏ', 14.00, 'Nhà hẻm yên tĩnh', 'http://localhost:8080/uploads/3510e408-1838-47cb-921c-8caef6163aca_20250401141312-f24c_wm.jpg', 'Chờ duyệt', 'Nhà hẻm'),
('8ztQ0', 'Biệt thự Bình Chánh', 'U33521', 200.00, 'Huyện Bình Chánh', 3, 6, 4, 'Sổ đỏ', 230.00, 'Biệt thự mới ', 'http://localhost:8080/uploads/784fdd75-8e08-4658-a4f1-f9545e5663a3_OIP.jpg', 'Chờ duyệt', 'Biệt thự'),
('9M27c', 'Biệt thự Quận 2', 'U01509', 450.00, 'Quận 2 (TP. Thủ Đức)', 3, 6, 4, 'Chính chủ', 250.00, 'Biệt thự có sân vườn rộng', 'http://localhost:8080/uploads/7153ecf9-ffea-40b4-a14e-e883360f859a_biet-thu-3-tang-hien-dai-mai-bang-1.jpg', 'Chờ duyệt', 'Biệt thự'),
('BGjPl', 'Mặt tiền Phú Nhuận', 'UBF174', 130.00, 'Quận Phú Nhuận', 2, 5, 2, 'Hợp đồng mua bán', 52.00, 'Nhà mới xây đẹp', 'http://localhost:8080/uploads/c6461af2-9443-41c1-bd8b-c5d7580313a7_20250425103143-a603_wm.jpg', 'Chờ duyệt', 'Nhà mặt tiền'),
('ceXzV', 'Nhà hẻm Thủ Đức', 'U83AC1', 78.00, 'Quận Thủ Đức (TP. Thủ Đức)', 3, 4, 2, 'Hợp đồng mua bán', 15.00, 'Nhà mới sửa', 'http://localhost:8080/uploads/b6114071-8ae4-4348-ae09-4877bc2c16f4_20250324150606-0a77_wm.jpg', 'Chờ duyệt', 'Nhà hẻm'),
('dcRAg', 'Chung cư Bình Thạnh', 'U43262', 82.00, 'Quận Bình Thạnh', 1, 4, 3, 'Hợp đồng mua bán', 15.50, 'Chung cư gần chợ', 'http://localhost:8080/uploads/468680ee-2e88-4bec-ba49-406732b94f9d_OIP (2).jpg', 'Chờ duyệt', 'Chung cư'),
('dFAw7', 'Biệt thự Tân Bình', 'U2D1F8', 190.00, 'Quận Tân Bình', 3, 6, 4, 'Chính chủ', 210.00, 'Biệt thự phong cách hiện đại', 'http://localhost:8080/uploads/97d2274b-0dce-44c6-a711-34054b94a685_mau-nha-biet-thu-3-tang-dep-1.jpg', 'Chờ duyệt', 'Biệt thự'),
('dtAjK', 'Chung cư Bình Tân', 'U415D7', 75.00, 'Quận Bình Tân', 1, 3, 2, 'Sổ đỏ', 14.00, 'Chung cư mới xây', 'http://localhost:8080/uploads/30546026-81e1-4250-a48f-079dfd28c6a1_khong-gian-noi-that-phong-khach-noi-that-Decordi-1-1024x768.jpg', 'Chờ duyệt', 'Chung cư'),
('dYKDz', 'Chung cư Tân Phú', 'U415D7', 78.00, 'Quận Tân Phú', 1, 3, 2, 'Chính chủ', 14.50, 'Chung cư gần trường', 'http://localhost:8080/uploads/50b33835-da0d-4a4a-9ce4-a4d0814a8683_R (2).jpg', 'Chờ duyệt', 'Chung cư'),
('gl6zR', 'Biệt thự Củ Chi', 'U33521', 160.00, 'Huyện Củ Chi', 2, 5, 3, 'Sổ đỏ', 280.00, 'Biệt thự có vườn hoa', 'http://localhost:8080/uploads/f4a0941e-2493-43d0-8e1f-9efd05ae58b7_OIP (1).jpg', 'Chờ duyệt', 'Biệt thự'),
('Hdqno', 'Chung cư Quận 10', 'U415D7', 85.00, 'Quận 10', 1, 4, 3, 'Chính chủ', 16.00, 'Chung cư sang trọng', 'http://localhost:8080/uploads/f50c8d12-9e6c-4312-8dc0-c5eb3aac1c9b_mau-phong-khach-dep-20.jpg', 'Chờ duyệt', 'Chung cư'),
('HgqDy', 'Nhà hẻm Quận 11', 'U72AF5', 98.00, 'Quận 11', 3, 4, 3, 'Chính chủ', 19.00, 'Nhà gần siêu thị', 'http://localhost:8080/uploads/2b85f0ac-2a2c-4317-abe0-26cd88b987e5_20250414164910-db2f_wm.jpg', 'Chờ duyệt', 'Nhà hẻm'),
('hXpYX', 'Chung cư Thủ Đức', 'U3C228', 70.00, 'Quận Thủ Đức (TP. Thủ Đức)', 1, 3, 2, 'Hợp đồng mua bán', 13.00, 'Chung cư giá rẻ', 'http://localhost:8080/uploads/450c8d2e-5558-4dbc-98ae-064b40a4d2b0_R (1).jpg', 'Chờ duyệt', 'Chung cư'),
('JYBcc', 'Nhà hẻm Bình Chánh', 'U8B30C', 82.00, 'Huyện Bình Chánh', 2, 4, 2, 'Hợp đồng mua bán', 16.00, 'Nhà giá tốt', 'http://localhost:8080/uploads/445e4f1a-a480-47e8-94b4-2b1fbcc0243c_20250423145751-32cf_wm.jpg', 'Chờ duyệt', 'Nhà hẻm'),
('kqrIa', 'Mặt tiền Tân Phú', 'UBF174', 125.00, 'Quận Tân Phú', 3, 6, 3, 'Chính chủ', 50.00, 'Nhà thuận tiện KD', 'http://localhost:8080/uploads/490d36fb-8444-416c-8662-02b8705989ea_20250329190201-a34b_wm.jpg', 'Chờ duyệt', 'Nhà mặt tiền'),
('m9iq1', 'Mặt tiền Quận 7', 'UE9D5B', 125.00, 'Quận 7', 4, 6, 4, 'Sổ đỏ', 51.00, 'Nhà MT sang trọng', 'http://localhost:8080/uploads/d105aaed-314a-43b7-8ed0-3ef084cc755e_20250327115910-7cd7_wm.jpg', 'Chờ duyệt', 'Nhà mặt tiền'),
('NC7H4', 'Mặt tiền Quận 10 ', 'UA3CFC', 135.00, 'Quận 10', 3, 3, 7, 'Sổ đỏ', 55.00, 'Nhà đẹp mặt tiền', 'http://localhost:8080/uploads/be9bce9e-7017-4453-ab66-ad388da73f38_20250425153449-5a1e_wm.jpg', 'Chờ duyệt', 'Nhà mặt tiền'),
('Nop6i', 'Nhà hẻm Củ Chi', 'U8B30C', 76.00, 'Huyện Củ Chi', 3, 5, 4, 'Hợp đồng mua bán', 14.00, 'Nhà mới xây khang trang', 'http://localhost:8080/uploads/a44d2508-fbb8-42b0-ac64-649dd7a87f59_20250403142857-d4c5_wm.jpg', 'Chờ duyệt', 'Nhà hẻm'),
('nYhgz', 'Biệt thự Quận 1', 'U23A66', 350.00, 'Quận 1', 4, 8, 4, 'Chính chủ', 250.00, 'Biệt thự trung tâm', 'http://localhost:8080/uploads/b5c4c2c2-eeb0-48dd-9cc3-163dde1e56da_la-mat-mau-biet-thu-hien-dai-nai-nhat-4-tang-doc-dao-8-scaled.jpg', 'Chờ duyệt', 'Biệt thự'),
('pttSo', 'Biệt thự Phú Nhuận', 'U2D1F8', 250.00, 'Quận Phú Nhuận', 4, 8, 5, 'Chính chủ', 260.00, 'Biệt thự sang trọng', 'http://localhost:8080/uploads/e6ff9f96-1edd-489d-aeaf-9f9abea40947_thiet-ke-biet-thu-4-tang.jpg', 'Chờ duyệt', 'Biệt thự'),
('qptWn', 'Biệt thự Quận 7', 'U01509', 500.00, 'Quận 7', 14, 7, 5, 'Chính chủ', 300.00, 'Biệt thự có hồ bơi', 'http://localhost:8080/uploads/719e915d-f6d2-40be-9ce9-8464cbd92895_biet-thu-4-tang-co-ho-boi-anh-1-780x600.jpg', 'Chờ duyệt', 'Biệt thự'),
('RROOH', 'Mặt tiền Bình Thạnh', 'UC4631', 127.00, 'Quận Bình Thạnh', 3, 4, 3, 'Chính chủ', 53.00, 'Nhà MT lớn', 'http://localhost:8080/uploads/6ed5289f-fc7f-4d43-aed6-11554acf9e72_20250425094744-60f4_wm.jpg', 'Chờ duyệt', 'Nhà mặt tiền'),
('TLXsB', 'Mặt tiền Quận 1', 'UA3CFC', 150.00, 'Quận 1', 3, 4, 2, 'Chính chủ', 60.00, 'Nhà mặt tiền kinh doanh tốt', 'http://localhost:8080/uploads/dbe73eb8-dae9-437a-a528-6bf66be2c230_20250414114031-05e8_wm.jpg', 'Chờ duyệt', 'Nhà mặt tiền'),
('ty76U', 'Biệt thự Thủ Đức ', 'U044B0', 420.00, 'Quận Thủ Đức (TP. Thủ Đức)', 3, 6, 3, 'Sổ đỏ', 220.00, 'Biệt thự ở khu yên tĩnh', 'http://localhost:8080/uploads/60dee0b8-d7f6-424f-94a9-374573f1efe6_51353_136484.jpg', 'Chờ duyệt', 'Biệt thự'),
('u0iHK', 'Chung cư Gò Vấp ', 'U415D7', 72.00, 'Quận Gò Vấp', 1, 3, 2, 'Sổ đỏ', 13.50, 'Chung cư trung tâm thành phố ', 'http://localhost:8080/uploads/08f1e948-2cef-4c17-a960-5986a3c761d7_PTT-LEMAN-LUXURY-HINH-02-scaled.jpg', 'Chờ duyệt', 'Chung cư'),
('uAyyo', 'Chung cư Quận 3', 'U56675', 90.00, 'Quận 3', 1, 4, 3, 'Sổ đỏ', 17.00, 'Chung cư phong cách hiện đại', 'http://localhost:8080/uploads/f228f8e5-62df-4636-b27c-8ec548d9ca4a_OIP (3).jpg', 'Chờ duyệt', 'Chung cư'),
('Ul015', 'Nhà hẻm Quận 8', 'U83AC1', 85.00, 'Quận 8', 4, 4, 4, 'Chính chủ', 170.00, 'Nhà nhỏ gọn tiện nghi', 'http://localhost:8080/uploads/db4c80ba-488d-44d2-aa1b-3ade3ac09098_20250423213217-74fb_wm.jpg', 'Chờ duyệt', 'Nhà hẻm'),
('vDpNz', ' Mặt tiền Quận 5', 'UA3CFC', 140.00, 'Quận 5', 2, 3, 1, 'Chính chủ', 38.00, 'Nhà mặt tiền rộng', 'http://localhost:8080/uploads/aac1d64b-20d6-43f6-bed6-82f3d95bd384_20241215114116-c576_wm.jpg', 'Chờ duyệt', 'Nhà mặt tiền'),
('veEjP', 'Nhà hẻm Hóc Môn', 'U8D064', 80.00, 'Huyện Hóc Môn', 2, 4, 2, 'Sổ đỏ', 15.00, 'Nhà đẹp hẻm xe máy', 'http://localhost:8080/uploads/4e02604e-4e9f-47e9-a3f9-ce5224950778_20250415155018-01ab_wm.jpg', 'Chờ duyệt', 'Nhà hẻm'),
('vnGas', 'Nhà hẻm Tân Bình', 'U65688', 88.00, 'Quận Tân Bình', 2, 4, 2, 'Chính chủ', 16.00, 'Nhà sạch đẹp', 'http://localhost:8080/uploads/ed1845ba-97d8-4144-a779-4f93176fa900_20250423195726-3120_wm.jpg', 'Chờ duyệt', 'Nhà hẻm'),
('vwu17', 'Nhà hẻm Quận 6', 'U65688', 95.00, 'Quận 6', 3, 4, 2, 'Sổ đỏ', 18.00, 'Hẻm đủ rộng để xe lớn qua', 'http://localhost:8080/uploads/881ff297-733c-480e-b4ba-d17eeb757d85_20250422154009-8aa9_wm.jpg', 'Chờ duyệt', 'Nhà hẻm'),
('wc8sr', 'Biệt thự Bình Thạnh', 'U044B0', 220.00, 'Quận Bình Thạnh', 4, 7, 4, 'Hợp đồng mua bán', 270.00, 'Biệt thự cao cấp', 'http://localhost:8080/uploads/9a3e91b1-47c7-4d98-8c4b-3cdb91715e3f_biet-thu-4-tang6-1024x834.jpg', 'Chờ duyệt', 'Biệt thự'),
('XKvKk', 'Mặt tiền Quận 3', 'UC4631', 155.00, 'Quận 3', 2, 4, 2, 'Hợp đồng mua bán', 59.00, 'Nhà KD buôn bán', 'http://localhost:8080/uploads/ebe2043b-dfa9-4095-81d5-cc0f8898f17a_20250425100811-c3d5_wm.jpg', 'Chờ duyệt', 'Nhà mặt tiền');


LOCK TABLES `sellinghouse` WRITE;
/*!40000 ALTER TABLE `sellinghouse` DISABLE KEYS */;
/*!40000 ALTER TABLE `sellinghouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserID` varchar(50) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Role` varchar(50) NOT NULL,
  `State` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

INSERT INTO `users` (`UserID`, `Name`, `Email`, `Password`, `Phone`, `Role`, `State`) VALUES
('U01509', 'Lý Thanh Vân', 'lythanhvan14@gmail.com', '$2a$10$nmBrtrW97dp8SEbuvGHW.OXiuH0WZMgH0KTA2GLHkGSX1rDoXhGti', '0372334455', '0', 'Active'),
('U044B0', 'Nguyễn Gia Hân', 'nguyengiahan09@gmail.com', '$2a$10$2OAmQPswYgivi77TlH7TOOrmusieMX.7K/qnxEO5.9gchV6QPPPdy', '0857788990', '0', 'Active'),
('U23A66', 'Hoàng Vũ Võ', 'hoangvuvo999@gmail.com', '$2a$10$VmhiaMy6S96x.5Uo3XdKlORO5Z9/x9wroaQloWA.4scw1s/ZxASUq', '0352349264', '0', 'Active'),
('U2688F', 'Hoàng Thị Lan', 'hoangthilan05@gmail.com', '$2a$10$pOKkg3BP04VhdddcZ34YYeHxiDBRrFPXudMHIbuhcAKyZRfi1x4yS', '0933344556', '0', 'Active'),
('U2D1F8', 'Nguyễn Văn Đô', 'nguyenvando16@gmail.com', '$2a$10$2SpHKEBcmottAM/gSi.VjubaLsvO9y.KisLWpp7kLrH0rgokoEV0W', '0354556677', '0', 'Active'),
('U33521', 'Bùi Thái Sơn', 'buithaison18@gmail.com', '$2a$10$cfnuPfBwxuvYPZ9IY4w9c.RPRlxFVfB7gnQNCwmIFPphAWFY4Wkhm', '0396778899 ', '0', 'Active'),
('U3C228', 'Lưu Nhật Minh', 'luunhatminh10@gmail.com', '$2a$10$6gJ4sn3Q6/yG8fV73p08iOk8d7ZGuqOjpxCbNOopF736WiulJb/0y', '0948899001', '0', 'Active'),
('U415D7', ' Mai Hồng Phúc', 'maihongphuc11@gmail.com', '$2a$10$2nEpi3RgIfnX5nH0HVLgv.D0uIgwpyrqQRUMlOcAWEwHTPZydhL3G', '0369001122', '0', 'Active'),
('U43262', 'Trần Quốc Huy', 'tranquochuy03@gmail.com', '$2a$10$wHAoBBCe/g4dHCHhFTTl7.29xtCraVyLdMf.70vjzC4t68RIdgM2e', '0901122334', '0', 'Active'),
('U4B28C', 'Hoàng Vũ Võ', 'hoangvuvo907@gmail.com', '$2a$10$GDCLnZpCXAi4DS0pIGirdORgM4UYaTwpV0LjG8uBr/MsG5lhUlS.a', '0352349264', '1', 'Active'),
('U56675', 'Nguyễn Thị Minh Hằng', 'nguyenthiminhhang02@gmail.com', '$2a$10$M/TdaenMqpUJKLKBPR1T6eD.UIuINl3pXHp23J9w5ohCwyDr2H7PS', '0919876543', '0', 'Active'),
('U65688', 'Đinh Bảo Châu', 'dinhbaochau15@gmail.com', '$2a$10$baCtB2BJr5ug/OWdyMl71uIMwLqxtJSU.tif975ghJItvSyAAZ0Cq', '0843445566 ', '0', 'Active'),
('U72AF5', 'Đào Duy Anh', 'daoduyanh06@gmail.com', '$2a$10$m4tLczc6pHFwFQGo6g.Qk.s6Un9grvW9Q.K1uzULrNUygc2KTcv6e', '0324455667', '0', 'Active'),
('U83AC1', 'Đoàn Nhật Quân', 'doannhatquan20@gmail.com', '$2a$10$7ZhtNgERYJsZ1m2ueoUzlORw3RJWa7.GcPzypgyHZLJkLORxYYW0W', '0958990011', '0', 'Active'),
('U8B30C', 'Vũ Hồng Vân', 'vuhongvan19@gmail.com', '$2a$10$a5iH2pFTpFg3JeZY2n2wj.OX1/6o.JdK7hjJHNvAKPHPYYtr1VnKK', '0707889900 ', '0', 'Active'),
('U8D064', 'Trịnh Khánh Hà', 'trinhkhanhha17@gmail.com', '$2a$10$ilq/3Bbxa5MXlUZ0iTylSO19Z/aJySbuXJ/ZeA9ookPj6F7t8YmPG', '0865667788 ', '0', 'Active'),
('UA3CFC', 'Phạm Văn Khánh', 'phamvankhanh04@gmail.com', '$2a$10$FYojbf/W68W6BN2iSUu3.egH9gtdaTwu9MY9hjjfjhcEEdbP.NAny', '0962233445', '0', 'Active'),
('UBF174', 'Võ Thành Tín', 'vothanhtin08@gmail.com', '$2a$10$yt6lVRlZAgct1t4.n9wuWOgSBphr659aXC9sHBuPfK5cH8k1xa8.2', '0836677889 ', '0', 'Active'),
('UC4631', 'Lâm Hoàng Dũng', 'lamhoangdung01@gmail.com', '$2a$10$a1WGRBu2bG39.qV5tm.B9ejLjqMKQM8yRA.6TYhmO5LDVFtKvRh7e', '0972345678 ', '0', 'Active'),
('UE71C8', 'Lê Ngọc Trâm', 'lengoctram07@gmail.com', '$2a$10$unGgadOu12I4lAZ6hGLTb.L63unMs7I/1BhxPXgy5npId9PpSd.Qu', '0385566778', '0', 'Active'),
('UE9D5B', 'Tạ Quốc Bảo ', 'taquocbao13@gmail.com', '$2a$10$QBBPG8ZdoodiZ9MzCQ2Bgep88l4wfL8Lv0CGUn49vxBqiRlO1ciF2', '0921223344 ', '0', 'Active'),
('UF8EFA', 'Nguyễn Thảo Nhi', 'nguyenthaonhi12@gmail.com', '$2a$10$59TdyhqWQZZu0AchsX/RjuSJd51.LXztZLmxKCsN4MDPIowIUutXG', '0980112233', '0', 'Active');

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2025-04-04 20:38:29
