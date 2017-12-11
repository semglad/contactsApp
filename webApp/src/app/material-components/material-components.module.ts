import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatProgressSpinnerModule,
  MatSidenavModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

const materialModules = [
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  BrowserAnimationsModule,
  FlexLayoutModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialComponentsModule { }
