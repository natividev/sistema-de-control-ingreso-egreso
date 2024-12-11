export interface DateOperations {
  // Convierte una fecha en formato string a un objeto Date
  convertToDate(dateString: string): Date;

  // Obtiene la fecha actual
  getCurrentDate(): Date;

  // Formatea una fecha a un formato específico
  formatDate(date: Date, format: string): string;

  // Compara dos fechas y devuelve un número: -1 si la primera es antes, 1 si la segunda es antes, 0 si son iguales
  compareDates(date1: Date, date2: Date): number;

  // Suma una cantidad de días a una fecha
  addDays(date: Date, days: number): Date;

  // Resta una cantidad de días a una fecha
  subtractDays(date: Date, days: number): Date;
}
