CREATE EXTENSION IF NOT EXISTS pgcrypto;



CREATE TABLE owner (
  id_owner   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  last_name  VARCHAR(30) NOT NULL,
  first_name VARCHAR(30),
  phone      VARCHAR(20),
  email      VARCHAR(150),
  adress     TEXT
);

CREATE TABLE veterinarian (
  id_veterinarian UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  last_name       VARCHAR(30) NOT NULL,
  first_name      VARCHAR(30),
  phone           VARCHAR(20),
  email           VARCHAR(150),
  adress          TEXT
);


CREATE TABLE animal (
  id_animal    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_owner     UUID NOT NULL,
  name         VARCHAR(50) NOT NULL,
  breed        VARCHAR(50) NOT NULL,
  chip_number  VARCHAR(50) UNIQUE,
  birth_date   DATE CHECK (birth_date <= CURRENT_DATE),
  weight       NUMERIC(5,2),
  size         NUMERIC(5,2),
  photo        TEXT,

  CONSTRAINT fk_animal_owner
    FOREIGN KEY (id_owner)
    REFERENCES owner(id_owner)
    ON DELETE CASCADE
);


CREATE TABLE treatment (
  id_treatment   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_animal      UUID NOT NULL,
  name_treatment VARCHAR(30),
  dosage         TEXT,
  start_date     DATE,
  end_date       DATE,
  comment        TEXT,

  CONSTRAINT fk_treatment_animal
    FOREIGN KEY (id_animal)
    REFERENCES animal(id_animal)
    ON DELETE CASCADE

);


CREATE TABLE vaccination (
  id_vaccination UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_animal      UUID NOT NULL,
  vaccine_name   VARCHAR(30) NOT NULL,
  vaccine_date   DATE,
  reminder_date  DATE,
  comment        TEXT,

  CONSTRAINT fk_vaccination_animal
    FOREIGN KEY (id_animal)
    REFERENCES animal(id_animal)
    ON DELETE CASCADE


);


CREATE TABLE consultation (
  id_consultation  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_animal        UUID NOT NULL,
  id_veterinarian  UUID,
  date_visite      DATE,
  reason           TEXT,
  diagnosis        TEXT,

  CONSTRAINT fk_consultation_animal
    FOREIGN KEY (id_animal)
    REFERENCES animal(id_animal)
    ON DELETE CASCADE

);
