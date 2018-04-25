import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivestockDetailComponent } from './livestock-detail.component';
import { LivestockService, MockLivestockService } from '../livestock.service';

describe('LivestockDetailComponent', () => {
  let component: LivestockDetailComponent;
  let fixture: ComponentFixture<LivestockDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivestockDetailComponent ],
      providers: [ {provide: LivestockService, useClass: MockLivestockService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestockDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
