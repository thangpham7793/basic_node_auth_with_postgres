DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  CONSTRAINT
    pw_length_check CHECK (char_length(password) >= 6)
);

