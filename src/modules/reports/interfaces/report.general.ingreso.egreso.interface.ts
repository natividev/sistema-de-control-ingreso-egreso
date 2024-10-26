export interface IReportGeneralIngresoEgreso {
  id: number;
  fecha: Date;
  montoAnterior: number;
  montoNuevo: number;
  tipo: string;
  actividadIngreso: null | string;
  actividadEgreso: null | string;
}
