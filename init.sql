CREATE TABLE users ( 
    email VARCHAR(254) NOT NULL, 
    pageName VARCHAR(256) NOT NULL, 
    firstName VARCHAR(24), 
    lastName VARCHAR(24), 
    password VARCHAR(256) NOT NULL, 
    PRIMARY KEY (email) 
);

CREATE TABLE keyvaluestore (
    pageName VARCHAR(256) NOT NULL,
    `key` VARCHAR(24) NOT NULL,
    value LONGTEXT NOT NULL,
    PRIMARY KEY (pageName, `key`)
);