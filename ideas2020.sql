/*
SQLyog Community v13.1.2 (64 bit)
MySQL - 5.6.44-cll-lve : Database - ideascrm
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ideascrm` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `ideascrm`;

/*Table structure for table `base` */

DROP TABLE IF EXISTS `base`;

CREATE TABLE `base` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `base` */

LOCK TABLES `base` WRITE;

UNLOCK TABLES;

/*Table structure for table `cargos` */

DROP TABLE IF EXISTS `cargos`;

CREATE TABLE `cargos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) DEFAULT NULL,
  `descripcion` text,
  `precio` decimal(10,2) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `cargos` */

LOCK TABLES `cargos` WRITE;

insert  into `cargos`(`id`,`nombre`,`descripcion`,`precio`,`status`,`created_at`,`updated_at`) values 
(1,'Silla','',15.00,1,'2016-11-01 22:26:22','2016-11-08 22:54:48'),
(2,'Mesa',NULL,20.00,1,'2016-11-01 22:26:55',NULL),
(3,'Barra libre','',3500.00,1,'2016-11-08 22:56:00',NULL),
(4,'Salon terraza','',6000.00,1,'2016-11-08 22:56:24',NULL);

UNLOCK TABLES;

/*Table structure for table `cita_estado` */

DROP TABLE IF EXISTS `cita_estado`;

CREATE TABLE `cita_estado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `cita_estado` */

LOCK TABLES `cita_estado` WRITE;

insert  into `cita_estado`(`id`,`nombre`) values 
(1,'Pendiente'),
(2,'Pospuesta'),
(3,'Cancelada');

UNLOCK TABLES;

/*Table structure for table `citas` */

DROP TABLE IF EXISTS `citas`;

CREATE TABLE `citas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL DEFAULT '0',
  `comentario` text,
  `fecha_hora` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_evento_comentario_vendedores1_idx` (`usuario_id`),
  KEY `fk_comentarios_clientes1_idx` (`cliente_id`),
  CONSTRAINT `fk_evento_comentario_vendedores10` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;

/*Data for the table `citas` */

LOCK TABLES `citas` WRITE;

insert  into `citas`(`id`,`usuario_id`,`cliente_id`,`comentario`,`fecha_hora`,`status`,`created_at`,`updated_at`) values 
(28,2,14,'','2016-11-26 17:00:00',1,'2016-11-26 04:29:45',NULL),
(29,2,4,'','2016-12-01 20:00:00',1,'2016-11-26 04:37:36',NULL),
(30,2,5,'','2016-12-02 19:00:00',1,'2016-11-26 04:44:19',NULL),
(31,2,15,'visitare a las 10am ','2016-11-28 10:00:00',1,'2016-11-28 01:17:02',NULL),
(32,2,16,'visitare para cotizar posada','2016-11-28 11:30:00',1,'2016-11-28 01:22:15',NULL),
(33,2,17,'visitare para cierre de contrato para posada','2016-11-28 12:30:00',1,'2016-11-28 01:29:09',NULL),
(34,2,8,'visitare para la entrega de contrato y definir detalles del evento','2016-11-28 09:00:00',1,'2016-11-28 01:30:40',NULL),
(36,2,22,'','2016-11-30 09:30:00',1,'2016-11-30 00:32:45',NULL),
(37,2,20,'','2016-11-30 11:00:00',1,'2016-11-30 00:48:39',NULL),
(38,2,21,'visita para mostrar los pqtes','2016-11-30 12:00:00',1,'2016-11-30 00:52:57',NULL),
(39,2,24,'definicion de detalles para el evento','2016-12-01 19:00:00',1,'2016-11-30 00:58:15',NULL),
(40,2,23,'informacion de paquetes para posada','2016-12-01 09:30:00',1,'2016-11-30 00:59:17',NULL),
(41,2,39,'visitare para cerrar contrato para una boda','2016-12-13 10:00:00',1,'2016-12-12 01:56:52',NULL),
(42,2,40,'cerrar contrato para posada','2016-12-27 11:30:00',1,'2016-12-12 01:57:38',NULL),
(43,2,41,'pasare a dar informacion para evento de graduacion reservacion tentativa','2016-12-27 13:00:00',1,'2016-12-12 01:58:36',NULL),
(44,2,39,'','2016-12-27 10:00:00',1,'2016-12-12 01:59:27',NULL),
(45,2,40,'visita para cerrar contrato para posada','2016-12-13 11:30:00',1,'2016-12-12 02:00:56',NULL),
(46,2,41,'pasare a dar informacion para graduacion reservacion tentativa','2016-12-13 13:00:00',1,'2016-12-12 02:02:02',NULL),
(47,2,38,'visita para dar informacion para posible posada','2016-12-14 09:30:00',1,'2016-12-12 02:02:57',NULL),
(48,2,37,'visita para ver si quedo convencido de los paquetes que le envie y cerrar contrato para su posada','2016-12-14 11:00:00',1,'2016-12-12 02:05:19',NULL),
(49,2,32,'cerrar contrato para cumpleaños ','2016-12-14 12:30:00',1,'2016-12-12 02:06:54',NULL),
(50,2,8,'evento en rest cocos beach','2016-12-15 20:00:00',1,'2016-12-12 02:09:05',NULL),
(51,2,36,'cerrar contrato para posada ','2016-12-16 10:30:00',1,'2016-12-12 02:10:58',NULL),
(52,2,9,'evento','2016-12-17 21:00:00',1,'2016-12-12 02:13:36',NULL);

UNLOCK TABLES;

/*Table structure for table `cliente_tipos` */

DROP TABLE IF EXISTS `cliente_tipos`;

CREATE TABLE `cliente_tipos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `cliente_tipos` */

LOCK TABLES `cliente_tipos` WRITE;

insert  into `cliente_tipos`(`id`,`nombre`) values 
(1,'Empresa o institución'),
(2,'Particular');

UNLOCK TABLES;

/*Table structure for table `clientes` */

DROP TABLE IF EXISTS `clientes`;

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente_tipo_id` int(11) NOT NULL,
  `nombre` varchar(256) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `rfc` varchar(45) DEFAULT NULL,
  `curp` varchar(45) DEFAULT NULL,
  `calle` varchar(64) DEFAULT NULL,
  `no_interior` varchar(16) DEFAULT NULL,
  `no_exterior` varchar(16) DEFAULT NULL,
  `cp` varchar(16) DEFAULT NULL,
  `ciudad` varchar(128) DEFAULT NULL,
  `estado_id` int(11) DEFAULT NULL,
  `pais_id` int(11) DEFAULT NULL,
  `estado` varchar(64) DEFAULT NULL,
  `nombre_contacto` varchar(256) DEFAULT NULL,
  `puesto_contacto` varchar(256) DEFAULT NULL,
  `correo` varchar(128) DEFAULT NULL,
  `lada` varchar(8) DEFAULT NULL,
  `telefono` varchar(32) DEFAULT NULL,
  `lada_celular` varchar(8) DEFAULT NULL,
  `celular` varchar(32) DEFAULT NULL,
  `correo_secundario` varchar(256) DEFAULT NULL,
  `telefono_secundario` varchar(32) DEFAULT NULL,
  `lada_tel_s` varchar(8) DEFAULT NULL,
  `celular_secundario` varchar(32) DEFAULT NULL,
  `lada_cel_s` varchar(8) DEFAULT NULL,
  `limite_credito` decimal(10,2) DEFAULT '0.00',
  `plazo` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0.Inactivo,1.Prospecto,2.Cliente',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_clientes_cliente_tipo1_idx` (`cliente_tipo_id`),
  CONSTRAINT `fk_clientes_cliente_tipo1` FOREIGN KEY (`cliente_tipo_id`) REFERENCES `cliente_tipos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `clientes` */

LOCK TABLES `clientes` WRITE;

insert  into `clientes`(`id`,`cliente_tipo_id`,`nombre`,`fecha_nacimiento`,`rfc`,`curp`,`calle`,`no_interior`,`no_exterior`,`cp`,`ciudad`,`estado_id`,`pais_id`,`estado`,`nombre_contacto`,`puesto_contacto`,`correo`,`lada`,`telefono`,`lada_celular`,`celular`,`correo_secundario`,`telefono_secundario`,`lada_tel_s`,`celular_secundario`,`lada_cel_s`,`limite_credito`,`plazo`,`status`,`created_at`,`updated_at`) values 
(9,1,'yakult sa de cv','0000-00-00','','','av division del norte 1419 ','','','03310','mexico',15,1,'','ekmen','gerente','yakult.vfor.mazatlan@prodigy.net.mx','','','','6692187265','','',NULL,'',NULL,0.00,0,1,'2016-11-26 04:17:17',NULL);

UNLOCK TABLES;

/*Table structure for table `comentarios` */

DROP TABLE IF EXISTS `comentarios`;

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` int(11) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL DEFAULT '0',
  `evento_id` int(11) NOT NULL DEFAULT '0',
  `comentario` text,
  `fecha_hora` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_evento_comentario_eventos1_idx` (`evento_id`),
  KEY `fk_evento_comentario_vendedores1_idx` (`usuario_id`),
  KEY `fk_comentarios_clientes1_idx` (`cliente_id`),
  CONSTRAINT `fk_evento_comentario_vendedores1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

/*Data for the table `comentarios` */

LOCK TABLES `comentarios` WRITE;

insert  into `comentarios`(`id`,`tipo`,`usuario_id`,`cliente_id`,`evento_id`,`comentario`,`fecha_hora`,`status`,`created_at`,`updated_at`) values 
(35,1,1,1,0,'Nuevo','2016-11-08 05:44:37',1,'2016-11-08 05:44:37',NULL),
(36,2,1,0,8,'Existen dudas por parte del cliente','2016-11-08 05:45:10',1,'2016-11-08 05:45:10',NULL),
(37,2,1,0,10,'<b>Evento apartado</b>','2016-11-14 03:14:16',1,'2016-11-14 03:14:16',NULL);

UNLOCK TABLES;

/*Table structure for table `empleados` */

DROP TABLE IF EXISTS `empleados`;

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) DEFAULT NULL,
  `clave` varchar(4) DEFAULT '',
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `empleados` */

LOCK TABLES `empleados` WRITE;

insert  into `empleados`(`id`,`nombre`,`clave`,`status`) values 
(1,'empleado 1','',1);

UNLOCK TABLES;

/*Table structure for table `estados` */

DROP TABLE IF EXISTS `estados`;

CREATE TABLE `estados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

/*Data for the table `estados` */

LOCK TABLES `estados` WRITE;

insert  into `estados`(`id`,`nombre`) values 
(1,'Aguascalientes'),
(2,'Baja California'),
(3,'Baja California Sur'),
(4,'Campeche'),
(5,'Coahuila de Zaragoza'),
(6,'Colima'),
(7,'Chiapas'),
(8,'Chihuahua'),
(9,'Distrito Federal'),
(10,'Durango'),
(11,'Guanajuato'),
(12,'Guerrero'),
(13,'Hidalgo'),
(14,'Jalisco'),
(15,'México'),
(16,'Michoacán de Ocampo'),
(17,'Morelos'),
(18,'Nayarit'),
(19,'Nuevo León'),
(20,'Oaxaca'),
(21,'Puebla'),
(22,'Querétaro'),
(23,'Quintana Roo'),
(24,'San Luis Potosí'),
(25,'Sinaloa'),
(26,'Sonora'),
(27,'Tabasco'),
(28,'Tamaulipas'),
(29,'Tlaxcala'),
(30,'Veracruz'),
(31,'Yucatán'),
(32,'Zacatecas');

UNLOCK TABLES;

/*Table structure for table `evento_detalle` */

DROP TABLE IF EXISTS `evento_detalle`;

CREATE TABLE `evento_detalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `evento_id` int(11) NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `cargo` int(11) DEFAULT NULL COMMENT '0.Extras, 1.Producto menu',
  `promocion` int(1) DEFAULT '0' COMMENT '0.Normal, 1.Promocion',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cotizaciones_eventos1_idx` (`evento_id`),
  CONSTRAINT `fk_cotizaciones_eventos1` FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `evento_detalle` */

LOCK TABLES `evento_detalle` WRITE;

UNLOCK TABLES;

/*Table structure for table `evento_estado` */

DROP TABLE IF EXISTS `evento_estado`;

CREATE TABLE `evento_estado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(32) DEFAULT NULL,
  `color` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `evento_estado` */

LOCK TABLES `evento_estado` WRITE;

insert  into `evento_estado`(`id`,`nombre`,`color`) values 
(1,'Abierto','#B2BABB'),
(2,'Apartado','#3498DB'),
(3,'Cerrado','#2ECC71'),
(4,'Cancelado',NULL);

UNLOCK TABLES;

/*Table structure for table `eventos` */

DROP TABLE IF EXISTS `eventos`;

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `salon_id` int(11) DEFAULT NULL,
  `promocion_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `facturar` tinyint(1) DEFAULT '0',
  `nombre` varchar(256) DEFAULT NULL,
  `invitados` int(11) DEFAULT NULL,
  `platillos` int(11) DEFAULT NULL,
  `bebidas` int(11) DEFAULT NULL,
  `mesas` int(11) DEFAULT NULL,
  `sillas` int(11) DEFAULT NULL,
  `descripcion` text,
  `fecha_hora` datetime DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `importe` decimal(10,2) DEFAULT '0.00',
  `anticipo` decimal(10,2) DEFAULT '0.00',
  `saldo` decimal(10,2) DEFAULT '0.00',
  `folio` int(11) DEFAULT NULL,
  `comision` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_eventos_clientes_idx` (`cliente_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `salon_id` (`salon_id`),
  CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `eventos_ibfk_2` FOREIGN KEY (`salon_id`) REFERENCES `salones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `eventos` */

LOCK TABLES `eventos` WRITE;

UNLOCK TABLES;

/*Table structure for table `fecha_operacion` */

DROP TABLE IF EXISTS `fecha_operacion`;

CREATE TABLE `fecha_operacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `fecha_operacion` */

LOCK TABLES `fecha_operacion` WRITE;

insert  into `fecha_operacion`(`id`,`fecha`) values 
(1,'2016-11-21');

UNLOCK TABLES;

/*Table structure for table `formas_pago` */

DROP TABLE IF EXISTS `formas_pago`;

CREATE TABLE `formas_pago` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `formas_pago` */

LOCK TABLES `formas_pago` WRITE;

insert  into `formas_pago`(`id`,`nombre`) values 
(1,'Efectivo'),
(2,'Tarjeta'),
(3,'Cheque'),
(4,'Transferencia');

UNLOCK TABLES;

/*Table structure for table `horario_detalle` */

DROP TABLE IF EXISTS `horario_detalle`;

CREATE TABLE `horario_detalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `horario_id` int(11) DEFAULT NULL,
  `dia_id` int(11) DEFAULT NULL,
  `indice_entrada` int(11) DEFAULT '1',
  `entrada` time DEFAULT NULL,
  `duracion` time DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `horario_detalle` */

LOCK TABLES `horario_detalle` WRITE;

insert  into `horario_detalle`(`id`,`horario_id`,`dia_id`,`indice_entrada`,`entrada`,`duracion`,`status`) values 
(1,1,4,1,'08:00:00','05:00:00',2),
(2,1,4,2,'14:00:00','03:00:00',2);

UNLOCK TABLES;

/*Table structure for table `horarios` */

DROP TABLE IF EXISTS `horarios`;

CREATE TABLE `horarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empleado_id` int(11) DEFAULT NULL,
  `tipo_id` int(11) DEFAULT '0',
  `desde` date DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `horarios` */

LOCK TABLES `horarios` WRITE;

UNLOCK TABLES;

/*Table structure for table `pagos` */

DROP TABLE IF EXISTS `pagos`;

CREATE TABLE `pagos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `forma_pago_id` int(11) DEFAULT NULL,
  `evento_id` int(11) DEFAULT NULL,
  `cantidad` decimal(10,2) DEFAULT '0.00',
  `comentario` text,
  `fecha` date DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `pagos` */

LOCK TABLES `pagos` WRITE;

UNLOCK TABLES;

/*Table structure for table `paises` */

DROP TABLE IF EXISTS `paises`;

CREATE TABLE `paises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(32) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `paises` */

LOCK TABLES `paises` WRITE;

insert  into `paises`(`id`,`nombre`,`status`,`create_at`,`updated_at`) values 
(1,'México',1,'2016-11-13 18:37:38',NULL),
(2,'Canadá',1,'2016-11-13 18:37:42',NULL),
(3,'Estados Unidos',1,'2016-11-13 18:37:45',NULL);

UNLOCK TABLES;

/*Table structure for table `productos` */

DROP TABLE IF EXISTS `productos`;

CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(256) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=329 DEFAULT CHARSET=utf8;

/*Data for the table `productos` */

LOCK TABLES `productos` WRITE;

insert  into `productos`(`id`,`nombre`,`precio`) values 
(328,'CORONA LIGHT',40.00);

UNLOCK TABLES;

/*Table structure for table `productos_cargos` */

DROP TABLE IF EXISTS `productos_cargos`;

CREATE TABLE `productos_cargos` (
  `clave` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `producto` varchar(256) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `tipo` varchar(8) DEFAULT NULL,
  `tipo_c` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `productos_cargos` */

LOCK TABLES `productos_cargos` WRITE;

UNLOCK TABLES;

/*Table structure for table `promocion_detalle` */

DROP TABLE IF EXISTS `promocion_detalle`;

CREATE TABLE `promocion_detalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `promocion_id` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `cargo` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `promocion_id` (`promocion_id`),
  CONSTRAINT `promocion_detalle_ibfk_1` FOREIGN KEY (`promocion_id`) REFERENCES `promociones` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `promocion_detalle` */

LOCK TABLES `promocion_detalle` WRITE;

insert  into `promocion_detalle`(`id`,`promocion_id`,`producto_id`,`cantidad`,`precio`,`cargo`,`status`) values 
(2,2,3037,1,50.00,1,1);

UNLOCK TABLES;

/*Table structure for table `promociones` */

DROP TABLE IF EXISTS `promociones`;

CREATE TABLE `promociones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) DEFAULT NULL,
  `nombre` varchar(128) DEFAULT NULL,
  `descripcion` text,
  `precio` decimal(10,2) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `promociones` */

LOCK TABLES `promociones` WRITE;

insert  into `promociones`(`id`,`usuario_id`,`nombre`,`descripcion`,`precio`,`status`,`fecha_inicio`,`fecha_fin`,`created_at`,`updated_at`) values 
(2,1,'Evento básico (40 personas)','',0.00,1,'0000-00-00','0000-00-00','2016-11-05 12:57:59','2016-11-25 04:17:39');

UNLOCK TABLES;

/*Table structure for table `registros` */

DROP TABLE IF EXISTS `registros`;

CREATE TABLE `registros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empleado_id` int(11) DEFAULT NULL,
  `evento_id` tinyint(1) DEFAULT '1' COMMENT '0.Entrada x.Salida y vincula a la entrada',
  `entrada_id` int(11) DEFAULT '0',
  `horario_detalle_id` int(11) DEFAULT NULL,
  `indice_entrada` int(11) DEFAULT NULL,
  `fecha_hora` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0' COMMENT '0.Local 1.Server',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `registros` */

LOCK TABLES `registros` WRITE;

insert  into `registros`(`id`,`empleado_id`,`evento_id`,`entrada_id`,`horario_detalle_id`,`indice_entrada`,`fecha_hora`,`status`) values 
(1,1,1,0,0,1,'2016-12-30 13:47:00',1),
(2,1,1,1,1,1,'2016-12-30 13:53:00',1),
(3,1,1,0,0,2,'2016-12-30 13:53:00',1),
(4,1,1,3,3,2,'2016-12-30 15:11:00',1),
(5,1,1,0,0,0,'2016-12-30 15:36:00',1),
(6,1,1,5,5,0,'2016-12-30 15:53:00',1);

UNLOCK TABLES;

/*Table structure for table `registros_dia` */

DROP TABLE IF EXISTS `registros_dia`;

CREATE TABLE `registros_dia` (
  `evento` varchar(7) DEFAULT NULL,
  `nombre` varchar(128) DEFAULT NULL,
  `hora` varchar(11) DEFAULT NULL,
  `retardo` varchar(13) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `registros_dia` */

LOCK TABLES `registros_dia` WRITE;

UNLOCK TABLES;

/*Table structure for table `rpt_checado` */

DROP TABLE IF EXISTS `rpt_checado`;

CREATE TABLE `rpt_checado` (
  `empleado_id` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hd_id` int(11) DEFAULT NULL,
  `nombre` varchar(128) DEFAULT NULL,
  `entrada` varchar(11) DEFAULT NULL,
  `salida` varchar(11) DEFAULT NULL,
  `retardo` varchar(13) DEFAULT NULL,
  `tiempo` varchar(13) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `rpt_checado` */

LOCK TABLES `rpt_checado` WRITE;

UNLOCK TABLES;

/*Table structure for table `salones` */

DROP TABLE IF EXISTS `salones`;

CREATE TABLE `salones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(64) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `salones` */

LOCK TABLES `salones` WRITE;

insert  into `salones`(`id`,`nombre`,`status`,`created_at`,`updated_at`) values 
(1,'Terraza',1,'2016-11-03 00:27:14',NULL),
(2,'Palapa',1,'2016-11-05 12:23:25',NULL),
(3,'Restaurant',1,'2016-11-05 12:23:28',NULL),
(4,'Estacionamiento',1,'2016-11-28 17:20:42',NULL),
(5,'Playa',1,'2016-11-30 10:21:05',NULL);

UNLOCK TABLES;

/*Table structure for table `telefono_tipo` */

DROP TABLE IF EXISTS `telefono_tipo`;

CREATE TABLE `telefono_tipo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `telefono_tipo` */

LOCK TABLES `telefono_tipo` WRITE;

insert  into `telefono_tipo`(`id`,`nombre`) values 
(1,'Fijo'),
(2,'Móvil'),
(3,'Oficina'),
(4,'Otro');

UNLOCK TABLES;

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(256) DEFAULT NULL,
  `usuario` varchar(32) DEFAULT NULL,
  `contrasena` varchar(32) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '1',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `usuarios` */

LOCK TABLES `usuarios` WRITE;

insert  into `usuarios`(`id`,`nombre`,`usuario`,`contrasena`,`admin`,`status`,`created_at`,`updated_at`) values 
(1,'Administrador','admin','999',1,1,'2016-10-30 13:08:03',NULL),
(2,'gerente','gerente','999',0,1,'2016-10-31 19:30:29',NULL);

UNLOCK TABLES;

/* Trigger structure for table `evento_detalle` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `ins_evento_detalle` */$$

/*!50003 CREATE */ /*!50003 TRIGGER `ins_evento_detalle` AFTER INSERT ON `evento_detalle` FOR EACH ROW BEGIN
	DECLARE _total DECIMAL(10,2);
	DECLARE _pago DECIMAL(10,2);
	SELECT SUM(cantidad * precio) INTO _total FROM evento_detalle WHERE evento_detalle.evento_id = NEW.evento_id AND evento_detalle.status = 1; 
	SELECT SUM(cantidad) INTO _pago FROM pagos WHERE pagos.evento_id = NEW.evento_id AND pagos.status = 1; 
	UPDATE eventos SET importe = _total , saldo = (_total - _pago) WHERE id = NEW.evento_id;
    END */$$


DELIMITER ;

/* Trigger structure for table `evento_detalle` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `upd_evento_detalle` */$$

/*!50003 CREATE */ /*!50003 TRIGGER `upd_evento_detalle` AFTER UPDATE ON `evento_detalle` FOR EACH ROW BEGIN
	DECLARE _total DECIMAL(10,2);
	DECLARE _pago DECIMAL(10,2);
	SELECT SUM(cantidad * precio) INTO _total FROM evento_detalle WHERE evento_detalle.evento_id = NEW.evento_id AND evento_detalle.status = 1; 
	SELECT SUM(cantidad) INTO _pago FROM pagos WHERE pagos.evento_id = NEW.evento_id AND pagos.status = 1; 
	UPDATE eventos SET importe = _total , saldo = (_total - _pago) WHERE id = NEW.evento_id;
    END */$$


DELIMITER ;

/* Trigger structure for table `eventos` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `upd_evento` */$$

/*!50003 CREATE */ /*!50003 TRIGGER `upd_evento` BEFORE UPDATE ON `eventos` FOR EACH ROW BEGIN
	DECLARE _folio INT;
	declare _total decimal(10,2);
	IF NEW.facturar = 1 THEN
		SELECT COUNT(*) INTO _folio FROM eventos WHERE eventos.status > 1 AND eventos.facturar = 1;
	ELSE
		SELECT COUNT(*) INTO _folio FROM eventos WHERE eventos.status > 1 AND eventos.facturar = 0;
	END IF;	
	IF OLD.status != NEW.status AND NEW.status = 2 AND OLD.status = 1 THEN
		SET NEW.folio = _folio + 1;
	END IF;
	SELECT SUM(cantidad) into _total FROM pagos WHERE evento_id = NEW.id AND pagos.status = 1;
	set _total = IF(_total IS NULL,0.00,_total);
	set NEW.saldo = NEW.importe - _total;
    END */$$


DELIMITER ;

/* Trigger structure for table `pagos` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `nuevo_pago` */$$

/*!50003 CREATE */ /*!50003 TRIGGER `nuevo_pago` AFTER INSERT ON `pagos` FOR EACH ROW BEGIN
	declare _abonado decimal;
	if NEW.status = 1 then
		SELECT SUM(cantidad) INTO _abonado
		FROM pagos
		WHERE STATUS = 1 AND evento_id = NEW.evento_id;
		SET _abonado = IF(_abonado IS NULL,0.00,_abonado);
		
		UPDATE eventos 
		SET saldo = (importe - _abonado), 
		anticipo = _abonado	
		WHERE id = NEW.evento_id;
	end if;
    END */$$


DELIMITER ;

/* Function  structure for function  `date_diff` */

/*!50003 DROP FUNCTION IF EXISTS `date_diff` */;
DELIMITER $$

/*!50003 CREATE FUNCTION `date_diff`(date1 DATE, date2 DATE) RETURNS int(11)
BEGIN
	return ABS(DATEDIFF(date2, date1)) + 1
     - ABS(DATEDIFF(ADDDATE(date2, INTERVAL 1 - DAYOFWEEK(date2) DAY),
                    ADDDATE(date1, INTERVAL 1 - DAYOFWEEK(date1) DAY))) / 7
     - (DAYOFWEEK(IF(date1 < date2, date1, date2)) = 1)
     - (DAYOFWEEK(IF(date1 > date2, date1, date2)) = 7);
    END */$$
DELIMITER ;

/* Function  structure for function  `fecha_cadena` */

/*!50003 DROP FUNCTION IF EXISTS `fecha_cadena` */;
DELIMITER $$

/*!50003 CREATE FUNCTION `fecha_cadena`(v_fecha DATETIME) RETURNS text CHARSET latin1
BEGIN	
	DECLARE mi_mes INT;
	DECLARE mi_fecha TEXT;	
	DECLARE mi_dia INT;
	SET mi_dia = WEEKDAY(DATE(v_fecha));
	SET mi_mes = MONTH(v_fecha);	
	SET mi_fecha = CONCAT(	
	IF(mi_dia=0,"Lunes",
		IF(mi_dia=1,"Martes",
			IF(mi_dia=2,"Miercoles",
				IF(mi_dia=3,"Jueves",
					IF(mi_dia=4,"Viernes",
						IF(mi_dia=5,"Sabado","Domingo")
					)
				)
			)
		)
	)	
	,', ',DAY(v_fecha),' de ',
	IF(mi_mes=1,"Enero",
		IF(mi_mes=2,"Febrero",
			IF(mi_mes=3,"Marzo",
				IF(mi_mes=4,"Abril",
					IF(mi_mes=5,"Mayo",
						IF(mi_mes=6,"Junio",
							IF(mi_mes=7,"Julio",
								IF(mi_mes=8,"Agosto",
									IF(mi_mes=9,"Septiembre",
										IF(mi_mes=10,"Octubre",
											IF(mi_mes=11,"Noviembre",
											"Diciembre"
											)
										)
									)
								)
							)
						)
					)
				)
			)
		)
	),
	" de ",YEAR(v_fecha)
	," a las ",
	TIME(v_fecha),' hrs'
	);		
	RETURN mi_fecha;
	# Jueves, 23 de enero de 2014
    END */$$
DELIMITER ;

/* Function  structure for function  `fn_disponible` */

/*!50003 DROP FUNCTION IF EXISTS `fn_disponible` */;
DELIMITER $$

/*!50003 CREATE FUNCTION `fn_disponible`(_id int,_salon_id int,_datetime datetime) RETURNS int(11)
BEGIN
	declare _apartados int;
	DECLARE _tentativos INT;
	SELECT 
	sum(if(eventos.status = 1,1,0)),
	SUM(IF(eventos.status > 1 and eventos.status != 4,1,0)) INTO _tentativos,_apartados
	FROM eventos
	WHERE salon_id = _salon_id 
	and eventos.id != _id	
	AND (_datetime BETWEEN fecha_hora AND DATE_ADD(fecha_hora,INTERVAL duracion HOUR));
	return IF(_apartados > 0,2,IF(_tentativos > 0,1,0));
    END */$$
DELIMITER ;

/* Function  structure for function  `fn_saldo_cliente` */

/*!50003 DROP FUNCTION IF EXISTS `fn_saldo_cliente` */;
DELIMITER $$

/*!50003 CREATE FUNCTION `fn_saldo_cliente`(_id int) RETURNS decimal(10,2)
BEGIN
	declare _saldo decimal(10,2);
	select sum(eventos.saldo) into _saldo 
	from eventos
	where cliente_id = _id;
	return if(_saldo is null,0.00,_saldo);
    END */$$
DELIMITER ;

/*Table structure for table `rpt_checado_p` */

DROP TABLE IF EXISTS `rpt_checado_p`;

/*!50001 DROP VIEW IF EXISTS `rpt_checado_p` */;
/*!50001 DROP TABLE IF EXISTS `rpt_checado_p` */;

/*!50001 CREATE TABLE  `rpt_checado_p`(
 `empleado_id` int(11) ,
 `fecha` text ,
 `horario_detalle_id` int(11) ,
 `nombre` varchar(128) ,
 `fecha_indice` varchar(23) ,
 `entrada` text ,
 `salida` text 
)*/;

/*View structure for view rpt_checado_p */

/*!50001 DROP TABLE IF EXISTS `rpt_checado_p` */;
/*!50001 DROP VIEW IF EXISTS `rpt_checado_p` */;

/*!50001 CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `rpt_checado_p` AS (select `registros`.`empleado_id` AS `empleado_id`,group_concat(if((`registros`.`evento_id` = 1),cast(`registros`.`fecha_hora` as date),'') separator '') AS `fecha`,`registros`.`horario_detalle_id` AS `horario_detalle_id`,`empleados`.`nombre` AS `nombre`,concat(if((`registros`.`evento_id` = 1),`registros`.`id`,`registros`.`entrada_id`),'_',`registros`.`indice_entrada`) AS `fecha_indice`,group_concat(if((`registros`.`evento_id` = 1),`registros`.`fecha_hora`,'') separator '') AS `entrada`,group_concat(if((`registros`.`evento_id` = 2),`registros`.`fecha_hora`,'') separator '') AS `salida` from (`registros` join `empleados` on((`empleados`.`id` = `registros`.`empleado_id`))) group by concat(if((`registros`.`evento_id` = 1),`registros`.`id`,`registros`.`entrada_id`),'_',`registros`.`indice_entrada`)) */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
