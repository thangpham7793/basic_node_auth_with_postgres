ALTER TABLE user_account 
ADD CONSTRAINT email_constraint
CHECK (email LIKE '_%@_%._%');