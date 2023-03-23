import seedrandom from 'seedrandom';
import { User } from '../types';
import { getPrNum, getPrRecord } from './random.service';

const getFloorErrorCount = (errorCount: number, genPR: seedrandom.PRNG): number => {
  const floor = Math.floor(errorCount);
  if (floor == errorCount) {
    return floor;
  }
  return floor + (genPR() < errorCount - floor ? 1 : 0);
}

const getAddressErrorCount = (floorErrorCount: number): number => {
  return Math.floor(floorErrorCount / 3) + (floorErrorCount % 3 >= 1 ? 1 : 0);
}

const getNameErrorCount = (floorErrorCount: number): number => {
  return Math.floor(floorErrorCount / 3) + (floorErrorCount % 3 == 2 ? 1 : 0);
}

const getPhoneErrorCount = (floorErrorCount: number): number => {
  return Math.floor(floorErrorCount / 3);
}

const removeSymbol = (str: string, genPR: seedrandom.PRNG): string => {
  const sym = getPrNum(0, str.length-1, genPR);
  return str.slice(0, sym) + str.slice(sym + 1);
}

const addSymbol = (str: string, genPR: seedrandom.PRNG, alphabet: string[]): string => {
  const sym = getPrNum(0, str.length, genPR);
  const letter = getPrRecord(alphabet, genPR);
  return str.slice(0, sym) + letter + str.slice(sym);
}

const swapSymbols = (str: string, genPR: seedrandom.PRNG): string => {
  const sym = getPrNum(0, str.length-2, genPR);
  return str.slice(0, sym) + str.charAt(sym + 1) + str.charAt(sym) + str.slice(sym + 2);
}

const generateFieldErrors = (fieldValue: string, fieldErrorCount: number, genPR: seedrandom.PRNG, alphabet: string[]): string => {
  const floorFieldErrorCount = Math.floor(fieldErrorCount / 3);
  for (let i = 1; i < floorFieldErrorCount; i++) {
    fieldValue = removeSymbol(fieldValue, genPR);
    fieldValue = addSymbol(fieldValue, genPR, alphabet);
    fieldValue = swapSymbols(fieldValue, genPR);
  }

  const remainder = fieldErrorCount % 3;
  if (remainder == 1) {
    fieldValue = swapSymbols(fieldValue, genPR);
  } else if (remainder == 2) {
    fieldValue = removeSymbol(fieldValue, genPR);
    fieldValue = addSymbol(fieldValue, genPR, alphabet);
  }
  return fieldValue;
}

const generateAddressErrors = (address: string, floorErrorCount: number, genPR: seedrandom.PRNG, alphabet: string[]): string => {
  const addressErrorCount = getAddressErrorCount(floorErrorCount);
  return generateFieldErrors(address, addressErrorCount, genPR, alphabet);
}

const generateNameErrors = (name: string, floorErrorCount: number, genPR: seedrandom.PRNG, alphabet: string[]): string => {
  const nameErrorCount = getNameErrorCount(floorErrorCount);
  return generateFieldErrors(name, nameErrorCount, genPR, alphabet);
}

const generatePhoneErrors = (phone: string, floorErrorCount: number, genPR: seedrandom.PRNG, alphabet: string[]): string => {
  const phoneErrorCount = getPhoneErrorCount(floorErrorCount);
  return generateFieldErrors(phone, phoneErrorCount, genPR, alphabet);
}

export const generateErrors = (user: User, errorCount: number, genPR: seedrandom.PRNG, alphabet: string[]) => {
  const floorErrorCount = getFloorErrorCount(errorCount, genPR);
  user.address = generateAddressErrors(user.address, floorErrorCount, genPR, alphabet);
  user.name = generateNameErrors(user.name, floorErrorCount, genPR, alphabet);
  user.phone = generatePhoneErrors(user.phone, floorErrorCount, genPR, alphabet);
}
