-- =========================
-- USERS
-- =========================
INSERT INTO "user" (email, password, user_role) VALUES
('marie.dupont@email.com', 'hashed_password', 'owner'),
('jean.martin@email.com', 'hashed_password', 'owner'),
('sophie.bernard@email.com', 'hashed_password', 'owner'),
('pierre.thomas@email.com', 'hashed_password', 'owner'),
('luc.moreau@veterinary.com', 'hashed_password', 'veterinarian'),
('anne.lefevre@veterinary.com', 'hashed_password', 'veterinarian');

-- =========================
-- OWNERS
-- =========================
INSERT INTO owner (id_user, last_name, first_name, phone, email, adress) VALUES
(
  (SELECT id_user FROM "user" WHERE email = 'marie.dupont@email.com'),
  'Dupont', 'Marie', '0612345678', 'marie.dupont@email.com', '123 Rue de Paris, 75001 Paris'
),
(
  (SELECT id_user FROM "user" WHERE email = 'jean.martin@email.com'),
  'Martin', 'Jean', '0687654321', 'jean.martin@email.com', '456 Avenue des Champs, 75008 Paris'
),
(
  (SELECT id_user FROM "user" WHERE email = 'sophie.bernard@email.com'),
  'Bernard', 'Sophie', '0698765432', 'sophie.bernard@email.com', '789 Boulevard Saint-Germain, 75006 Paris'
),
(
  (SELECT id_user FROM "user" WHERE email = 'pierre.thomas@email.com'),
  'Thomas', 'Pierre', '0645678901', 'pierre.thomas@email.com', '321 Rue de Lyon, 75012 Paris'
);

-- =========================
-- VETERINARIANS
-- =========================
INSERT INTO veterinarian (id_user, last_name, first_name, phone, email, adress) VALUES
(
  (SELECT id_user FROM "user" WHERE email = 'luc.moreau@veterinary.com'),
  'Moreau', 'Luc', '0601234567', 'luc.moreau@veterinary.com', '100 Rue de la Paix, 75002 Paris'
),
(
  (SELECT id_user FROM "user" WHERE email = 'anne.lefevre@veterinary.com'),
  'Lefevre', 'Anne', '0623456789', 'anne.lefevre@veterinary.com', '200 Avenue Montaigne, 75008 Paris'
);

-- =========================
-- ANIMALS
-- =========================
INSERT INTO animal (id_owner, name, breed, chip_number, birth_date, weight, size, photo) VALUES
(
  (SELECT id_owner FROM owner WHERE last_name = 'Dupont'),
  'Rex', 'Labrador', 'CHIP001', '2019-05-15T00:00:00.000Z', 32.50, 60.00, 'rex.jpg'
),
(
  (SELECT id_owner FROM owner WHERE last_name = 'Martin'),
  'Minou', 'Persan', 'CHIP002', '2020-08-22T00:00:00.000Z', 4.50, 25.00, 'minou.jpg'
),
(
  (SELECT id_owner FROM owner WHERE last_name = 'Bernard'),
  'Bella', 'Golden Retriever', 'CHIP003', '2021-03-10T00:00:00.000Z', 28.00, 58.00, 'bella.jpg'
),
(
  (SELECT id_owner FROM owner WHERE last_name = 'Thomas'),
  'Whiskers', 'Siamois', 'CHIP004', '2022-01-30T00:00:00.000Z', 3.80, 22.00, 'whiskers.jpg'
);

-- =========================
-- TREATMENTS
-- =========================
INSERT INTO treatment (id_animal, name_treatment, dosage, start_date, end_date, comment) VALUES
(
  (SELECT id_animal FROM animal WHERE name = 'Rex'),
  'Antibiotiques', '250mg 2x par jour', '2024-01-10T00:00:00.000Z', '2024-01-20T00:00:00.000Z', 'Infection cutanée'
),
(
  (SELECT id_animal FROM animal WHERE name = 'Minou'),
  'Anti-douleur', '1 comprimé par jour', '2024-01-15T00:00:00.000Z', '2024-01-25T00:00:00.000Z', 'Arthrite légère'
);

-- =========================
-- VACCINATIONS
-- =========================
INSERT INTO vaccination (id_animal, vaccine_name, vaccine_date, reminder_date, comment) VALUES
(
  (SELECT id_animal FROM animal WHERE name = 'Rex'),
  'Rage', '2023-06-15T00:00:00.000Z', '2024-06-15T00:00:00.000Z', 'Vaccination annuelle'
),
(
  (SELECT id_animal FROM animal WHERE name = 'Bella'),
  'DHPP', '2023-09-20T00:00:00.000Z', '2024-09-20T00:00:00.000Z', 'Vaccin complet'
),
(
  (SELECT id_animal FROM animal WHERE name = 'Minou'),
  'Calicivirus', '2023-08-10T00:00:00.000Z', '2024-08-10T00:00:00.000Z', 'À jour'
);

-- =========================
-- CONSULTATIONS
-- =========================
INSERT INTO consultation (id_animal, id_veterinarian, date_visite, reason, diagnosis) VALUES
(
  (SELECT id_animal FROM animal WHERE name = 'Rex'),
  (SELECT id_veterinarian FROM veterinarian WHERE last_name = 'Moreau'),
  '2024-01-10T00:00:00.000Z', 'Démangeaisons', 'Dermatite allergique'
),
(
  (SELECT id_animal FROM animal WHERE name = 'Minou'),
  (SELECT id_veterinarian FROM veterinarian WHERE last_name = 'Lefevre'),
  '2024-01-12T00:00:00.000Z', 'Boiterie arrière', 'Arthrite'
),
(
  (SELECT id_animal FROM animal WHERE name = 'Bella'),
  (SELECT id_veterinarian FROM veterinarian WHERE last_name = 'Moreau'),
  '2024-01-08T00:00:00.000Z', 'Visite de routine', 'Bon état général'
);
