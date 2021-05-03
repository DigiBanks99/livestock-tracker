import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterTestingModule } from '@angular/router/testing';
import { getAnimalCount, getAnimals } from '@core/store/selectors';
import { HomeComponent } from '@home/components/home.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent],
        imports: [RouterTestingModule, MatGridListModule, MatCardModule],
        providers: [
          provideMockStore({
            selectors: [
              { selector: getAnimals, value: [] },
              { selector: getAnimalCount, value: 0 }
            ]
          })
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
