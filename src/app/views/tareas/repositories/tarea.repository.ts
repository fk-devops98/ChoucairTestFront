import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ITarea } from '../models/ITarea';

export class TareaRepository {
  public new(): FormGroup {
    return new FormBuilder().group({
      titulo: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      fechaVencimiento: new FormControl(new Date(), [Validators.required]),
    });
  }

  public edit({ id, titulo, descripcion, fechaVencimiento } : ITarea): FormGroup {
    return new FormBuilder().group({
      id: new FormControl(id, [Validators.required]),
      titulo: new FormControl(titulo, [Validators.required]),
      descripcion: new FormControl(descripcion, [Validators.required]),
      fechaVencimiento: new FormControl(fechaVencimiento, [Validators.required]),
    });
  }

}
