import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';

const COMPONENTS = [HeaderComponent];

@NgModule({
  imports: [CommonModule],
  exports: [COMPONENTS],
  declarations: [COMPONENTS],
})
export class CoreModule {}
