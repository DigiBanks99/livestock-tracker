export interface PagedData<T> {
  data: T[];
  currentPage: number;
  pageCount: number;
  totalRecordCount: number;
}

export interface PagingOptions {
  pageSize: number;
  pageNumber: number;
}

export interface OrderingOptions {
  property: string;
  direction: 'Ascending' | 'Descending';
}

export enum AnimalType {
  Cattle = 0,
  Pig = 1,
  Chicken = 2,
  Sheep = 3,
}

export interface Animal {
  id: number;
  type: AnimalType;
  subspecies: string;
  number: number;
  birthDate: Date;
  purchaseDate: Date;
  purchasePrice: number;
  arrivalWeight: number;
  batchNumber: number;
  sellPrice: number | null;
  sellDate: Date | null;
  dateOfDeath: Date | null;
  sold: boolean;
  deceased: boolean;
  archived: boolean;
}

export interface Unit {
  id: number;
  description: string;
}

export interface FeedType {
  id: number;
  description: string;
}

export interface FeedingTransaction {
  id: number;
  animalId: number;
  feedTypeId: number;
  quantity: number;
  unitId: number;
  transactionDate: Date;
}

export interface MedicineType {
  id: number;
  description: string;
}

export interface MedicalTransaction {
  id: number;
  animalId: number;
  medicineTypeId: number;
  dose: number;
  unitId: number;
  transactionDate: Date;
}

export interface WeightTransaction {
  id: number;
  animalId: number;
  weight: number;
  unitId: number;
  transactionDate: Date;
}