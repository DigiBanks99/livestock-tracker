import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AnimalListComponent } from '@animal/components/animal-list/animal-list.component';
import { LivestockService } from '@animal/services';
import { animalReducers } from '@animal/store';
import { Animal, AnimalType } from '@core/models';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoaderModule } from '@shared/components';
import { AgeCalculatorService } from '@shared/services';
import { SharedModule } from '@shared/shared.module';
import { moduleMetadata, Story } from '@storybook/angular';

export default {
  title: 'Animal/List',
  component: AnimalListComponent,
  decorators: [
    moduleMetadata({
      declarations: [AnimalListComponent],
      imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        LoaderModule,
        MatCheckboxModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        StoreModule.forFeature('animals', animalReducers.animalsReducer)
      ],
      providers: [
        LivestockService,
        AgeCalculatorService,
        { provide: 'BASE_URL', useValue: '' },
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
  ]
};

const Template: Story<AnimalListComponent> = (args: AnimalListComponent) => ({
  component: AnimalListComponent,
  props: args
});

const fewAnimals: Animal[] = [
  {
    id: 1,
    type: AnimalType.Chicken,
    subspecies: 'Roberto',
    number: 55,
    birthDate: new Date(),
    purchaseDate: new Date(),
    purchasePrice: 20,
    sellPrice: null,
    arrivalWeight: 1,
    batchNumber: 2,
    dateOfDeath: null,
    deceased: false,
    sellDate: null,
    sold: false
  },
  {
    id: 2,
    type: AnimalType.Chicken,
    subspecies: 'Firmino',
    number: 56,
    birthDate: new Date(),
    purchaseDate: new Date(),
    purchasePrice: 20,
    sellPrice: null,
    arrivalWeight: 1,
    batchNumber: 2,
    dateOfDeath: null,
    deceased: false,
    sellDate: null,
    sold: false
  },
  {
    id: 3,
    type: AnimalType.Cattle,
    subspecies: 'Lola',
    number: 57,
    birthDate: new Date(),
    purchaseDate: new Date(),
    purchasePrice: 120,
    sellPrice: null,
    arrivalWeight: 25,
    batchNumber: 1,
    dateOfDeath: null,
    deceased: false,
    sellDate: null,
    sold: false
  }
];

export const WithNoAnimals = Template.bind({});
export const WithFewAnimals = Template.bind({});
WithFewAnimals.args = {
  animals: fewAnimals
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  isFetching: true
};
