import seedrandom from 'seedrandom';
import { MAX_SEED, MIN_SEED } from '../constants';

const percentage = (num: number, per: number): number => {
  return Math.floor(num * per);
}

export const genSeed = (): number => {
  return Math.floor(Math.random() * (MAX_SEED - MIN_SEED + 1) + MIN_SEED);
}

export const getPrNum = (minVal: number, maxVal: number, genPR: seedrandom.PRNG): number => {
  return Math.floor(genPR() * (maxVal - minVal + 1) + minVal);
}

export const getPrRecord = (records: string[], genPR: seedrandom.PRNG): string => {
  return records[percentage(records.length, genPR())];
}
