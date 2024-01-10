import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/fr';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(dayOfYear);

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Paris');

dayjs.locale('fr');

dayjs.extend(updateLocale);
dayjs.extend(weekday);
dayjs.updateLocale('fr', {
  relativeTime: {
    M: '1m',
    MM: '%dm',
    d: '1j',
    dd: '%dj',
    future: 'dans %s',
    h: '1h',
    hh: '%dh',
    m: '1min',
    mm: '%dmin',
    past: 'il y a %s',
    s: 'quelques secondes',
    ss: '%ds',
    y: '1a',
    yy: '%dy',
  },
});
dayjs.updateLocale('en-gb', {
  relativeTime: {
    M: '1m',
    MM: '%dm',
    d: '1d',
    dd: '%dd',
    future: 'in %s',
    h: '1h',
    hh: '%dh',
    m: '1m',
    mm: '%dm',
    past: '%s ago',
    s: 'now',
    ss: '%ds',
    y: '1y',
    yy: '%dy',
  },
});
