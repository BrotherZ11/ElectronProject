-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gestion_info
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `tmuestra`
--

DROP TABLE IF EXISTS `tmuestra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmuestra` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `NIF_Paciente` varchar(50) DEFAULT NULL,
  `Cultivo` varchar(50) DEFAULT NULL,
  `Solucion` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_SOLUCION_idx` (`Solucion`),
  CONSTRAINT `FK_SOLUCION` FOREIGN KEY (`Solucion`) REFERENCES `tsolucion` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tmuestra`
--

LOCK TABLES `tmuestra` WRITE;
/*!40000 ALTER TABLE `tmuestra` DISABLE KEYS */;
/*!40000 ALTER TABLE `tmuestra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tpermiso`
--

DROP TABLE IF EXISTS `tpermiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tpermiso` (
  `rolName` varchar(50) NOT NULL,
  `pantalla` varchar(50) NOT NULL,
  `acceso` tinyint NOT NULL,
  `insertar` tinyint NOT NULL,
  `modificar` tinyint NOT NULL,
  `borrar` tinyint NOT NULL,
  PRIMARY KEY (`rolName`,`pantalla`),
  CONSTRAINT `FK_ROL_PERMISO` FOREIGN KEY (`rolName`) REFERENCES `trol` (`rolName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpermiso`
--

LOCK TABLES `tpermiso` WRITE;
/*!40000 ALTER TABLE `tpermiso` DISABLE KEYS */;
INSERT INTO `tpermiso` VALUES ('Administrador','1',1,1,1,1),('Invitado','1',1,0,0,0),('Usuario','1',1,0,1,0);
/*!40000 ALTER TABLE `tpermiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trol`
--

DROP TABLE IF EXISTS `trol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trol` (
  `rolName` varchar(50) NOT NULL,
  `rolDes` varchar(255) DEFAULT NULL,
  `admin` tinyint NOT NULL,
  PRIMARY KEY (`rolName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trol`
--

LOCK TABLES `trol` WRITE;
/*!40000 ALTER TABLE `trol` DISABLE KEYS */;
INSERT INTO `trol` VALUES ('Administrador','Se pueden insertar, modificar y borrar muestras',1),('Invitado','No se pueden insertar, borrar, ni modificar muestras',0),('Usuario','No se pueden insertar ni borrar muestras, pero si modificarlas',0);
/*!40000 ALTER TABLE `trol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tsolucion`
--

DROP TABLE IF EXISTS `tsolucion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsolucion` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Solucion` varchar(50) DEFAULT NULL,
  `Uso` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsolucion`
--

LOCK TABLES `tsolucion` WRITE;
/*!40000 ALTER TABLE `tsolucion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tsolucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tusuario`
--

DROP TABLE IF EXISTS `tusuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tusuario` (
  `nif` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `rolName` varchar(50) NOT NULL,
  PRIMARY KEY (`nif`),
  KEY `FK_ROL_USUARIO_idx` (`rolName`),
  CONSTRAINT `FK_ROL_USUARIO` FOREIGN KEY (`rolName`) REFERENCES `trol` (`rolName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tusuario`
--

LOCK TABLES `tusuario` WRITE;
/*!40000 ALTER TABLE `tusuario` DISABLE KEYS */;
INSERT INTO `tusuario` VALUES ('00000000x','admin','Administrador'),('11111111a','user','Usuario'),('22222222b','guest','Invitado');
/*!40000 ALTER TABLE `tusuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-03 11:43:22
