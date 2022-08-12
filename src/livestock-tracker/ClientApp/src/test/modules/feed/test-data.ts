import { FeedingTransaction, FeedType } from '@core/models';

export interface FeedTestData {
  Feed: {
    SmallList: FeedType[];
    LongList: FeedType[];
  };
  Transactions: {
    SmallList: FeedingTransaction[];
    LongList: FeedingTransaction[];
  };
}

const feed: FeedType[] = [
  { id: 1, description: 'Maize' },
  { id: 2, description: 'Hay' },
  { id: 3, description: 'Straw' },
  { id: 4, description: 'Silage' },
  { id: 5, description: 'Lettuce' },
  { id: 6, description: 'Milk' },
  { id: 7, description: 'Water' },
  { id: 8, description: 'Pellets' },
  { id: 9, description: 'Sorghum' },
  { id: 10, description: 'Corn' },
  { id: 11, description: 'Wheat' }
];

const transactions: FeedingTransaction[] = [
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    quantity: 35.2,
    feedTypeId: 1,
    unitId: 2
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    quantity: 250,
    feedTypeId: 2,
    unitId: 4
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    quantity: 500,
    feedTypeId: 2,
    unitId: 4
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    quantity: 0.8,
    feedTypeId: 5,
    unitId: 2
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    quantity: 1,
    feedTypeId: 4,
    unitId: 8
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    quantity: 2,
    feedTypeId: 1,
    unitId: 2
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    quantity: 35.2,
    feedTypeId: 6,
    unitId: 3
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    quantity: 3,
    feedTypeId: 4,
    unitId: 7
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    quantity: 100,
    feedTypeId: 1,
    unitId: 9
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    quantity: 35.2,
    feedTypeId: 7,
    unitId: 2
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    quantity: 55,
    feedTypeId: 1,
    unitId: 1
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    quantity: 35.2,
    feedTypeId: 1,
    unitId: 6
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    quantity: 35.2,
    feedTypeId: 1,
    unitId: 5
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    quantity: 35.2,
    feedTypeId: 1,
    unitId: 3
  },
  {
    id: 1,
    animalId: 1,
    transactionDate: new Date(),
    quantity: 35.2,
    feedTypeId: 1,
    unitId: 11
  }
];

export const TestData = <FeedTestData>{
  Feed: {
    SmallList: feed.slice(0, 8),
    LongList: feed
  },
  Transactions: {
    SmallList: transactions.slice(0, 8),
    LongList: transactions
  }
};
