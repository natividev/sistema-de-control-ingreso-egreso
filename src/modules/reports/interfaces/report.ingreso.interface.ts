export interface IReportIngreso {
  nombreActividad: string;
  fechaActividad: Date;
  cantidad: number;
  razon: string;
  dui: string;
  noTransaccion: string;
  observaciones: string;
  tipoIngreso: string;
  tipoAportacion: string;
  tipoControl: string;
}

export type IReporteEgreso = Omit<IReportIngreso, 'tipoIngreso'>;
