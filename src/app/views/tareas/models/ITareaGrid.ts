export interface ITareaGrid {
  id: string;
  titulo: string;
  descripcion: string;
  fechaVencimiento: Date;
  estadoTareaId: string;
  estadoTareaCodigo: string;
  estadoTareaNombre: string;
  usuarioId: string;
  usuarioNombre: string;
  eliminada: boolean;
}
