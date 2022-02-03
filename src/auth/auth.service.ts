import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(username);

    if (user === null) {
      return null;
    } else if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match === true) {
        return user;
      }
      return null;
    }
  }
}
