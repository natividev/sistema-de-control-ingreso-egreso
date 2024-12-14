export interface TimeLine<T extends 'Ingreso' | 'Egreso'> {
  nombreActividad: string;
  montoOriginalSinAlterar: number;
  fecha: Date;
  montoOriginal: number;
  montoAnulacion?: number;
  motivoAnulacion?: string;
  tipo: T;
}

export type IngresoTimeLine = TimeLine<'Ingreso'>;
export type EgresoTimeLine = TimeLine<'Egreso'>;
