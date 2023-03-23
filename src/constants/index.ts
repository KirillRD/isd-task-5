export const FIRST_PAGE_SIZE = 20;
export const PAGE_SIZE = 10;

export const MIN_ERROR_COUNT = 0;
export const MAX_ERROR_COUNT = 1000;

export const MIN_SEED = 0;
export const MAX_SEED = 100000;

export const MIN_USER_ID = 100_000;
export const MAX_USER_ID = 1_000_000;

export const MIN_HOUSE_NUMBER = 1;
export const MAX_HOUSE_NUMBER = 200;

export const MIN_FLAT_NUMBER = 1;
export const MAX_FLAT_NUMBER = 500;

export enum Region {
  BY = 'by',
  EN = 'en',
  UA = 'ua'
}

export enum RegionName {
  BY = 'Belarus',
  EN = 'USA',
  UA = 'Ukraine'
}

export enum UserDataType {
  ALPHABET = 'alphabet',
  CITY = 'city',
  FIRST_NAME = 'firstname',
  FIRST_NAME_F = 'firstname_f',
  FIRST_NAME_M = 'firstname_m',
  INDEX = 'index',
  LAST_NAME = 'lastname',
  MIDDLE_NAME = 'middlename',
  PHONE = 'phone',
  STREET = 'street'
}