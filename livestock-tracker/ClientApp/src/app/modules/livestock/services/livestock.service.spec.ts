import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { LiveStockType } from '@core/models/livestock-type.model';
import { Livestock } from '@core/models/livestock.model';

import { LivestockService } from './livestock.service';

describe('livestockService', () => {
  let injector: TestBed;
  let model: Livestock;
  let service: LivestockService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LivestockService]
    });

    injector = getTestBed();
    service = injector.get(LivestockService);
    httpMock = injector.get(HttpTestingController);

    model = new Livestock(
      1,
      LiveStockType.Cattle,
      '',
      1,
      new Date(),
      null,
      null,
      null,
      null,
      null
    );
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
    expect(function() {
      service.getSvgIcon(model);
    }).toThrowError('4 not implemented');
  });

  it('#getSvgIconByType should return correct value', () => {
    expect(service.getSvgIconByType(LiveStockType.Cattle)).toBe('cow');
    expect(service.getSvgIconByType(LiveStockType.Pig)).toBe('pig');
    expect(service.getSvgIconByType(LiveStockType.Chicken)).toBe('chicken');
    expect(service.getSvgIconByType(LiveStockType.Sheep)).toBe('sheep');
    expect(function() {
      service.getSvgIconByType(4);
    }).toThrowError('4 not implemented');
  });

  it('#getSvgIconByString should return correct value', () => {
    expect(service.getSvgIconByString('Cattle')).toBe('cow');
    expect(service.getSvgIconByString('Pig')).toBe('pig');
    expect(service.getSvgIconByString('Chicken')).toBe('chicken');
    expect(service.getSvgIconByString('Sheep')).toBe('sheep');
    expect(function() {
      service.getSvgIconByString('donkey');
    }).toThrowError('donkey not implemented');
  });

  it('#getAnimal should return the correct value', () => {
    expect(service.getAnimal(null)).toBeNull();
    expect(service.getAnimal(undefined)).toBeNull();
    expect(service.getAnimal(0)).toBeNull();

    service.livestockChanged.subscribe((animals: Livestock[]) => {
      expect(service.getAnimal(4).id).toBe(4);
      expect(function() {
        service.getAnimal(33);
      }).toThrowError('Item not found');

      for (const animal of animals) {
        service.removeLivestock(animal.id);
      }

      expect(function() {
        service.getAnimal(model.id);
      }).toThrowError('Item not found');
    });
    service.getLivestock();
  });

  it('#removeLivestock should remove items when possible', () => {
    service.livestockChanged.subscribe(() => {
      expect(service.getAnimal(1).id).toBe(1);
      service.removeLivestock(1);
      expect(function() {
        service.getAnimal(1);
      }).toThrowError(null);

      expect(function() {
        service.removeLivestock(1);
      }).toThrowError('Item not found');
    });
    service.getLivestock();
  });

  it('#addAnimal should add animal if it does not exist and throw and error if it does exist', () => {
    model.id = 12;
    model.type = LiveStockType.Cattle;
    let list: Livestock[];
    service.livestockChanged.subscribe((animals: Livestock[]) => {
      list = animals;
      expect(list.length).toBe(10);
      service.addAnimal(model);
      service.livestockChanged.subscribe((animals2: Livestock[]) => {
        list = animals2;
        let lastItem = list[list.length - 1];
        expect(list.length).toBe(11);
        expect(lastItem.id).toBe(-1);
        expect(lastItem.type).toBe(LiveStockType.Cattle);
        model.type = LiveStockType.Pig;
        expect(function() {
          service.addAnimal(model);
        }).toThrowError('Animal already exists. Use updateAnimal instead.');

        const newAnimal = new Livestock(
          0,
          LiveStockType.Chicken,
          'cockadoodle',
          55,
          new Date(),
          new Date(),
          20,
          null,
          1,
          2
        );
        service.addAnimal(newAnimal);
        service.livestockChanged.subscribe((animals3: Livestock[]) => {
          list = animals3;
          expect(list.length).toBe(12);
          lastItem = list[list.length - 1];
          expect(lastItem.id).toBe(-2);
          expect(lastItem.type).toBe(LiveStockType.Chicken);
          expect(lastItem.subspecies).toBe('cockadoodle');
        });
        service.getLivestock();
      });
      service.getLivestock();
    });
    service.getLivestock();
  });
});
