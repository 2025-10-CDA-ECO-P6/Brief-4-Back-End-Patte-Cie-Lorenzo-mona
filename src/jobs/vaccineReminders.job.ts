import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Met une date à minuit
function normalizeDate(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Retourne date dans X jours
function dateInDays(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return normalizeDate(d);
}


export async function vaccineRemindersJob() {
  console.log("=== JOB RAPPEL VACCINS LANCÉ ===");

  // Récupérer toutes les vaccinations
  const vaccinations = await prisma.vaccination.findMany({
    include: {
      animal: {
        include: {
          owner: true,
        },
      },
    },
  });

  // Choix dates de rappel
  const todayPlus7 = dateInDays(7);
  const todayPlus1 = dateInDays(1);

  let countJ7 = 0;
  let countJ1 = 0;

  // Parcourt vaccinations
  for (const vaccination of vaccinations) {
    const reminderDate = normalizeDate(new Date(vaccination.reminder_date));

    const animalName = vaccination.animal.name;
    const ownerEmail = vaccination.animal.owner.email;
    const vaccineName = vaccination.vaccine_name;

    // Rappel 7 jours avant
    if (reminderDate.getTime() === todayPlus7.getTime()) {
      console.log(
        `[RAPPEL J-7] ${ownerEmail} | Animal: ${animalName} | Vaccin: ${vaccineName}`
      );
      countJ7++;
    }

    //Rappel veille
    if (reminderDate.getTime() === todayPlus1.getTime()) {
      console.log(
        `[RAPPEL J-1] ${ownerEmail} | Animal: ${animalName} | Vaccin: ${vaccineName}`
      );
      countJ1++;
    }
  }

  console.log(
    `=== FIN JOB : ${countJ7} rappel(s) J-7, ${countJ1} rappel(s) J-1 ===`
  );
}
