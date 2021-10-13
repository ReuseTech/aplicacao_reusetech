-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: dbreusetech
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `armazenamento`
--

DROP TABLE IF EXISTS `armazenamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `armazenamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(300) NOT NULL,
  `data_montagem` date DEFAULT NULL,
  `remetente` varchar(150) DEFAULT NULL,
  `tamanho` int NOT NULL,
  `medidas` varchar(100) DEFAULT NULL,
  `rpm` int DEFAULT NULL,
  `velocidade_leitura` int DEFAULT NULL,
  `velocidade_gravacao` int DEFAULT NULL,
  `funciona` tinyint(1) DEFAULT NULL,
  `id__pc` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk__pc_armazenamento` (`id__pc`),
  CONSTRAINT `fk__pc_armazenamento` FOREIGN KEY (`id__pc`) REFERENCES `pc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `armazenamento`
--

LOCK TABLES `armazenamento` WRITE;
/*!40000 ALTER TABLE `armazenamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `armazenamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `barramento_armazenamento`
--

DROP TABLE IF EXISTS `barramento_armazenamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barramento_armazenamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `barramento` varchar(150) DEFAULT NULL,
  `tipo` enum('tipo','barramento') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barramento_armazenamento`
--

LOCK TABLES `barramento_armazenamento` WRITE;
/*!40000 ALTER TABLE `barramento_armazenamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `barramento_armazenamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `barramento_cooler`
--

DROP TABLE IF EXISTS `barramento_cooler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barramento_cooler` (
  `id` int NOT NULL AUTO_INCREMENT,
  `suport_soquete` varchar(150) DEFAULT NULL,
  `tipo` enum('air','passive','water') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barramento_cooler`
--

LOCK TABLES `barramento_cooler` WRITE;
/*!40000 ALTER TABLE `barramento_cooler` DISABLE KEYS */;
/*!40000 ALTER TABLE `barramento_cooler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `barramento_placa_de_rede`
--

DROP TABLE IF EXISTS `barramento_placa_de_rede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barramento_placa_de_rede` (
  `id` int NOT NULL AUTO_INCREMENT,
  `barramento` varchar(150) DEFAULT NULL,
  `tipo` enum('ethernet','wireless') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barramento_placa_de_rede`
--

LOCK TABLES `barramento_placa_de_rede` WRITE;
/*!40000 ALTER TABLE `barramento_placa_de_rede` DISABLE KEYS */;
/*!40000 ALTER TABLE `barramento_placa_de_rede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `barramento_placa_de_video`
--

DROP TABLE IF EXISTS `barramento_placa_de_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barramento_placa_de_video` (
  `id` int NOT NULL AUTO_INCREMENT,
  `barramento` varchar(150) DEFAULT NULL,
  `tipo` enum('barramento','saidas') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barramento_placa_de_video`
--

LOCK TABLES `barramento_placa_de_video` WRITE;
/*!40000 ALTER TABLE `barramento_placa_de_video` DISABLE KEYS */;
/*!40000 ALTER TABLE `barramento_placa_de_video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `barramento_placa_mae`
--

DROP TABLE IF EXISTS `barramento_placa_mae`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barramento_placa_mae` (
  `id` int NOT NULL AUTO_INCREMENT,
  `barramento` varchar(150) DEFAULT NULL,
  `tipo` enum('armazenamento','memoria','pci') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barramento_placa_mae`
--

LOCK TABLES `barramento_placa_mae` WRITE;
/*!40000 ALTER TABLE `barramento_placa_mae` DISABLE KEYS */;
INSERT INTO `barramento_placa_mae` VALUES (1,'DDR3','memoria'),(2,'DDR4','memoria'),(3,'PCIe 3.0','pci'),(4,'PCIe 2.0','pci'),(5,'SATA 3','armazenamento'),(6,'SATA 2','armazenamento'),(7,'NVMe','armazenamento');
/*!40000 ALTER TABLE `barramento_placa_mae` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `barramento_processador`
--

DROP TABLE IF EXISTS `barramento_processador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barramento_processador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `soquete` varchar(150) DEFAULT NULL,
  `barramento_ram` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barramento_processador`
--

LOCK TABLES `barramento_processador` WRITE;
/*!40000 ALTER TABLE `barramento_processador` DISABLE KEYS */;
/*!40000 ALTER TABLE `barramento_processador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cooler`
--

DROP TABLE IF EXISTS `cooler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cooler` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(300) NOT NULL,
  `data_montagem` date DEFAULT NULL,
  `remetente` varchar(150) DEFAULT NULL,
  `medidas` varchar(300) DEFAULT NULL,
  `funciona` tinyint(1) DEFAULT NULL,
  `id__pc` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk__pc_cooler` (`id__pc`),
  CONSTRAINT `fk__pc_cooler` FOREIGN KEY (`id__pc`) REFERENCES `pc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cooler`
--

LOCK TABLES `cooler` WRITE;
/*!40000 ALTER TABLE `cooler` DISABLE KEYS */;
/*!40000 ALTER TABLE `cooler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dispositivos_moveis`
--

DROP TABLE IF EXISTS `dispositivos_moveis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispositivos_moveis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(300) DEFAULT NULL,
  `data_recebimento` date DEFAULT NULL,
  `remetente` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivos_moveis`
--

LOCK TABLES `dispositivos_moveis` WRITE;
/*!40000 ALTER TABLE `dispositivos_moveis` DISABLE KEYS */;
/*!40000 ALTER TABLE `dispositivos_moveis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fk_armazenamento_barramento`
--

DROP TABLE IF EXISTS `fk_armazenamento_barramento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fk_armazenamento_barramento` (
  `id__armazenamento` int NOT NULL,
  `id__barramento` int NOT NULL,
  `quantidade` int DEFAULT NULL,
  KEY `id__armazenamento` (`id__armazenamento`),
  KEY `id__barramento_armazenamento` (`id__barramento`),
  CONSTRAINT `id__armazenamento` FOREIGN KEY (`id__armazenamento`) REFERENCES `armazenamento` (`id`) ON DELETE CASCADE,
  CONSTRAINT `id__barramento_armazenamento` FOREIGN KEY (`id__barramento`) REFERENCES `barramento_armazenamento` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fk_armazenamento_barramento`
--

LOCK TABLES `fk_armazenamento_barramento` WRITE;
/*!40000 ALTER TABLE `fk_armazenamento_barramento` DISABLE KEYS */;
/*!40000 ALTER TABLE `fk_armazenamento_barramento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fk_cooler_barramento`
--

DROP TABLE IF EXISTS `fk_cooler_barramento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fk_cooler_barramento` (
  `id__cooler` int NOT NULL,
  `id__barramento` int NOT NULL,
  `quantidade` int DEFAULT NULL,
  KEY `id__cooler` (`id__cooler`),
  KEY `id__barramento_cooler` (`id__barramento`),
  CONSTRAINT `id__barramento_cooler` FOREIGN KEY (`id__barramento`) REFERENCES `barramento_cooler` (`id`) ON DELETE CASCADE,
  CONSTRAINT `id__cooler` FOREIGN KEY (`id__cooler`) REFERENCES `cooler` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fk_cooler_barramento`
--

LOCK TABLES `fk_cooler_barramento` WRITE;
/*!40000 ALTER TABLE `fk_cooler_barramento` DISABLE KEYS */;
/*!40000 ALTER TABLE `fk_cooler_barramento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fk_placa_de_rede_barramento`
--

DROP TABLE IF EXISTS `fk_placa_de_rede_barramento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fk_placa_de_rede_barramento` (
  `id__placa_de_rede` int NOT NULL,
  `id__barramento` int NOT NULL,
  `quantidade` int DEFAULT NULL,
  KEY `id__placa_de_rede` (`id__placa_de_rede`),
  KEY `id__barramento_placa_de_rede` (`id__barramento`),
  CONSTRAINT `id__barramento_placa_de_rede` FOREIGN KEY (`id__barramento`) REFERENCES `barramento_placa_de_rede` (`id`) ON DELETE CASCADE,
  CONSTRAINT `id__placa_de_rede` FOREIGN KEY (`id__placa_de_rede`) REFERENCES `placa_de_rede` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fk_placa_de_rede_barramento`
--

LOCK TABLES `fk_placa_de_rede_barramento` WRITE;
/*!40000 ALTER TABLE `fk_placa_de_rede_barramento` DISABLE KEYS */;
/*!40000 ALTER TABLE `fk_placa_de_rede_barramento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fk_placa_de_video_barramento`
--

DROP TABLE IF EXISTS `fk_placa_de_video_barramento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fk_placa_de_video_barramento` (
  `id__placa_de_video` int NOT NULL,
  `id__barramento` int NOT NULL,
  `quantidade` int DEFAULT NULL,
  KEY `id__placa_de_video` (`id__placa_de_video`),
  KEY `id__barramento_placa_de_video` (`id__barramento`),
  CONSTRAINT `id__barramento_placa_de_video` FOREIGN KEY (`id__barramento`) REFERENCES `barramento_placa_de_video` (`id`) ON DELETE CASCADE,
  CONSTRAINT `id__placa_de_video` FOREIGN KEY (`id__placa_de_video`) REFERENCES `placa_de_video` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fk_placa_de_video_barramento`
--

LOCK TABLES `fk_placa_de_video_barramento` WRITE;
/*!40000 ALTER TABLE `fk_placa_de_video_barramento` DISABLE KEYS */;
/*!40000 ALTER TABLE `fk_placa_de_video_barramento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fk_placa_mae_barramento`
--

DROP TABLE IF EXISTS `fk_placa_mae_barramento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fk_placa_mae_barramento` (
  `id__placa_mae` int NOT NULL,
  `id__barramento` int NOT NULL,
  `quantidade` int DEFAULT NULL,
  KEY `id__placa_mae` (`id__placa_mae`),
  KEY `id__barramento_placa_mae` (`id__barramento`),
  CONSTRAINT `id__barramento_placa_mae` FOREIGN KEY (`id__barramento`) REFERENCES `barramento_placa_mae` (`id`) ON DELETE CASCADE,
  CONSTRAINT `id__placa_mae` FOREIGN KEY (`id__placa_mae`) REFERENCES `placa_mae` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fk_placa_mae_barramento`
--

LOCK TABLES `fk_placa_mae_barramento` WRITE;
/*!40000 ALTER TABLE `fk_placa_mae_barramento` DISABLE KEYS */;
INSERT INTO `fk_placa_mae_barramento` VALUES (1,1,4),(1,3,1),(1,4,2),(1,5,3),(1,6,4),(2,2,2),(2,3,1),(2,4,2),(2,7,1),(2,5,4),(3,2,2),(3,3,1),(3,4,2),(3,7,1),(3,5,4);
/*!40000 ALTER TABLE `fk_placa_mae_barramento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fk_processador_barramento`
--

DROP TABLE IF EXISTS `fk_processador_barramento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fk_processador_barramento` (
  `id__processador` int NOT NULL,
  `id__barramento` int NOT NULL,
  `quantidade` int DEFAULT NULL,
  KEY `id__processador` (`id__processador`),
  KEY `id__barramento_processador` (`id__barramento`),
  CONSTRAINT `id__barramento_processador` FOREIGN KEY (`id__barramento`) REFERENCES `barramento_processador` (`id`) ON DELETE CASCADE,
  CONSTRAINT `id__processador` FOREIGN KEY (`id__processador`) REFERENCES `processador` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fk_processador_barramento`
--

LOCK TABLES `fk_processador_barramento` WRITE;
/*!40000 ALTER TABLE `fk_processador_barramento` DISABLE KEYS */;
/*!40000 ALTER TABLE `fk_processador_barramento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fonte`
--

DROP TABLE IF EXISTS `fonte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fonte` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(300) NOT NULL,
  `data_montagem` date DEFAULT NULL,
  `remetente` varchar(150) DEFAULT NULL,
  `modularidade` tinyint(1) DEFAULT NULL,
  `potencia` int NOT NULL,
  `voltagem` varchar(100) DEFAULT NULL,
  `funciona` tinyint(1) DEFAULT NULL,
  `id__pc` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk__pc_fonte` (`id__pc`),
  CONSTRAINT `fk__pc_fonte` FOREIGN KEY (`id__pc`) REFERENCES `pc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fonte`
--

LOCK TABLES `fonte` WRITE;
/*!40000 ALTER TABLE `fonte` DISABLE KEYS */;
/*!40000 ALTER TABLE `fonte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gabinete`
--

DROP TABLE IF EXISTS `gabinete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gabinete` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(300) NOT NULL,
  `data_montagem` date DEFAULT NULL,
  `remetente` varchar(150) DEFAULT NULL,
  `tipo_tamanho` varchar(100) NOT NULL,
  `quant_ventoinhas` int DEFAULT NULL,
  `medidas_placa_mae` varchar(150) DEFAULT NULL,
  `condicoes` varchar(100) DEFAULT NULL,
  `id__pc` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk__pc_gabinete` (`id__pc`),
  CONSTRAINT `fk__pc_gabinete` FOREIGN KEY (`id__pc`) REFERENCES `pc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gabinete`
--

LOCK TABLES `gabinete` WRITE;
/*!40000 ALTER TABLE `gabinete` DISABLE KEYS */;
/*!40000 ALTER TABLE `gabinete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memoria_ram`
--

DROP TABLE IF EXISTS `memoria_ram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memoria_ram` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(300) NOT NULL,
  `data_montagem` date DEFAULT NULL,
  `remetente` varchar(150) DEFAULT NULL,
  `barramento` varchar(150) DEFAULT NULL,
  `tamanho` int NOT NULL,
  `frequencia` int DEFAULT NULL,
  `funciona` tinyint(1) DEFAULT NULL,
  `id__pc` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk__pc_memoria_ram` (`id__pc`),
  CONSTRAINT `fk__pc_memoria_ram` FOREIGN KEY (`id__pc`) REFERENCES `pc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memoria_ram`
--

LOCK TABLES `memoria_ram` WRITE;
/*!40000 ALTER TABLE `memoria_ram` DISABLE KEYS */;
/*!40000 ALTER TABLE `memoria_ram` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitor`
--

DROP TABLE IF EXISTS `monitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monitor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(300) DEFAULT NULL,
  `data_recebimento` date DEFAULT NULL,
  `remetente` varchar(100) DEFAULT NULL,
  `resolucao` varchar(50) DEFAULT NULL,
  `conexao` varchar(50) DEFAULT NULL,
  `funciona` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitor`
--

LOCK TABLES `monitor` WRITE;
/*!40000 ALTER TABLE `monitor` DISABLE KEYS */;
/*!40000 ALTER TABLE `monitor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mouse`
--

DROP TABLE IF EXISTS `mouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mouse` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(300) DEFAULT NULL,
  `data_recebimento` date DEFAULT NULL,
  `remetente` varchar(100) DEFAULT NULL,
  `tipo_sensor` varchar(50) DEFAULT NULL,
  `conexao` varchar(50) DEFAULT NULL,
  `funciona` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mouse`
--

LOCK TABLES `mouse` WRITE;
/*!40000 ALTER TABLE `mouse` DISABLE KEYS */;
/*!40000 ALTER TABLE `mouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notebook`
--

DROP TABLE IF EXISTS `notebook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notebook` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(1000) DEFAULT NULL,
  `data_recebimento` date DEFAULT NULL,
  `remetente` varchar(100) DEFAULT NULL,
  `processador` varchar(100) DEFAULT NULL,
  `quantidade_memoria_ram` int DEFAULT NULL,
  `quantidade_armazenamento` int DEFAULT NULL,
  `conexoes` varchar(500) DEFAULT NULL,
  `padrao_teclado` varchar(50) DEFAULT NULL,
  `possui_grafico_dedicado` tinyint(1) DEFAULT NULL,
  `funciona` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notebook`
--

LOCK TABLES `notebook` WRITE;
/*!40000 ALTER TABLE `notebook` DISABLE KEYS */;
/*!40000 ALTER TABLE `notebook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outros`
--

DROP TABLE IF EXISTS `outros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `outros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(300) DEFAULT NULL,
  `data_recebimento` date DEFAULT NULL,
  `remetente` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outros`
--

LOCK TABLES `outros` WRITE;
/*!40000 ALTER TABLE `outros` DISABLE KEYS */;
/*!40000 ALTER TABLE `outros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pc`
--

DROP TABLE IF EXISTS `pc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_montagem` date NOT NULL,
  `status` varchar(200) DEFAULT NULL,
  `destinatario` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `id_2` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pc`
--

LOCK TABLES `pc` WRITE;
/*!40000 ALTER TABLE `pc` DISABLE KEYS */;
/*!40000 ALTER TABLE `pc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `placa_de_rede`
--

DROP TABLE IF EXISTS `placa_de_rede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `placa_de_rede` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(300) NOT NULL,
  `data_montagem` date DEFAULT NULL,
  `remetente` varchar(150) DEFAULT NULL,
  `funciona` tinyint(1) DEFAULT NULL,
  `id__pc` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk__pc_placa_de_rede` (`id__pc`),
  CONSTRAINT `fk__pc_placa_de_rede` FOREIGN KEY (`id__pc`) REFERENCES `pc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `placa_de_rede`
--

LOCK TABLES `placa_de_rede` WRITE;
/*!40000 ALTER TABLE `placa_de_rede` DISABLE KEYS */;
/*!40000 ALTER TABLE `placa_de_rede` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `placa_de_video`
--

DROP TABLE IF EXISTS `placa_de_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `placa_de_video` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(300) NOT NULL,
  `data_montagem` date DEFAULT NULL,
  `remetente` varchar(150) DEFAULT NULL,
  `medidas` varchar(150) DEFAULT NULL,
  `consumo_energetico` int DEFAULT NULL,
  `conectores_energia` int DEFAULT NULL,
  `funciona` tinyint(1) DEFAULT NULL,
  `id__pc` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk__pc_placa_de_video` (`id__pc`),
  CONSTRAINT `fk__pc_placa_de_video` FOREIGN KEY (`id__pc`) REFERENCES `pc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `placa_de_video`
--

LOCK TABLES `placa_de_video` WRITE;
/*!40000 ALTER TABLE `placa_de_video` DISABLE KEYS */;
/*!40000 ALTER TABLE `placa_de_video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `placa_mae`
--

DROP TABLE IF EXISTS `placa_mae`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `placa_mae` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(300) NOT NULL,
  `data_montagem` date DEFAULT NULL,
  `remetente` varchar(150) DEFAULT NULL,
  `soquete` varchar(150) DEFAULT NULL,
  `chipset` varchar(150) DEFAULT NULL,
  `funciona_ethernet` tinyint(1) DEFAULT NULL,
  `funciona` tinyint(1) DEFAULT NULL,
  `id__pc` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk__pc_placa_mae` (`id__pc`),
  CONSTRAINT `fk__pc_placa_mae` FOREIGN KEY (`id__pc`) REFERENCES `pc` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `placa_mae`
--

LOCK TABLES `placa_mae` WRITE;
/*!40000 ALTER TABLE `placa_mae` DISABLE KEYS */;
INSERT INTO `placa_mae` VALUES (1,'ASUS','P8H77-M PRO','Placa mãe ASUS P8H77-M PRO','2021-07-06','Remetente A','LGA1155','H77',1,1,NULL),(2,'Gigabyte','GA-A320M-H','Placa mãe Gigabyte GA-A320M-H ','2021-07-04','Remetente B','AM4','A320',1,1,NULL),(3,'Biostar','H410MH','Placa mãe Biostar H410MH','2021-07-02','Remetente C','LGA1200','H410',1,1,NULL);
/*!40000 ALTER TABLE `placa_mae` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `processador`
--

DROP TABLE IF EXISTS `processador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `processador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(300) NOT NULL,
  `data_montagem` date DEFAULT NULL,
  `remetente` varchar(150) DEFAULT NULL,
  `quantidade_nucleos` int DEFAULT NULL,
  `quantidade_threads` int DEFAULT NULL,
  `possui_graficos_integrados` tinyint(1) NOT NULL,
  `tdp` int DEFAULT NULL,
  `funciona` tinyint(1) DEFAULT NULL,
  `id__pc` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk__pc_processador` (`id__pc`),
  CONSTRAINT `fk__pc_processador` FOREIGN KEY (`id__pc`) REFERENCES `pc` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processador`
--

LOCK TABLES `processador` WRITE;
/*!40000 ALTER TABLE `processador` DISABLE KEYS */;
/*!40000 ALTER TABLE `processador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `smartphone`
--

DROP TABLE IF EXISTS `smartphone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `smartphone` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(1000) DEFAULT NULL,
  `data_recebimento` date DEFAULT NULL,
  `remetente` varchar(100) DEFAULT NULL,
  `processador` varchar(100) DEFAULT NULL,
  `quantidade_memoria_ram` int DEFAULT NULL,
  `quantidade_armazenamento` int DEFAULT NULL,
  `funciona` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `smartphone`
--

LOCK TABLES `smartphone` WRITE;
/*!40000 ALTER TABLE `smartphone` DISABLE KEYS */;
/*!40000 ALTER TABLE `smartphone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teclado`
--

DROP TABLE IF EXISTS `teclado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teclado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(150) DEFAULT NULL,
  `descricao` varchar(300) DEFAULT NULL,
  `data_recebimento` date DEFAULT NULL,
  `remetente` varchar(100) DEFAULT NULL,
  `padrao` varchar(50) DEFAULT NULL,
  `conexao` varchar(50) DEFAULT NULL,
  `funciona` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teclado`
--

LOCK TABLES `teclado` WRITE;
/*!40000 ALTER TABLE `teclado` DISABLE KEYS */;
/*!40000 ALTER TABLE `teclado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `login` varchar(150) NOT NULL,
  `nome` varchar(150) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`login`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-14 19:38:42
