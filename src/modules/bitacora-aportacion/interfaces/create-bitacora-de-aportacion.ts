export interface AporteProyecto {
  fecha: Date;
  nombre_persona: string;
  fk_proyecto_id: number;
  fk_tipo_aporte_id: number;
  cantidad: string;
  observaciones?: string;
}
