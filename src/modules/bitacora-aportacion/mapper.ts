import { momentAdapter } from 'src/plugins/moment.adapter';
import { CreateBitacoraAportacionDto } from './dto/create-bitacora-aportacion.dto';

export class ProyectoBitacoraMapper {
  static toDto(proyecto: CreateBitacoraAportacionDto) {
    return {
      fecha: momentAdapter.convertToDate(proyecto.fecha),
      nombre_persona: proyecto.nombrePersona,
      fk_proyecto_id: proyecto.proyectoId,
      fk_tipo_aporte_id: proyecto.tipoAporteId,
      cantidad: proyecto.cantidad,
      observaciones: proyecto.observaciones,
    };
  }
}
