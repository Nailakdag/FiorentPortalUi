import { subDays, startOfWeek, addDays } from "date-fns";

const baseVehicles = [
  {
    licensePlate: "34 ABC 123",
    chassisNumber: "WBAJN1234567890",
    make: "BMW",
    model: "320i",
    year: 2020,
    status: "New",
    mileage: 45000,
    serviceStartDate: "2023-10-01",
    service: "White",
    registrationNumber: "RH2020001234",
    insuranceStatus: "active",
    fuelType: "Petrol",
    engineCapacity: "2.0",
    driver: "Ahmet Yılmaz",
  },
  {
    licensePlate: "35 XYZ 456",
    chassisNumber: "WAUZZZ8V1JA123456",
    make: "Audi",
    model: "A3",
    year: 2019,
    status: "In Progress",
    mileage: 60000,
    color: "Black",
    registrationNumber: "RH2019005678",
    insuranceStatus: "active",
    fuelType: "Diesel",
    engineCapacity: "1.6",
    driver: "Mehmet Demir",
  },
  {
    licensePlate: "06 DEF 789",
    chassisNumber: "VF3XXXXXXXXXXXXXX",
    make: "Peugeot",
    model: "308",
    year: 2018,
    status: "Approved",
    mileage: 80000,
    color: "Gray",
    registrationNumber: "RH2018009012",
    insuranceStatus: "passive",
    fuelType: "Petrol",
    engineCapacity: "1.2",
    driver: "Ayşe Korkmaz",
  },
  {
    licensePlate: "16 GHJ 234",
    chassisNumber: "TMBJN1234567890",
    make: "Skoda",
    model: "Octavia",
    year: 2021,
    status: "Completed",
    mileage: 35000,
    color: "Navy Blue",
    registrationNumber: "RH2021003456",
    insuranceStatus: "renewal-needed",
    fuelType: "Petrol",
    engineCapacity: "1.4",
    driver: "Fatma Çelik",
  },
  {
    licensePlate: "07 KLM 567",
    chassisNumber: "WVWZZZ3CZ123456",
    make: "Volkswagen",
    model: "Passat",
    year: 2020,
    status: "New",
    mileage: 55000,
    color: "Metallic Gray",
    registrationNumber: "RH2020007890",
    insuranceStatus: "active",
    fuelType: "Diesel",
    engineCapacity: "2.0",
    driver: "Ali Öztürk",
  },
];

const statusDistribution = [
  { status: "New", ratio: 0.25 },
  { status: "In Progress", ratio: 0.35 },
  { status: "Approved", ratio: 0.2 },
  { status: "Completed", ratio: 0.2 },
];

const generateDate = (index: number): string => {
  const now = new Date();
  const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
  const lastWeekStart = startOfWeek(subDays(now, 7), { weekStartsOn: 1 });

  const isThisWeek = Math.random() < 0.6;

  const randomDays = Math.floor(Math.random() * (isThisWeek ? 5 : 7));
  const baseDate = isThisWeek ? thisWeekStart : lastWeekStart;

  return addDays(baseDate, randomDays).toISOString().split("T")[0];
};

const selectStatus = (index: number): string => {
  const random = Math.random();
  let cumulative = 0;

  const adjustedDistribution = [...statusDistribution];
  if (index > 100) {
    adjustedDistribution[0].ratio = 0.35;
    adjustedDistribution[1].ratio = 0.3;
    adjustedDistribution[2].ratio = 0.2;
    adjustedDistribution[3].ratio = 0.15;
  }

  for (const item of adjustedDistribution) {
    cumulative += item.ratio;
    if (random <= cumulative) return item.status;
  }

  return "New";
};

const generateInsuranceEndDate = (insuranceStatus: string): string => {
  const now = new Date();
  if (insuranceStatus === "passive") {
    return subDays(now, Math.floor(Math.random() * 30) + 1)
      .toISOString()
      .split("T")[0];
  } else if (insuranceStatus === "renewal-needed") {
    return addDays(now, Math.floor(Math.random() * 30) + 1)
      .toISOString()
      .split("T")[0];
  } else {
    return addDays(now, Math.floor(Math.random() * 300) + 60)
      .toISOString()
      .split("T")[0];
  }
};

export const mockVehicleData: any[] = Array.from({ length: 150 }, (_, i) => {
  const base = baseVehicles[i % baseVehicles.length];
  const status = selectStatus(i);
  const lastServiceDate = generateDate(i);

  return {
    ...base,
    id: i + 1,
    licensePlate: `${base.licensePlate.split(" ")[0]} ${base.licensePlate.split(" ")[1]} ${100 + i}`,
    mileage: base.mileage + i * 100,
    status: status,
    lastServiceDate: lastServiceDate,
    insuranceEndDate: generateInsuranceEndDate(base.insuranceStatus),
  };
});
