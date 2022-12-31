use gpa_calculator;
DROP TABLE forget_password;
CREATE TABLE forget_password (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    forget_link VARCHAR(65) NOT NULL DEFAULT (MD5(UUID())),
    initilized_on TIMESTAMP DEFAULT NOW(),
    expired_on TIMESTAMP DEFAULT (DATE_ADD(NOW(), INTERVAL 1 day)) 
);
SELECT * FROM forget_password;
TRUNCATE TABLE forget_password;
SELECT * FROM users;
INSERT INTO forget_password(email) VALUES('abdulazeemabdulazeez@gmail.com'); 
ALTER TABLE
    users
ADD
    COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
