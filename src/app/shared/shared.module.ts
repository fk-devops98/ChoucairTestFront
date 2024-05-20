import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports: [
    PrimengModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
