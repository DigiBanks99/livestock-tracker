import { MedicalTransaction, MedicineType } from '@core/models';

export interface MedicineTestData {
  Medicine: {
    SmallList: MedicineType[];
    LongList: MedicineType[];
  };
  Transactions: {
    SmallList: MedicalTransaction[];
    LongList: MedicalTransaction[];
  };
}

const medicine: MedicineType[] = [
  { id: 1, description: 'Paracetamol' },
  { id: 2, description: 'Probiotics' },
  { id: 3, description: 'Penicillin' },
  { id: 4, description: 'Trimethoprim-sulfa' },
  { id: 5, description: 'Cephalexin' },
  { id: 6, description: 'Enrofloxacin' },
  { id: 7, description: 'Prednisone' },
  { id: 8, description: 'Dexamethasone' },
  { id: 9, description: 'Diazepam' },
  { id: 10, description: 'Xylazine' },
  { id: 11, description: 'Cyclophosphamide' }
];

const transactions: MedicalTransaction[] = [
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    dose: 35.2,
    medicineId: 1,
    unitId: 2
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    dose: 250,
    medicineId: 2,
    unitId: 4
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    dose: 500,
    medicineId: 2,
    unitId: 4
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    dose: 0.8,
    medicineId: 5,
    unitId: 2
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    dose: 1,
    medicineId: 4,
    unitId: 8
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    dose: 2,
    medicineId: 1,
    unitId: 2
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    dose: 35.2,
    medicineId: 6,
    unitId: 3
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    dose: 3,
    medicineId: 4,
    unitId: 7
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    dose: 100,
    medicineId: 1,
    unitId: 9
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    dose: 35.2,
    medicineId: 7,
    unitId: 2
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    dose: 55,
    medicineId: 1,
    unitId: 1
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    dose: 35.2,
    medicineId: 1,
    unitId: 6
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    dose: 35.2,
    medicineId: 1,
    unitId: 5
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    dose: 35.2,
    medicineId: 1,
    unitId: 3
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    dose: 35.2,
    medicineId: 1,
    unitId: 11
  }
];

export const TestData = <MedicineTestData>{
  Medicine: {
    SmallList: medicine.slice(0, 8),
    LongList: medicine
  },
  Transactions: {
    SmallList: transactions.slice(0, 8),
    LongList: transactions
  }
};
