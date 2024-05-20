import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    OverlayPanelModule,
    ButtonModule,
    CardModule,
    DividerModule,
    TableModule,
    ToastModule,
    InputTextModule,
    PasswordModule,
    ConfirmDialogModule,
    TooltipModule,
    CalendarModule,
    InputTextareaModule
  ]
})
export class PrimengModule { }
