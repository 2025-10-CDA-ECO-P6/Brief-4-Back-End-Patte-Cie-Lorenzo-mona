
CREATE EXTENSION IF NOT EXISTS pgcrypto;


DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('owner', 'veterinarian', 'admin');
  END IF;
END $$;


CREATE TABLE IF NOT EXISTS "user" (
  id_user   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  password  VARCHAR(255) NOT NULL,
  email     VARCHAR(150) UNIQUE NOT NULL,
  user_role user_role NOT NULL DEFAULT 'owner'
);


CREATE TABLE IF NOT EXISTS owner (
  id_owner   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_user    UUID NOT NULL UNIQUE,
  last_name  VARCHAR(30) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  phone      VARCHAR(20) NOT NULL,
  email      VARCHAR(150) NOT NULL,
  adress     TEXT NOT NULL,

  CONSTRAINT fk_owner_user
    FOREIGN KEY (id_user)
    REFERENCES "user"(id_user)
    ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS veterinarian (
  id_veterinarian UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_user         UUID NOT NULL UNIQUE,
  last_name       VARCHAR(30) NOT NULL,
  first_name      VARCHAR(30) NOT NULL,
  phone           VARCHAR(20) NOT NULL,
  email           VARCHAR(150) NOT NULL,
  adress          TEXT NOT NULL,

  CONSTRAINT fk_veterinarian_user
    FOREIGN KEY (id_user)
    REFERENCES "user"(id_user)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS animal (
  id_animal    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_owner     UUID NOT NULL,
  name         VARCHAR(50) NOT NULL,
  breed        VARCHAR(50) NOT NULL,
  chip_number  VARCHAR(50) UNIQUE,
  birth_date   DATE NOT NULL CHECK (birth_date <= CURRENT_DATE),
  weight       NUMERIC(5,2) NOT NULL,
  size         NUMERIC(5,2) NOT NULL,
  photo        TEXT,

  CONSTRAINT fk_animal_owner
    FOREIGN KEY (id_owner)
    REFERENCES owner(id_owner)
    ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS treatment (
  id_treatment   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_animal      UUID NOT NULL,
  name_treatment VARCHAR(30) NOT NULL,
  dosage         TEXT NOT NULL,
  start_date     DATE NOT NULL,
  end_date       DATE NOT NULL,
  comment        TEXT,

  CONSTRAINT fk_treatment_animal
    FOREIGN KEY (id_animal)
    REFERENCES animal(id_animal)
    ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS vaccination (
  id_vaccination UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_animal      UUID NOT NULL,
  vaccine_name   VARCHAR(30) NOT NULL,
  vaccine_date   DATE NOT NULL,
  reminder_date  DATE NOT NULL,
  comment        TEXT,

  CONSTRAINT fk_vaccination_animal
    FOREIGN KEY (id_animal)
    REFERENCES animal(id_animal)
    ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS consultation (
  id_consultation  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_animal        UUID NOT NULL,
  id_veterinarian  UUID NOT NULL,
  date_visite      DATE NOT NULL,
  reason           TEXT NOT NULL,
  diagnosis        TEXT NOT NULL,

  CONSTRAINT fk_consultation_animal
    FOREIGN KEY (id_animal)
    REFERENCES animal(id_animal)
    ON DELETE CASCADE,

  CONSTRAINT fk_consultation_veterinarian
    FOREIGN KEY (id_veterinarian)
    REFERENCES veterinarian(id_veterinarian)
    ON DELETE CASCADE
);
