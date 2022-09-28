-- MySQL dump 10.12
--
-- Host: localhost    Database: haechi
-- ------------------------------------------------------
-- Server version	6.0.0-alpha-community-nt-debug

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
-- Table structure for table `contracts`
--

DROP TABLE IF EXISTS `contracts`;
CREATE TABLE `contracts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` mediumtext,
  `ip` varchar(64) DEFAULT NULL,
  `createdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contracts`
--

LOCK TABLES `contracts` WRITE;
/*!40000 ALTER TABLE `contracts` DISABLE KEYS */;
INSERT INTO `contracts` VALUES (1,'pragma solidity^0.4.25;\ncontract TxUserWallet \n{    \n    address owner;    \n    function TxUserWallet() public { \n        owner = msg.sender;    \n    }    \n    function transferTo(address dest, uint amount) public {\n        require(tx.origin == owner);\n        dest.transfer(amount);   \n    }\n}\n					','0:0:0:0:0:0:0:1','2021-12-23 04:50:25');
/*!40000 ALTER TABLE `contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issues`
--

DROP TABLE IF EXISTS `issues`;
CREATE TABLE `issues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contractid` int(11) NOT NULL,
  `vulnerabilityid` int(11) NOT NULL,
  `line` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `issues`
--

LOCK TABLES `issues` WRITE;
/*!40000 ALTER TABLE `issues` DISABLE KEYS */;
INSERT INTO `issues` VALUES (1,1,7,9);
/*!40000 ALTER TABLE `issues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) DEFAULT NULL,
  `content` varchar(256) DEFAULT NULL,
  `date` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'Release 0.1','HAECHI is now open source','02.03.2019'),(2,'Release 0.2','Added experimental rules','17.03.2019'),(3,'Release 0.3','Added a new rule : TransferEther','11.04.2019'),(4,'Release 0.4','Added a new rule : Reentrancy','16.05.2019'),(5,'Release 0.5','Added a new rule : MultipleInheritance','01.09.2019'),(6,'Release 0.6','Launched HAECHI Web Service','26.10.2019'),(7,'Release 0.7','Updated the web service','22.12.2021');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vulnerability`
--

DROP TABLE IF EXISTS `vulnerability`;
CREATE TABLE `vulnerability` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) DEFAULT NULL,
  `comment` varchar(256) DEFAULT NULL,
  `content` varchar(256) DEFAULT NULL,
  `recommendation` varchar(256) DEFAULT NULL,
  `example` text,
  `links` varchar(64) DEFAULT NULL,
  `href` varchar(256) DEFAULT NULL,
  `implement` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vulnerability`
--

LOCK TABLES `vulnerability` WRITE;
/*!40000 ALTER TABLE `vulnerability` DISABLE KEYS */;
INSERT INTO `vulnerability` VALUES (1,'DoSAttack','The exception is to protect the data caused by bad transactions. However, an attacker could use an exception code to prevent the contract from doing this.','Potential vulnerability to DoS attack','This can be prevented by separating the vulnerable parts of DoS attack into separate transactions.','contract TestLoop {\r\n    address owner = msg.sender;\r\n    uint i = 5;\r\n\r\n    function testWhile(uint amount) public{\r\n        while(i > 0) {\r\n            require(tx.origin == owner);\r\n            msg.sender.transfer(amount);\r\n            i--;\r\n        }\r\n    }\r\n}','Known Attacks : DoS with revert','http://consensys.github.io/smart-contract-best-practices/known_attacks/#dos-with-unexpected-revert',1),(2,'None Access Modifier','Solidity defaults to the internal accessor of the contract\'s internal variables, and the function to public.','Please specify Access Modifier explicitly','When writing solidity code, the access specifier must be explicitly stated.','contact WalletLibrary {\r\n\r\n    function initWallet(address[] owners, uint required, uint daylimit) {\r\n        //\r\n    }\r\n\r\n    function initMultiowned(address[] owners, uint required) {\r\n        //\r\n    }\r\n}','Restricting Access','http://solidity.readthedocs.io/en/v0.4.24/common-patterns.html#restricting-access',1),(3,'Overflow','Overflow is a flaw that causes errors or program security vulnerabilities when a process enters data that exceeds the maximum size when storing data.','Note the operation of integer variables','Check the boundary before using the data to eliminate the possibility of defects.','contract Overflow {\r\n    uint public max = 2**256 - 1;\r\n\r\n    function incerement() public {\r\n        max += 1;\r\n    }\r\n}','Integer Overflow and Underflow ','http://consensys.github.io/smart-contract-best-practices/known_attacks/#integer-overflow-and-underflow',0),(4,'Underflow','Underflow is a flaw that causes errors or program security vulnerabilities when a process enters data that exceeds the maximum size when storing data.','Note the operation of integer variables','Check the boundary before using the data to eliminate the possibility of defects.','contract Underflow {\r\n    uint public zero = 0;\r\n\r\n    function decrement() public {\r\n        zero -= 1;\r\n    }\r\n}','Integer Overflow and Underflow','http://consensys.github.io/smart-contract-best-practices/known_attacks/#integer-overflow-and-underflow',0),(5,'Reentrancy','When the user manages the Ether balance remitted to the contract by user, a problem may occur if the balance is withdrawn using a function.','Potential vulnerability to Reentrancy attack','Use \'mutex\' to disable reentry.','contract Mallory {\r\n    SimpleDAO dao;\r\n    mapping (address => uint) userBalance;\r\n\r\n    function func() public {\r\n        dao.withdraw();\r\n    }\r\n    function() external { \r\n        dao.withdraw();\r\n    }\r\n    function testFunc() public {\r\n        dao.withdraw();\r\n        func();\r\n    }\r\n    function notitle() public {\r\n        dao.withdraw();\r\n    }\r\n    function getBalance(address u) public view returns(uint){\r\n        return userBalance[u];\r\n    }\r\n}\r\n\r\ncontract SimpleDAO {\r\n    Mallory mallory;\r\n    mapping (address => uint) public credit;\r\n\r\n    function withdraw() public {\r\n        Mallory mal;\r\n        address adrr;\r\n        mallory.testFunc(); \r\n        mal.func();\r\n        adrr = tx.origin;\r\n    }\r\n}','Reentrancy','http://consensys.github.io/smart-contract-best-practices/known_attacks/#reentrancy',1),(6,'Transfer Ether','If the external calling code is written inside the function, you can use it without considering the characteristics of each function to make unexpected external calling.','Incorrect function usage in Ether transmission, Use transfer() instead','Using address.transfer () to only handle Ether currently sent can prevent unexpected security risks.','contract SimpleDAO {\r\n  mapping (address => uint) public credit;\r\n    \r\n  function donate(address to) payable public{\r\n    credit[to] += msg.value;\r\n  }\r\n    \r\n  function withdraw(uint amount) public{\r\n    if (credit[msg.sender]>= amount) {\r\n      require(msg.sender.call.value(amount)());\r\n      credit[msg.sender]-=amount;\r\n    }\r\n  }  \r\n  \r\n}','SWC-107 : Reentranc','https://swcregistry.io/docs/SWC-107',1),(7,'Use tx.origin','tx.origin contains the value of the initial producer address of the transaction.','Potential vulnerability to tx.origin attack','Avoid using tx.origin and if you need to know the origin address, you can solve it by connecting the address you originally distributed the contract to as a parameter.','contract TxUserWallet {\r\n\r\n    address owner;\r\n\r\n    function TxUserWallet() public {\r\n        owner = msg.sender;\r\n    }\r\n\r\n    function transferTo(address dest, uint amount) public {\r\n        require(tx.origin == owner);\r\n        dest.transfer(amount);\r\n    }\r\n}','SWC-115 : Authorization through tx.origin','http://swcregistry.io/docs/SWC-115',1),(8,'Multiple Inheritance','Solidity handles the most recently inherited contract if ambiguity occurs in multiple inheritance relationships.','Do not write multiple inheritance','When using inheritance in Solidity, the compiler does not recognize it as an error, so avoid multiple inheritance to prevent unintended errors.','contract owned {\r\n    function owned() public {\r\n        owner = msg.sender;\r\n    }\r\n    address owner;\r\n}\r\n\r\ncontract mortal is owned {\r\n    function kill() public {\r\n        if (msg.sender == owner) {\r\n            selfdestruct(owner);\r\n        }\r\n    }\r\n}\r\n\r\ncontract Base1 is mortal {\r\n    function kill() public {\r\n        super.kill();\r\n    }\r\n}\r\n\r\ncontract Base2 is mortal {\r\n    function kill() public {\r\n        super.kill();\r\n    }\r\n}\r\n\r\ncontract Final is Base1, Base2 {\r\n    \r\n}','Multiple Inheritance and Linearization','https://solidity.readthedocs.io/en/v0.4.24/contracts.html#multiple-inheritance-and-linearization',1);
/*!40000 ALTER TABLE `vulnerability` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-23  4:53:09
