import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareasRoutingModule } from './tareas-routing.module';
import { TareasComponent } from './tareas.component';
import { SharedModule } from '../../shared/shared.module';
import { TareaComponent } from './components/tarea/tarea.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    TareasComponent,
    TareaComponent
  ],
  imports: [
    CommonModule,
    TareasRoutingModule,
    SharedModule
  ],
  providers:[DialogService, ConfirmationService]
})
export class TareasModule { }
