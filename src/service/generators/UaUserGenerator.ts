import { UserGenerator } from './UserGenerator';
import { MAX_FLAT_NUMBER, MAX_HOUSE_NUMBER, MIN_FLAT_NUMBER, MIN_HOUSE_NUMBER, Region, UserDataType } from '../../constants';
import { getUserData } from '../file.service';
import { getPrNum, getPrRecord } from '../random.service';
import seedrandom from 'seedrandom';

export class UaUserGenerator extends UserGenerator {
  protected fFirstNames!: string[];

  protected mFirstNames!: string[];

  protected middleNames!: string[];

  constructor() {
    super(Region.UA);
  }

  public async loadData(): Promise<void> {
    await this.loadAlphabet();
    await this.loadFirstNames();
    await this.loadLastNames();
    await this.loadIndexes();
    await this.loadCities();
    await this.loadStreets();
    await this.loadPhones();
    await this.loadMiddleNames();
  }

  protected async loadFirstNames(): Promise<void> {
    this.fFirstNames = await getUserData(this.region, UserDataType.FIRST_NAME_F);
    this.mFirstNames = await getUserData(this.region, UserDataType.FIRST_NAME_M);
  }

  protected async loadMiddleNames(): Promise<void> {
    this.middleNames = await getUserData(this.region, UserDataType.MIDDLE_NAME);
  }

  protected generateName(genPR: seedrandom.PRNG): string {
    const lastName = this.generateLastName(genPR);
    const firstName = this.generateFirstName(genPR);
    const middleName = this.generateMiddleName(genPR);
    return lastName + ' ' + firstName + ' ' + middleName;
  }

  protected generateFirstName(genPR: seedrandom.PRNG): string {
    return (genPR() < 0.5 ? this.generateFFirstName(genPR) : this.generateMFirstName(genPR));
  }

  protected generateFFirstName(genPR: seedrandom.PRNG): string {
    return getPrRecord(this.fFirstNames, genPR);
  }

  protected generateMFirstName(genPR: seedrandom.PRNG): string {
    return getPrRecord(this.mFirstNames, genPR);
  }

  protected generateMiddleName(genPR: seedrandom.PRNG): string {
    return getPrRecord(this.middleNames, genPR).trim() + (genPR() < 0.5 ? 'івна' : 'ович');
  }

  protected generateAddress(genPR: seedrandom.PRNG): string {
    const street = this.generateStreet(genPR);
    const city = this.generateCity(genPR);
    const house = 'д. ' + getPrNum(MIN_HOUSE_NUMBER, MAX_HOUSE_NUMBER, genPR);
    const flat = city.slice(0, 1) == 'м' ? 'кв. ' + getPrNum(MIN_FLAT_NUMBER, MAX_FLAT_NUMBER, genPR) + ', ' : '';
    const index = this.generateIndex(genPR);
    return street + ', ' + house + ', ' + flat + city + ', ' + index;
  }
}
