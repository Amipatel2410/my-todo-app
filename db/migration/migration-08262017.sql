\c mytodo;

CREATE TABLE IF NOT EXISTS todo
(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  category VARCHAR(255),
  description VARCHAR(255),
  status VARCHAR(255)

);
