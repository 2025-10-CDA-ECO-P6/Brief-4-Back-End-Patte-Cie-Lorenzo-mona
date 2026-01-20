import swaggerAutogen from "swagger-autogen";

const swagger = swaggerAutogen();

const doc = {
  info: {
    title: "Patte & Cie API",
    description: "Documentation de l’API Patte & Cie",
  },
  host: "localhost:3000",
  schemes: ["http"],
  tags: [
    { name: "Auth", description: "Authentification" },
    { name: "Users", description: "Utilisateurs" },
    { name: "Owners", description: "Propriétaires" },
    { name: "Veterinarians", description: "Vétérinaires" },
    { name: "Animals", description: "Animaux" },
    { name: "Treatments", description: "Traitements" },
    { name: "Vaccinations", description: "Vaccinations" },
    { name: "Consultations", description: "Consultations" },
  ],
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "JWT Bearer token. Exemple: 'Bearer {token}'",
    },
  },
  definitions: {
    LoginRequest: {
      email: "kiki@outlook.fr",
      password: "password123",
    },
    LoginResponse: {
      token: "eyJhbGciOi...",
    },
    User: {
      id_user: "uuid",
      first_name: "Tata",
      last_name: "Toto",
      phone: "1234567890",
      email: "user@example.com",
      adress: "157 rue ...",
      user_role: "owner",
    },
    Owner: {
      id_owner: "uuid",
      id_user: "uuid",
      first_name: "Tata",
      last_name: "Toto",
      phone: "1234567890",
      email: "owner@example.com",
      adress: "157 rue ...",
    },
    Veterinarian: {
      id_veterinarian: "uuid",
      id_user: "uuid",
      first_name: "Jean",
      last_name: "Dupont",
      phone: "0612345678",
      email: "jean.dupont@clinic.fr",
      adress: "10 rue de la Clinique",
    },
    Animal: {
      id_animal: "uuid",
      id_owner: "uuid",
      name: "Rex",
      breed: "Labrador",
      chip_number: "123456789",
      birth_date: "2025-12-17T00:00:00.000Z",
      weight: 30,
      size: 60,
      photo: "http://example.com/photo.jpg",
    },
    Treatment: {
      id_treatment: "uuid",
      id_animal: "uuid",
      name_treatment: "Loperamide",
      dosage: "1 comprimé matin et soir",
      start_date: "2025-12-17T00:00:00.000Z",
      end_date: "2025-12-24T00:00:00.000Z",
      comment: "Après repas",
    },
    Vaccination: {
      id_vaccination: "uuid",
      id_animal: "uuid",
      vaccine_name: "Rage",
      vaccine_date: "2025-12-17T00:00:00.000Z",
      reminder_date: "2025-12-17T00:00:00.000Z",
      comment: "Rappel annuel",
    },
    Consultation: {
      id_consultation: "uuid",
      id_animal: "uuid",
      id_veterinarian: "uuid",
      date_visite: "2025-12-17T00:00:00.000Z",
      reason: "Boiterie depuis 2 jours",
      diagnosis: "Entorse légère",
    },
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./src/app.ts",
  "./src/routes/owner.routes.ts",
  "./src/routes/veterinarian.routes.ts",
  "./src/routes/user.routes.ts",
  "./src/routes/animal.routes.ts",
  "./src/routes/treatment.routes.ts",
  "./src/routes/vaccination.routes.ts",
  "./src/routes/consultation.routes.ts",
  "./src/routes/auth.routes.ts",
];

swagger(outputFile, endpointsFiles, doc);
