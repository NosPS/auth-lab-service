import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<UserEntity | any> {
    try {
      const userEntity: UserEntity = new UserEntity();
      userEntity.username = createUserDto.username;
      userEntity.password = createUserDto.password;
      return await this.userRepository.save(userEntity);
    } catch (error: any) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  async updateRefreshToken(user_id: string, refresh_token: string) {
    return await this.userRepository.update(user_id, { refresh_token: refresh_token });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async findOneByUserId(user_id: string) {
    return await this.userRepository.findOne({ where: { user_id: user_id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
