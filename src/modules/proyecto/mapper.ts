import { momentAdapter } from 'src/plugins/moment.adapter';
import { CreateProyectoDto } from './dto/create-proyecto.dto';

export class ProyectoMapper {
  static toDto(proyecto: CreateProyectoDto) {
    return {
      nombre: proyecto.nombre,
      fecha: momentAdapter.convertToDate(proyecto.fecha),
      ubicacion: proyecto?.ubicacion,
      cantidad: proyecto.cantidad,
      observacion: proyecto.observacion,
      tipo_participante: proyecto.tipoParticipante,
      fk_categoria_proyecto_id: proyecto.categoriaProyectoId,
    };
  }
}
