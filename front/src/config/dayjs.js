// import supported locales for dates
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/fr';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(isSameOrAfter);
dayjs.extend(localeData);
dayjs.extend(utc);
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
