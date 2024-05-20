import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.scss',
})
export class TareaComponent {
  constructor(
    private readonly tareaService$: TareaService,
    private dialogref$: DynamicDialogRef
  ) {}

  getForm(): FormGroup {
    return this.tareaService$.tarea;
  }

  public save(): void {
    this.tareaService$.save().subscribe((_) => this.dialogref$.close());
  }

  public cancel(): void {
    this.dialogref$.close();
  }
}
