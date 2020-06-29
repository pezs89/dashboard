import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ng2-tooltip-directive';

import { ObjKeyPipe } from './pipes/obj-key.pipe';

const PIPES = [ObjKeyPipe];

@NgModule({
  imports: [CommonModule, TooltipModule],
  exports: [ObjKeyPipe, TooltipModule],
  declarations: [ObjKeyPipe],
  providers: [],
})
export class SharedModule {}
