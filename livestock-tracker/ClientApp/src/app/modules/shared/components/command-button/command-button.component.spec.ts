import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommandButtonComponent } from './command-button.component';

describe('CommandButtonComponent', () => {
  let component: CommandButtonComponent;
  let fixture: ComponentFixture<CommandButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
