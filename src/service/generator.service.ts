import seedrandom from 'seedrandom';
import { Region } from '../constants';
import { User } from '../types';
import { UserGenerator } from './generators/UserGenerator';
import { ByUserGenerator } from './generators/ByUserGenerator';
import { EnUserGenerator } from './generators/EnUserGenerator';
import { UaUserGenerator } from './generators/UaUserGenerator';
import { generateErrors } from './error.service';

const userGenerators = new Map<Region, UserGenerator>([
  [Region.BY, new ByUserGenerator()],
  [Region.EN, new EnUserGenerator()],
  [Region.UA, new UaUserGenerator()]
])

export const getUserGenerator = (region: Region): UserGenerator => {
  return userGenerators.get(region)!;
}

export const generateUsers = (userGenerator: UserGenerator, page: number, size: number, errorCount: number, seed: number): User[] => {
  const genUserPR = seedrandom(`${page + seed}`);
  const genErrorPR = seedrandom(`${page + seed}`);
  const users: User[] = [];
  for (let i = 0; i < size; i++) {
    const user: User = userGenerator.generateUser(genUserPR);
    generateErrors(user, errorCount, genErrorPR, userGenerator.alphabet);
    users.push(user);
  }
  return users;
}
