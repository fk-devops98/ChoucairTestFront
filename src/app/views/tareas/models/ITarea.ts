export interface ITarea {
  id: string;
  titulo: string;
  descripcion: string;
  fechaVencimiento: Date;
  estadoTareaId: string;
  usuarioId: string;
  eliminada: boolean;
}
