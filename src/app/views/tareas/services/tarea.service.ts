import { Observable } from 'rxjs';
import { ITareaGrid } from './../models/ITareaGrid';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ERoutes } from 'src/app/config/routes';
import { HttpService } from 'src/app/core/services/http.service';
import { TareaRepository } from '../repositories/tarea.repository';
import { ITarea } from '../models/ITarea';
import { MessageService } from 'primeng/api';
import { EEstadoTarea } from '../models/EEstadoTarea';
import { Validators } from 'src/app/core/utils/validators';

@Injectable({
  providedIn: 'root',
})
export class TareaService extends TareaRepository {
  public tareas: Array<ITareaGrid> = [];
  public tarea: FormGroup = this.new();

  constructor(
    private readonly httpService$: HttpService,
    private readonly messageService$: MessageService
  ) {
    super();
  }

  public search(): void {
    const urlTareas = `${ERoutes.tareas}`;

    this.httpService$
      .get<Array<ITareaGrid>>(urlTareas)
      .subscribe((tareas: Array<ITareaGrid>) => {
        this.tareas = tareas;
      });
  }

  public loadNew(): void {
    this.tarea = this.new();
  }

  public loadEdit({ id }: ITareaGrid): void {
    const urlTarea = `${ERoutes.tareas}/${id}`;

    this.httpService$.get<ITarea>(urlTarea).subscribe((tarea: ITarea) => {
      this.tarea = this.edit(tarea);
    });
  }

  public delete({ id }: ITareaGrid): void {
    const urlTarea = `${ERoutes.tareas}/${id}`;

    this.httpService$.delete(urlTarea).subscribe((_) => {
      this.messageService$.add({
        severity: 'success',
        summary: 'Exito',
        detail: 'Tarea eliminada correctamente!!',
      });

      this.search();
    });
  }

  public save(): Observable<ITarea> {

    if (!this.tarea.valid) {
      this.messageService$.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Complete la información e intente nuevamente!!',
      });
      this.tarea.markAllAsTouched();
      return null;
    }

    const tarea = this.tarea.value as ITarea;

    const { id } = tarea;

    const action: Observable<ITarea> = this.actionSave(id, tarea);

    return new Observable<ITarea>((observer) => {

      action
            .subscribe((tarea: ITarea) => {
                this.messageService$.add({
                  severity: 'success',
                  summary: 'Exito',
                  detail: 'Tarea creada correctamente!!',
                });

                this.search();

                observer.next(tarea);
                observer.complete();
            });
    });


  }

  public actionSave = (id: string, tarea: ITarea): Observable<ITarea> =>
    Validators.isNullOrUndefined(id)
      ? this.httpService$.post<ITarea>(`${ERoutes.tareas}`, tarea)
      : this.httpService$.put<ITarea>(`${ERoutes.tareas}/${id}`, tarea);

  public close({ id }: ITareaGrid): void {
    const urlTarea = `${ERoutes.tareas}/${id}/estado/${EEstadoTarea.CERRADA}`;

    this.httpService$.put(urlTarea, {}).subscribe((_) => {
      this.messageService$.add({
        severity: 'info',
        summary: 'Exito',
        detail: 'Tarea cerrada correctamente!!',
      });

      this.search();
    });
  }
}
