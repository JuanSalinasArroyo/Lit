export function isSameDate(date_1?: Date, date_2?: Date) {
    return date_1?.toLocaleDateString() === date_2?.toLocaleDateString();
  }
  
  export function localDateFromUTC(utcDate: Date) {
    return new Date(
      utcDate.getUTCFullYear(),
      utcDate.getUTCMonth(),
      utcDate.getUTCDate()
    );
  }