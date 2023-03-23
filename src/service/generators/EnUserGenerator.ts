import { UserGenerator } from './UserGenerator';
import { Region } from '../../constants';

export class EnUserGenerator extends UserGenerator {
  constructor() {
    super(Region.EN);
  }
}
