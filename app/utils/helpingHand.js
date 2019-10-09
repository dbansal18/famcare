import * as _ from 'lodash';

export const normalizeString = str =>
  _(str)
    .toUpper()
    .replace(/&amp;/gi, '')
    .replace(/[^a-zA-Z0-9]/g, '');

export const getStartCase = str => _.startCase(str);
export const getLocalDateString = date => new Date(date).toLocaleDateString();
export const cloneObject = obj => JSON.parse(JSON.stringify(obj));
