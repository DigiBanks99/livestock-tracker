import { LivestockService } from './livestock.service';
import { LiveStockType } from './livestock-type.model';
import { Livestock } from './livestock.model';

describe('livestockService', () => {
  let model: Livestock;
  let service: LivestockService;

  beforeEach(() => {
    service = new LivestockService(null);
    model = new Livestock(1, LiveStockType.Cattle, '', 1, new Date(), null, null, null, null, null);
  });

  it('#getSvgIcon should return correct value', () => {
    expect(service.getSvgIcon(model)).toBe('cow');
    model.type = LiveStockType.Pig;
    expect(service.getSvgIcon(model)).toBe('pig');
    model.type = LiveStockType.Chicken;
    expect(service.getSvgIcon(model)).toBe('chicken');
    model.type = LiveStockType.Sheep;
    expect(service.getSvgIcon(model)).toBe('sheep');
    model.type = 4;
    expect(function () {
      service.getSvgIcon(model);
    }).toThrowError('4 not implemented');
  });

  it('#getSvgIconByType should return correct value', () => {
    expect(service.getSvgIconByType(LiveStockType.Cattle)).toBe('cow');
    expect(service.getSvgIconByType(LiveStockType.Pig)).toBe('pig');
    expect(service.getSvgIconByType(LiveStockType.Chicken)).toBe('chicken');
    expect(service.getSvgIconByType(LiveStockType.Sheep)).toBe('sheep');
    expect(function () {
      service.getSvgIconByType(4);
    }).toThrowError('4 not implemented');
  });

  it('#getSvgIconByString should return correct value', () => {
    expect(service.getSvgIconByString('Cattle')).toBe('cow');
    expect(service.getSvgIconByString('Pig')).toBe('pig');
    expect(service.getSvgIconByString('Chicken')).toBe('chicken');
    expect(service.getSvgIconByString('Sheep')).toBe('sheep');
    expect(function () {
      service.getSvgIconByString('donkey');
    }).toThrowError('donkey not implemented');
  });

  it('#getAnimal should return the correct value', () => {
    expect(service.getAnimal(null)).toBeNull();
    expect(service.getAnimal(undefined)).toBeNull();
    expect(service.getAnimal(0)).toBeNull();

    expect(service.getAnimal(4).id).toBe(4);
    expect(function () {
      service.getAnimal(33);
    }).toThrowError('Item not found');

    service.getLivestock().subscribe((animals: Livestock[]) => {
      for (const animal of animals) {
        service.removeLivestock(animal.id);
      }

      expect(function () {
        service.getAnimal(model.id);
      }).toThrowError('Item not found');
    });
  });

  it('#removeLivestock should remove items when possible', () => {
    expect(service.getAnimal(1).id).toBe(1);
    service.removeLivestock(1);
    expect(function() {
      service.getAnimal(1);
    }).toThrowError(null);

    expect(function () {
      service.removeLivestock(1);
    }).toThrowError('Item not found');
  });

  it('#addAnimal should add animal if it does not exist and throw and error if it does exist', () => {
    model.id = 12;
    model.type = LiveStockType.Cattle;
    let list: Livestock[];
    service.getLivestock().subscribe((animals: Livestock[]) => {
      list = animals;
      expect(list.length).toBe(10);
      service.addAnimal(model);
      service.getLivestock().subscribe((animals2: Livestock[]) => {
        list = animals2;
        let lastItem = list[list.length - 1];
        expect(list.length).toBe(11);
        expect(lastItem.id).toBe(-1);
        expect(lastItem.type).toBe(LiveStockType.Cattle);
        model.type = LiveStockType.Pig;
        expect(function () {
          service.addAnimal(model);
        }).toThrowError('Animal already exists. Use updateAnimal instead.');

        const newAnimal = new Livestock(0, LiveStockType.Chicken, 'cockadoodle', 55, new Date(), new Date(), 20, null, 1, 2);
        service.addAnimal(newAnimal);
        service.getLivestock().subscribe((animals3: Livestock[]) => {
          list = animals3;
        expect(list.length).toBe(12);
        lastItem = list[list.length - 1];
        expect(lastItem.id).toBe(-2);
        expect(lastItem.type).toBe(LiveStockType.Chicken);
        expect(lastItem.subspecies).toBe('cockadoodle');
      });
    });
  });
});

  it('#updateAnimal should update the existing item or throw an error if it does not exist.', () => {
    model.id = 12;
    expect(function () {
      service.updateAnimal(model);
    }).toThrowError('Animal does not exist in list. Use addAnimal instead.');

    model.id = 1;
    let list = service.getLivestock();
    expect(list.length).toBe(10);
    let existingAnimal = service.getAnimal(model.id);
    expect(existingAnimal.type).toBe(LiveStockType.Cattle);
    model.type = LiveStockType.Pig;
    service.updateAnimal(model);
    list = service.getLivestock();
    expect(list.length).toBe(10);
    existingAnimal = service.getAnimal(model.id);
    expect(existingAnimal.type).toBe(LiveStockType.Pig);
  });
});
