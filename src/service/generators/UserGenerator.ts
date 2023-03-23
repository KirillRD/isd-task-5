import seedrandom from 'seedrandom';
import { MIN_USER_ID, MAX_USER_ID, Region, UserDataType, MIN_HOUSE_NUMBER, MAX_HOUSE_NUMBER, MIN_FLAT_NUMBER, MAX_FLAT_NUMBER } from '../../constants';
import { User } from '../../types';
import { getUserData } from '../file.service';
import { getPrNum, getPrRecord } from '../random.service';

export abstract class UserGenerator {
  public readonly region: Region;

  public alphabet!: string[];

  protected firstNames!: string[];

  protected lastNames!: string[];

  protected indexes!: string[];

  protected cities!: string[];

  protected streets!: string[];

  protected phones!: string[];

  constructor(region: Region) {
    this.region = region;
  }

  public async loadData(): Promise<void> {
    await this.loadAlphabet();
    await this.loadFirstNames();
    await this.loadLastNames();
    await this.loadIndexes();
    await this.loadCities();
    await this.loadStreets();
    await this.loadPhones();
  }

  protected async loadAlphabet(): Promise<void> {
    this.alphabet = await getUserData(this.region, UserDataType.ALPHABET);
  }

  protected async loadFirstNames(): Promise<void> {
    this.firstNames = await getUserData(this.region, UserDataType.FIRST_NAME);
  }

  protected async loadLastNames(): Promise<void> {
    this.lastNames = await getUserData(this.region, UserDataType.LAST_NAME);
  }

  protected async loadIndexes(): Promise<void> {
    this.indexes = await getUserData(this.region, UserDataType.INDEX);
  }

  protected async loadCities(): Promise<void> {
    this.cities = await getUserData(this.region, UserDataType.CITY);
  }

  protected async loadStreets(): Promise<void> {
    this.streets = await getUserData(this.region, UserDataType.STREET);
  }

  protected async loadPhones(): Promise<void> {
    this.phones = await getUserData(this.region, UserDataType.PHONE);
  }

  public generateUser(genPR: seedrandom.PRNG): User {
    return {
      id: this.generateId(genPR),
      name: this.generateName(genPR),
      address: this.generateAddress(genPR),
      phone: this.generatePhone(genPR)
    };
  }

  protected generateId(genPR: seedrandom.PRNG): number {
    return getPrNum(MIN_USER_ID, MAX_USER_ID, genPR);
  }

  protected generateName(genPR: seedrandom.PRNG): string {
    const firstName = this.generateFirstName(genPR);
    const lastName = this.generateLastName(genPR);
    return firstName + ' ' + lastName;
  }

  protected generateFirstName(genPR: seedrandom.PRNG): string {
    return getPrRecord(this.firstNames, genPR);
  }

  protected generateLastName(genPR: seedrandom.PRNG): string {
    return getPrRecord(this.lastNames, genPR);
  }

  protected generateAddress(genPR: seedrandom.PRNG): string {
    const house = getPrNum(MIN_HOUSE_NUMBER, MAX_HOUSE_NUMBER, genPR);
    const street = this.generateStreet(genPR);
    const flat = genPR() < 0.5 ? getPrNum(MIN_FLAT_NUMBER, MAX_FLAT_NUMBER, genPR) + ', ' : '';
    const city = this.generateCity(genPR);
    const index = this.generateIndex(genPR);
    return house + ', ' + street + ', ' + flat + city + ', ' + index;
  };

  protected generateIndex(genPR: seedrandom.PRNG): string {
    return getPrRecord(this.indexes, genPR);
  }

  protected generateCity(genPR: seedrandom.PRNG): string {
    return getPrRecord(this.cities, genPR);
  }

  protected generateStreet(genPR: seedrandom.PRNG): string {
    return getPrRecord(this.streets, genPR);
  }

  protected generatePhone(genPR: seedrandom.PRNG): string {
    return getPrRecord(this.phones, genPR);
  }
}
