import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatProgressSpinnerModule,
  MatSidenavModule, MatDialogModule
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
  MatDialogModule,
  BrowserAnimationsModule,
  FlexLayoutModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules,
})
export class MaterialComponentsModule { }
