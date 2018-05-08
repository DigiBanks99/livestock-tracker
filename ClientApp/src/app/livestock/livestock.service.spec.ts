import { LivestockService } from './livestock.service';
import { LiveStockType } from './livestock-type.model';
import { Livestock } from './livestock.model';

describe('livestockService', () => {
  let model: Livestock;
  let service: LivestockService;

  beforeEach(() => {
    service = new LivestockService();
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

    expect(service.getAnimal(4).id).toBe(4);
    expect(function () {
      service.getAnimal(33);
    }).toThrowError('Item not found');

    const list = service.getLivestock();
    for (const animal of list) {
      service.removeLivestock(animal.id);
    }

    expect(function () {
      service.getAnimal(model.id);
    }).toThrowError('Item not found');
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
});
