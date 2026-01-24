import bcrypt from 'node_modules/bcryptjs';
import { HashingService } from './hashing.service';

export class BcryptHashService extends HashingService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, hashed);
    return isValid;
  }
}
