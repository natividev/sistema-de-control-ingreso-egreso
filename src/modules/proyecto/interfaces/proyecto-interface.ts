export interface ProyectoCreateData {
  nombre: string;
  fecha: Date | string;
  ubicacion?: any;
  cantidad: number;
  observacion?: string;
  tipo_participante: string[];
  fk_categoria_proyecto_id: number;
}
