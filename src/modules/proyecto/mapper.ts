import { momentAdapter } from 'src/plugins/moment.adapter';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';

type ProyectoDto = CreateProyectoDto | UpdateProyectoDto;

export class ProyectoMapper {
  static toDto(proyecto: ProyectoDto) {
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
