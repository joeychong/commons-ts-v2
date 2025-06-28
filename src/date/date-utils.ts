export const timeUnits = {
  milliseconds: 1,
  seconds: 1000,
  minutes: 60000,
  hours: 3600000,
  days: 86400000,
} as const;

function padZero(value: string | number, length: number) {
  if (typeof(value) === 'number') {
    value = '' + value;
  }
  if (!value) {
    value = '';
  }
  // while (value.length < length) {
  //   value = '0' + value;
  // }
  // return value;
  return value.padStart(length, '0');
}

const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
const longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const;
type Format = {
  [key: string]: ((date: Date) => string | number)
}
export const formatters:Format = {
  'd': (date: Date) => {
    return date.getDate();
  },
  'dd': (date: Date) => {
    return padZero(date.getDate(), 2);
  }, 
  'M': (date: Date) => {
    return date.getMonth() + 1;
  },
  'MM': (date: Date) => {
    return padZero((date.getMonth() + 1), 2);
  },
  'MMM': (date: Date) => {
    return shortMonths[date.getMonth()];
  },
  'MMMMM': (date: Date) => {
    return longMonths[date.getMonth()];
  },
  'h': (date: Date) => {
    // return date.getHours() % 12;
    return (date.getHours() % 12) !== 0 ? date.getHours() % 12 : 12;
  },
  'hh': (date: Date) => {
    // return padZero('' + date.getHours() % 12, 2);
    return (date.getHours() % 12) !== 0 ? padZero('' + date.getHours() % 12, 2) : 12;
  }, 
  'H': (date: Date) => {
    return date.getHours();
  },
  'HH': (date: Date) => {
    return padZero(date.getHours(), 2);
  }, 
  'm': (date: Date) => {
    return date.getMinutes();
  },
  'mm': (date: Date) => {
    return padZero(date.getMinutes(), 2);
  },
  's': (date: Date) => {
    return date.getSeconds();
  },
  'ss': (date: Date) => {
    return padZero(date.getSeconds(), 2);
  },
  'S': (date: Date) => {
    return date.getMilliseconds();
  },
  'a': (date: Date) => {
    return date.getHours() >= 12 ? 'pm' : 'am' ;
  },
  'A': (date: Date) => {
    return date.getHours() >= 12 ? 'PM' : 'AM' ;
  },
  'y': (date: Date) => {
    return date.getFullYear() ;
  },
  'yy': (date: Date) => {
    return ('' + (date.getFullYear())).substring(2);
  },
  'yyyy': (date: Date) => {
    return date.getFullYear() ;
  },
};

export const utcFormatters:Format = {
  'd': (date: Date) => {
    return date.getUTCDate();
  },
  'dd': (date: Date) => {
    return padZero(date.getUTCDate(), 2);
  }, 
  'M': (date: Date) => {
    return date.getUTCMonth() + 1;
  },
  'MM': (date: Date) => {
    return padZero(date.getUTCMonth() + 1, 2);
  },
  'MMM': (date: Date) => {
    return shortMonths[date.getUTCMonth()];
  },
  'MMMMM': (date: Date) => {
    return longMonths[date.getUTCMonth()];
  },
  'h': (date: Date) => {
    return (date.getUTCHours() % 12) === 0 && date.getUTCHours() === 12 ? 12 : date.getUTCHours() % 12;
  },
  'hh': (date: Date) => {
    return (date.getUTCHours() % 12) === 0 && date.getUTCHours() === 12 ? 12 : padZero('' + date.getUTCHours() % 12, 2);
  }, 
  'H': (date: Date) => {
    return date.getUTCHours();
  },
  'HH': (date: Date) => {
    return padZero(date.getUTCHours(), 2);
  }, 
  'm': (date: Date) => {
    return date.getUTCMinutes();
  },
  'mm': (date: Date) => {
    return padZero(date.getUTCMinutes(), 2);
  },
  's': (date: Date) => {
    return date.getUTCSeconds();
  },
  'ss': (date: Date) => {
    return padZero(date.getUTCSeconds(), 2);
  },
  'S': (date: Date) => {
    return date.getUTCMilliseconds();
  },
  'a': (date: Date) => {
    return date.getUTCHours() >= 12 ? 'pm' : 'am' ;
  },
  'A': (date: Date) => {
    return date.getUTCHours() >= 12 ? 'PM' : 'AM' ;
  },
  'y': (date: Date) => {
    return date.getUTCFullYear() ;
  },
  'yy': (date: Date) => {
    return ('' + (date.getUTCFullYear())).substring(2);
  },
  'yyyy': (date: Date) => {
    return date.getUTCFullYear() ;
  },
};

export class DateUtils { 
  static formatDate(value: string | number | Date = new Date(), format = 'dd MMM yyyy HH:mm:ss', utc = false) {
    let dateObj: Date;
    if (value instanceof Date) {
      dateObj = value;
    } else if (typeof(value) === 'number' || typeof(value) === 'string') {
      dateObj = new Date(value);
    } else {
      throw new Error('Unknown object');
    }

    let part = '', prev = '', result = '';
    for (const c of format) {
      if (prev !== c) {
        if (part.length > 0) {
          const formatter = utc ? utcFormatters[part] : formatters[part];
          if (formatter) {
            result += formatter(dateObj);
          } else {
            result += part;
          }
        }
        prev = c;
        part = c;
      } else {
        part += c;
      }
    }

    if (part.trim().length > 0) {
      const formatter = utc ? utcFormatters[part] : formatters[part];
      if (formatter) {
        result += formatter(dateObj);
      } else {
        result += part;
      }
    }

    return result;
  }

  static getIsoTimestamp(milliseconds = false, date = new Date()) {
    return `${date.getUTCFullYear()}-${padZero(date.getUTCMonth() + 1, 2)}-${padZero(date.getUTCDate(), 2)}T` + 
      `${padZero(date.getUTCHours(), 2)}:${padZero(date.getUTCMinutes(), 2)}:${padZero(date.getUTCSeconds(), 2)}` +
      (milliseconds ? `.${date.getMilliseconds()}` : '') + 'Z';
  }
}
