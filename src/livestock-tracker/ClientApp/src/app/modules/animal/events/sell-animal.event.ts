export class SellAnimal {
  constructor(
    public readonly animalId: number,
    public readonly sellDate: Date,
    public readonly sellPrice: number
  ) {}
}
