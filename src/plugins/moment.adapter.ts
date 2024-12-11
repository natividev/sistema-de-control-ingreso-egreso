import * as moment from 'moment';
import { DateOperations } from './interface/moment.interface';

class MomentAdapter implements DateOperations {
  private static instance: MomentAdapter;

  // Implementación del patrón Singleton
  public static getInstance(): MomentAdapter {
    if (!MomentAdapter.instance) {
      MomentAdapter.instance = new MomentAdapter();
    }
    return MomentAdapter.instance;
  }

  // Función que convierte una fecha string a un objeto Date
  convertToDate(dateString: string): Date {
    const momentDate = moment(dateString);
    return momentDate.isValid() ? momentDate.toDate() : new Date();
  }

  // Función que devuelve la fecha actual
  getCurrentDate(): Date {
    return moment().toDate();
  }

  // Función que da formato a una fecha
  formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
    return moment(date).format(format);
  }

  // Función que compara dos fechas
  compareDates(date1: Date, date2: Date): number {
    const momentDate1 = moment(date1);
    const momentDate2 = moment(date2);
    return momentDate1.isBefore(momentDate2)
      ? -1
      : momentDate1.isAfter(momentDate2)
        ? 1
        : 0;
  }

  // Función que suma días a una fecha
  addDays(date: Date, days: number): Date {
    return moment(date).add(days, 'days').toDate();
  }

  // Función que resta días de una fecha
  subtractDays(date: Date, days: number): Date {
    return moment(date).subtract(days, 'days').toDate();
  }
}

// Obtener la instancia única del adaptador
export const momentAdapter = MomentAdapter.getInstance();
