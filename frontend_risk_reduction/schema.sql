-- DROP TABLE IF EXISTS components;

CREATE TABLE components (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  contexturl TEXT UNIQUE NOT NULL,
  etag TEXT NOT NULL,
  redfishid TEXT NOT NULL,
  name TEXT NOT NULL,
  oem TEXT NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL, -- Address of component in local network
  status TEXT NOT NULL,
  last_update TEXT NOT NULL
);
