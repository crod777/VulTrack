

CREATE TABLE `vultrack`.`config` (
  `key` VARCHAR(45) NOT NULL,
  `value` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`key`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `vultrack`.`user` (
   `userId` int NOT NULL AUTO_INCREMENT,
   `userName` varchar(20) NOT NULL,
   `email` varchar(100) NOT NULL,
   `firstName` varchar(50) NOT NULL,
   `lastName` varchar(50) NOT NULL,
   `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `lastAccess` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `lastCollectionAccessedId` int NOT NULL DEFAULT '0',
   `accountStatus` varchar(25) NOT NULL DEFAULT 'PENDING',
   `officeOrg` VARCHAR(100) NULL DEFAULT 'UNKNOWN',
   `fullName` varchar(100) DEFAULT NULL,
   `defaultTheme` varchar(20) DEFAULT 'dark',
   `lastClaims` json DEFAULT ('{}'),
   `isAdmin` int NOT NULL DEFAULT '0',
   PRIMARY KEY (`userId`),
   UNIQUE KEY `email_UNIQUE` (`email`) USING BTREE,
   UNIQUE KEY `userName_UNIQUE` (`userName`)
 );

CREATE TABLE `vultrack`.`asset` (
  `assetId` INT NOT NULL AUTO_INCREMENT,
  `assetName` VARCHAR(255) NOT NULL,
  `fullyQualifiedDomainName` VARCHAR(255) DEFAULT NULL,
  `collectionId` INT NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `ipAddress` VARCHAR(50) DEFAULT NULL,
  `macAddress` VARCHAR(50) DEFAULT NULL,
  `nonComputing` TINYINT(1) DEFAULT '0',
  `assetOrigin` VARCHAR(15) NULL DEFAULT 'VUL-TRACK',
  PRIMARY KEY (`assetId`),
  UNIQUE KEY `assetId_UNIQUE` (`assetId`) /*!80000 INVISIBLE */,
  KEY `CollectionId` (`collectionId`)
);

CREATE TABLE `vultrack`.`poamassets` (
  `poamId` INT NOT NULL,
  `assetId` INT NOT NULL,
  PRIMARY KEY (`poamId`, `assetId`),
  KEY `poamAssetsAssetId` (`assetId`) /*!80000 INVISIBLE */,
  KEY `poamAssetPoamId` (`poamId`),
  CONSTRAINT `fk_poamassets_asset` FOREIGN KEY (`assetId`) REFERENCES `asset` (`assetId`) ON DELETE CASCADE
);
  
CREATE TABLE `vultrack`.`poamassignees` (
   `poamId` int NOT NULL,
   `userId` int NOT NULL,
   PRIMARY KEY (`poamId`,`userId`),
   KEY `poamAssigneesPoamId` (`poamId`) /*!80000 INVISIBLE */,
   KEY `poamAssigneesUserId` (`userId`)
 );
  
CREATE TABLE `vultrack`.`assetlabels` (
   `assetId` int NOT NULL,
   `collectionId` int NOT NULL,
   `labelId` int NOT NULL,
   PRIMARY KEY (`assetId`,`labelId`)
 );

 CREATE TABLE `vultrack`.`poamlabels` (
   `poamId` int NOT NULL,
   `labelId` int NOT NULL,
   PRIMARY KEY (`poamId`,`labelId`)
 );

  CREATE TABLE `vultrack`.`poamlogs` (
   `poamLogId` int NOT NULL AUTO_INCREMENT,
   `poamId` int NOT NULL,
   `userId` int NOT NULL,
   `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
   `action` varchar(2000) NOT NULL,
   PRIMARY KEY (`poamLogId`)
 );

CREATE TABLE `vultrack`.`label` (
   `labelId` int NOT NULL AUTO_INCREMENT,
   `collectionId` int NOT NULL,
   `description` varchar(255) DEFAULT NULL,
   `labelName` varchar(50) NOT NULL,
   `stigmanLabelId` varchar(36) DEFAULT NULL,
   PRIMARY KEY (`labelId`),
   UNIQUE KEY `unique_label_collection` (`labelName`, `collectionId`)
 );

 CREATE TABLE `vultrack`.`notification` (
  `notificationId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `read` TINYINT(1) DEFAULT 0,
  PRIMARY KEY (`notificationId`),
  KEY `userId` (`userId`)
);
  
CREATE TABLE `vultrack`.`collectionpermissions` (
   `userId` int NOT NULL,
   `collectionId` int NOT NULL,
   `accessLevel` int NOT NULL,
   PRIMARY KEY (`userId`,`collectionId`),
   KEY `userId` (`userId`),
   KEY `collectionId` (`collectionId`)
 );

CREATE TABLE `vultrack`.`poamapprovers` (
  `poamId` int NOT NULL,
  `userId` int NOT NULL,
  `approvalStatus` varchar(12) NOT NULL DEFAULT 'Not Reviewed',
  `approvedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `comments` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`poamId`,`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `vultrack`.`poammilestones` (
  `milestoneId` INT NOT NULL AUTO_INCREMENT,
  `poamId` int NOT NULL,
  `milestoneDate` date DEFAULT NULL,
  `milestoneComments` varchar(2000) DEFAULT '',
  `milestoneStatus` varchar(10) DEFAULT 'Pending',
  PRIMARY KEY (`milestoneId`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

  CREATE TABLE `vultrack`.`poamextensionmilestones` (
  `extensionMilestoneId` INT NOT NULL AUTO_INCREMENT,
  `poamId` int NOT NULL,
  `extensionMilestoneDate` date DEFAULT NULL,
  `extensionMilestoneComments` varchar(2000) DEFAULT '',
  `extensionMilestoneStatus` varchar(10) DEFAULT 'Pending',
  PRIMARY KEY (`extensionMilestoneId`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  
CREATE TABLE `vultrack`.`collection` (
  `collectionId` INT NOT NULL AUTO_INCREMENT,
  `collectionName` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `assetCount` INT DEFAULT '0',
  `poamCount` INT DEFAULT '0',
  `collectionOrigin` VARCHAR(15) NULL DEFAULT 'VUL-TRACK',
   PRIMARY KEY (`collectionId`));
  
CREATE TABLE `vultrack`.`poam` (
  `poamId` int NOT NULL AUTO_INCREMENT,
  `collectionId` int DEFAULT '0',
  `status` char(20) NOT NULL DEFAULT 'Draft',
  `rawSeverity` varchar(25) DEFAULT '',
  `adjSeverity` varchar(25) DEFAULT '',
  `vulnerabilitySource` varchar(255) DEFAULT '',
  `vulnerabilityId` varchar(255) DEFAULT '',
  `aaPackage` varchar(50) DEFAULT '',
  `submittedDate` DATE NULL DEFAULT NULL,
  `scheduledCompletionDate` DATE NULL DEFAULT NULL,
  `closedDate` DATE NULL DEFAULT NULL,
  `iavComplyByDate` date DEFAULT NULL,
  `stigTitle` VARCHAR(255) NULL DEFAULT NULL ,
  `stigBenchmarkId` VARCHAR(255) NULL DEFAULT NULL,
  `stigCheckData` TEXT NULL DEFAULT NULL,
  `iavmNumber` varchar(25) DEFAULT '',
  `description` varchar(2000) DEFAULT '',
  `mitigations` TEXT,
  `requiredResources` TEXT,
  `residualRisk` VARCHAR(25) NULL DEFAULT NULL,
  `notes` TEXT,
  `vulnIdRestricted` varchar(255) DEFAULT '',
  `securityControlNumber` varchar(25) DEFAULT '',
  `submitterId` int NOT NULL DEFAULT '0',
  `officeOrg` varchar(100) DEFAULT '',
  `predisposingConditions` varchar(2000) DEFAULT '',
  `severity` varchar(25) NOT NULL DEFAULT '',
  `relevanceOfThreat` varchar(15) NOT NULL DEFAULT '',
  `threatDescription` varchar(255) DEFAULT '',
  `likelihood` varchar(15) NOT NULL DEFAULT '',
  `businessImpactRating` varchar(15) DEFAULT '',
  `businessImpactDescription` varchar(2000) DEFAULT '',
  `extensionTimeAllowed` INT NULL DEFAULT '0',
  `extensionJustification` varchar(2000) DEFAULT '',
  `emassStatus` varchar(15) DEFAULT 'Ongoing',
  `emassPoamId` varchar(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`poamId`),
  UNIQUE KEY `poamID_UNIQUE` (`poamId`) /*!80000 INVISIBLE */,
  UNIQUE KEY `emassPoamId_UNIQUE` (`emassPoamId`) /*!80000 INVISIBLE */,
  KEY `collectionId` (`collectionId`) /*!80000 INVISIBLE */,
  KEY `submitterId` (`submitterId`) /*!80000 INVISIBLE */
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

  
DELIMITER $$

CREATE PROCEDURE daily_poam_status_update()
BEGIN
    UPDATE poam 
    SET status = 'Expired'
    WHERE
        status IN ('Submitted', 'Rejected') AND
        scheduledCompletionDate + INTERVAL extensionTimeAllowed DAY < CURDATE() AND
        poamId > 0;
END $$

CREATE EVENT poam_expiration_check
ON SCHEDULE EVERY 1 DAY 
STARTS DATE_ADD(CURDATE(), INTERVAL 1 DAY) + INTERVAL 0 HOUR
DO
CALL daily_poam_status_update();
$$

CREATE TRIGGER `after_asset_insert` 
AFTER INSERT ON `asset` 
FOR EACH ROW 
BEGIN
    UPDATE `collection`
    SET `assetCount` = `assetCount` + 1
    WHERE `collectionId` = NEW.`collectionId`;
END $$

CREATE TRIGGER `after_asset_delete` 
AFTER DELETE ON `asset` 
FOR EACH ROW 
BEGIN
    UPDATE `collection`
    SET `assetCount` = `assetCount` - 1
    WHERE `collectionId` = OLD.`collectionId`;
END $$

CREATE TRIGGER `after_asset_update` 
AFTER UPDATE ON `asset` 
FOR EACH ROW 
BEGIN
    IF OLD.`collectionId` != NEW.`collectionId` THEN
        UPDATE `collection`
        SET `assetCount` = `assetCount` - 1
        WHERE `collectionId` = OLD.`collectionId`;

        UPDATE `collection`
        SET `assetCount` = `assetCount` + 1
        WHERE `collectionId` = NEW.`collectionId`;
    END IF;
END $$

CREATE TRIGGER `after_poam_insert` 
AFTER INSERT ON `POAM` 
FOR EACH ROW 
BEGIN
    UPDATE `collection`
    SET `poamCount` = `poamCount` + 1
    WHERE `collectionId` = NEW.`collectionId`;
END $$

CREATE TRIGGER `after_poam_delete` 
AFTER DELETE ON `POAM` 
FOR EACH ROW 
BEGIN
    UPDATE `collection`
    SET `poamCount` = `poamCount` - 1
    WHERE `collectionId` = OLD.`collectionId`;
END $$

CREATE TRIGGER `after_poam_update` 
AFTER UPDATE ON `POAM` 
FOR EACH ROW 
BEGIN
    IF OLD.`collectionId` != NEW.`collectionId` THEN
        UPDATE `collection` c
        SET c.`poamCount` = c.`poamCount` - 1
        WHERE c.`collectionId` = OLD.`collectionId`;
        
        UPDATE `collection` c
        SET c.`poamCount` = c.`poamCount` + 1
        WHERE c.`collectionId` = NEW.`collectionId`;
    END IF;
END $$

DELIMITER ;

INSERT INTO `vultrack`.`collection` (`collectionName`, `description`, `collectionOrigin`) 
VALUES ('eMASS', 'eMASS Imports', 'VUL-TRACK');