import { TestData } from 'test/modules/animal';

import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AnimalListComponent } from '@animal/components/animal-list/animal-list.component';
import { animalReducers } from '@animal/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoaderModule } from '@shared/components';
import { SharedModule } from '@shared/shared.module';
import { moduleMetadata, Story } from '@storybook/angular';
import { AgeCalculatorService, SvgService } from '@svg/services';

export default {
  title: 'Animal/List',
  component: AnimalListComponent,
  decorators: [
    moduleMetadata({
      declarations: [AnimalListComponent],
      imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        BrowserAnimationsModule,
        HttpClientModule,
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
        SvgService,
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

export const WithNoAnimals = Template.bind({});
export const WithFewAnimals = Template.bind({});
WithFewAnimals.args = {
  animals: TestData.ShortAnimalList
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  isFetching: true
};
