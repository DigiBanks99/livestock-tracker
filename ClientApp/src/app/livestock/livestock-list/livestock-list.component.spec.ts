import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivestockListComponent } from './livestock-list.component';
import { LivestockService, MockLivestockService } from '../livestock.service';
import { Livestock } from '../livestock.model';
import { MatIconModule, MatToolbarModule, MatDividerModule, MatListModule } from '@angular/material';

describe('LivestockListComponent', () => {
  let component: LivestockListComponent;
  let fixture: ComponentFixture<LivestockListComponent>;

  beforeEach(async(() => {
    let livestockServiceStub: Partial<LivestockService>;
    livestockServiceStub = {
      getLivestock: function(): Livestock[] {
        return [];
      }
    };

    TestBed.configureTestingModule({
      declarations: [ LivestockListComponent ],
      providers: [ {provide: LivestockService, useClass: MockLivestockService}],
      imports: [MatIconModule, MatToolbarModule, MatDividerModule, MatListModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
