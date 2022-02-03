import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getUsers(): Promise<User[]> {
    const query = this.createQueryBuilder('user');
    const users = await query.getMany();
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    const user = this.create({
      name,
      email,
      password,
    });

    await this.save(user);
    return user;
  }
}
