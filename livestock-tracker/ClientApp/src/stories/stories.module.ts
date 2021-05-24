import ButtonComponent from 'stories/button.component';
import HeaderComponent from 'stories/header.component';
import PageComponent from 'stories/page.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ButtonComponent, HeaderComponent, PageComponent],
  imports: [CommonModule]
})
export class StoriesModule {}
