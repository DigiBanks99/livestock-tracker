import { TestData } from 'test/modules/animal';

import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AnimalListComponent } from '@animal/components/animal-list/animal-list.component';
import { AnimalStore } from '@animal/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoaderModule } from '@shared/components';
import { AgeCalculatorService } from '@shared/services';
import { SharedModule } from '@shared/shared.module';
import {
  moduleMetadata,
  Story
} from '@storybook/angular';
import { SvgService } from '@svg/services';

export default {
  title: 'Animal/List',
  component: AnimalListComponent,
  decorators: [
    moduleMetadata({
      declarations: [AnimalListComponent],
      imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        BrowserAnimationsModule,
        FlexLayoutModule,
        HttpClientModule,
        LoaderModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SharedModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        StoreModule.forFeature('animals', AnimalStore.reducers.animalsReducer)
      ],
      providers: [
        SvgService,
        AgeCalculatorService,
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
