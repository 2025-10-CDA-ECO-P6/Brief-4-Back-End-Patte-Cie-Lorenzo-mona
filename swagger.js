import swaggerAutogen from "swagger-autogen";

const swagger = swaggerAutogen();

const doc = {
  info: {
    title: "Patte & Cie API",
    description: "Documentation de l’API Patte & Cie",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./src/app.ts",
  "./src/routes/owner.routes.ts",
  "./src/routes/veterinarian.routes.ts",
];

swagger(outputFile, endpointsFiles, doc);
