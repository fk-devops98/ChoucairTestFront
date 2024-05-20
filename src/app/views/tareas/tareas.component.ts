import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TareaComponent } from './components/tarea/tarea.component';
import { EEstadoTarea } from './models/EEstadoTarea';
import { ITareaGrid } from './models/ITareaGrid';
import { TareaService } from './services/tarea.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.scss',
})
export class TareasComponent implements OnInit {
  constructor(
    private readonly tareaService$: TareaService,
    private readonly dialogService$: DialogService,
    private readonly confirmationService$: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.tareaService$.search();
  }

  public get tareas(): Array<ITareaGrid> {
    return this.tareaService$.tareas;
  }

  public create(): void {
    this.tareaService$.loadNew();

    this.dialogService$.open(TareaComponent, {
      header: 'Nueva Tarea',
      closable: false,
    });
  }
  public edit(tarea: ITareaGrid): void {
    this.tareaService$.loadEdit(tarea);

    this.dialogService$.open(TareaComponent, {
      header: 'Editando Tarea',
      closable: false,
    });
  }
  public delete(tarea: ITareaGrid): void {
    const { titulo } = tarea;

    this.confirmationService$.confirm({
      header: 'Confirmación',
      message: `¿Está seguro de eliminar la tarea: ${titulo}?`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.tareaService$.delete(tarea);
      },
    });
  }

  public close(tarea: ITareaGrid): void {
    const { titulo } = tarea;

    this.confirmationService$.confirm({
      header: 'Confirmación',
      message: `¿Está seguro de cerrar la tarea: ${titulo}?`,
      acceptIcon: 'pi pi-check mr-2',
      rejectIcon: 'pi pi-times mr-2',
      rejectButtonStyleClass: 'p-button-sm',
      acceptButtonStyleClass: 'p-button-outlined p-button-sm',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.tareaService$.close(tarea);
      },
    });
  }

  public isClosed({ estadoTareaCodigo }: ITareaGrid): boolean {
    return [String(EEstadoTarea.CERRADA)].includes(estadoTareaCodigo);
  }

}
