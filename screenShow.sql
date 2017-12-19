-- MySQL dump 10.13  Distrib 5.7.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: medal
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `post` varchar(255) NOT NULL,
  PRIMARY KEY (`post`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('ewewq'),('weqeq'),('一大队'),('七大队'),('三大队'),('二大队'),('五大队'),('六大队'),('办公室'),('四大队'),('支队班子\r\n'),('政检处'),('法制大队'),('特侦大队');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `per_pri`
--

DROP TABLE IF EXISTS `per_pri`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `per_pri` (
  `id` varchar(255) NOT NULL,
  `year` varchar(255) NOT NULL,
  `item` varchar(255) NOT NULL,
  `detail` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`year`,`item`,`detail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `per_pri`
--

LOCK TABLES `per_pri` WRITE;
/*!40000 ALTER TABLE `per_pri` DISABLE KEYS */;
INSERT INTO `per_pri` VALUES ('1','2018','专项','一等功'),('10','2018','专项','一等功'),('11','2018','专项','一等功'),('12','2018','专项','一等功'),('121','2015','专项','一等功'),('121','2015','专项','二等功'),('121','2015','非专项','一等功'),('121','2015','非专项','二等功'),('12112313','2015','专项','一等功'),('12112313','2015','专项','二等功'),('1212','2015','专项','一等功'),('1212','2015','专项','二等功'),('1212','2015','非专项','一等功'),('1212','2015','非专项','二等功'),('123','2015','专项','一等功'),('13','2018','专项','一等功'),('14','2018','专项','一等功'),('2','2018','专项','一等功'),('210002','2015','专项','一等功'),('210003','2017','专项','一等功'),('210004','2015','专项','一等功'),('210005','2015','专项','一等功'),('210005','2016','专项','一等功'),('210006','2015','专项','一等功'),('210006','2016','专项','一等功'),('210007','2015','专项','一等功'),('210008','2015','专项','一等功'),('210009','2015','专项','一等功'),('210011','2015','专项','一等功'),('210012','2015','专项','一等功'),('210013','2015','专项','一等功'),('210014','2015','专项','一等功'),('210014','2015','非专项','一等功'),('210014','2016','专项','一等功'),('210014','2017','专项','一等功'),('210014','2018','专项','一等功'),('210015','2015','专项','一等功'),('210016','2015','专项','一等功'),('210017','2015','专项','一等功'),('210018','2015','专项','一等功'),('210019','2015','专项','一等功'),('210019','2016','专项','一等功'),('210019','2018','专项','一等功'),('210020','2015','专项','一等功'),('210020','2015','非专项','一等功'),('210021','2017','专项','一等功'),('210022','2015','专项','一等功'),('210023','2015','专项','一等功'),('23131','2015','专项','一等功'),('23131','2015','专项','二等功'),('23131','2015','非专项','一等功'),('23131','2015','非专项','二等功'),('3','2018','专项','一等功'),('312312','2018','专项','一等功'),('3912','2018','专项','一等功'),('4','2018','专项','一等功'),('5','2018','专项','一等功'),('65465','2015','专项','一等功'),('65465','2015','专项','二等功'),('65465','2015','非专项','一等功'),('65465','2015','非专项','二等功'),('766767','2015','专项','一等功'),('766767','2015','专项','二等功'),('swwqq','2015','专项','一等功'),('swwqq','2015','专项','二等功'),('swwqq','2015','非专项','一等功'),('swwqq','2015','非专项','二等功');
/*!40000 ALTER TABLE `per_pri` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `per_rec`
--

DROP TABLE IF EXISTS `per_rec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `per_rec` (
  `id` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `event` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`time`,`event`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `per_rec`
--

LOCK TABLES `per_rec` WRITE;
/*!40000 ALTER TABLE `per_rec` DISABLE KEYS */;
/*!40000 ALTER TABLE `per_rec` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `person` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES ('121','1212','男','一大队','纪检组组长','image_upload_1511696282000.png'),('12112313','1212','男','一大队','纪检组组长','image_upload_1511696303000.png'),('1212','12121','女','一大队','科员','image_upload_1511576614000.png'),('123','pancake','男','一大队','中队长','image_upload_1513645271000.png'),('210001','任填琪','男','办公室','副主任','image_upload_1510634967000.png'),('210002','王慧','女','五大队','主任科员','image_upload_1510635017000.png'),('210003','李东坡','男','六大队','中队长','image_upload_1510635054000.png'),('210004','白茹','女','特侦大队','大队政委','image_upload_1510635094000.png'),('210005','冯中廷','男','五大队','主任科员','image_upload_1510635144000.png'),('210006','孔令琦','男','五大队','大队长','image_upload_1510635182000.png'),('210007','付雪','女','法制大队','主任科员','image_upload_1510635233000.png'),('210008','曲明亮','男','法制大队','中队长','image_upload_1510635290000.png'),('210009','董立梅','女','二大队','副大队长','image_upload_1510635480000.png'),('210010','鲁颖','女','四大队','文职警员','image_upload_1510635520000.png'),('210011','蔡立权','男','特侦大队','主任科员','image_upload_1510635584000.png'),('210012','于志军','男','五大队','主任科员','image_upload_1510635625000.png'),('210013','方哲','男','七大队','文职警员','image_upload_1510635661000.png'),('210014','刘致立','女','一大队','文职警员','image_upload_1510635710000.png'),('210016','李晓涛','男','三大队','主任科员','image_upload_1510635754000.png'),('210017','姜健','男','特侦大队','主任科员','image_upload_1510636966000.png'),('210018','苏吉成','男','二大队','大队长','image_upload_1510636997000.png'),('210019','吕毅','男','七大队','副大队长','image_upload_1510637031000.png'),('210020','刘峰','男','一大队','大队长','image_upload_1510637093000.png'),('210021','马新茗','女','二大队','主任科员','image_upload_1510637134000.png'),('210022','孙成军','男','六大队','主任科员','image_upload_1510637161000.png'),('210023','邹镒冰','男','政检处','主任科员','image_upload_1510637196000.png'),('210024','颜潇雨','女','七大队','主任科员','image_upload_1510637224000.png'),('23131','2131','男','一大队','纪检组组长','image_upload_1511576752000.png'),('65465','56575','男','一大队','中队长','image_upload_1512113357000.png'),('766767','6767','男','一大队','中队长','image_upload_1512113372000.png'),('swwqq','qewq','男','一大队','纪检组组长','image_upload_1511576714000.png');
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `positions` (
  `job` varchar(255) NOT NULL,
  PRIMARY KEY (`job`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions`
--

LOCK TABLES `positions` WRITE;
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
INSERT INTO `positions` VALUES ('eqeqe'),('eqeqweqw'),('中队长'),('主任科员'),('副中队长'),('副主任'),('副主任科员'),('副大队长'),('副支队长'),('副调研员'),('办公室主任'),('大队政委'),('大队长'),('支队政委'),('支队长'),('政检处主任'),('文职警员'),('科员'),('纪检组组长'),('调研员');
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prize`
--

DROP TABLE IF EXISTS `prize`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prize` (
  `year` varchar(255) NOT NULL,
  `item` varchar(255) NOT NULL,
  `detail` varchar(255) NOT NULL,
  PRIMARY KEY (`year`,`item`,`detail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prize`
--

LOCK TABLES `prize` WRITE;
/*!40000 ALTER TABLE `prize` DISABLE KEYS */;
INSERT INTO `prize` VALUES ('1997','eqeqe','qweqe'),('2015','专项','一等功'),('2015','专项','二等功'),('2015','非专项','一等功'),('2015','非专项','二等功'),('2016','专项','一等功'),('2016','专项','二等功'),('2016','非专项','一等功'),('2016','非专项','二等功'),('2017','专项','一等功'),('2018','专项','一等功'),('2019','专项','一等功'),('2019','专项','嘉奖'),('2020','专项','一等奖'),('2021','专项','一等奖'),('2022','专项','一等功'),('222','222','222');
/*!40000 ALTER TABLE `prize` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `record` (
  `time` varchar(255) NOT NULL,
  `event` varchar(255) NOT NULL,
  PRIMARY KEY (`time`,`event`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record`
--

LOCK TABLES `record` WRITE;
/*!40000 ALTER TABLE `record` DISABLE KEYS */;
/*!40000 ALTER TABLE `record` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-19 10:16:03
