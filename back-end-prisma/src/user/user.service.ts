import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { hashSync } from 'bcrypt';
import { SearchOptionDTO } from 'src/common/dtos/search-option.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany();
  }

  async search(option: SearchOptionDTO): Promise<[User[], number]> {
    const { pageNo, pageSize, query, orderBy, align } = option;
    const where: Prisma.UserWhereInput = query
      ? { OR: [{ id: { contains: query } }, { username: { contains: query } }] }
      : undefined;

    const take = Number(pageSize);
    const skip = (Number(pageNo) - 1) * take;

    const users = await this.prismaService.user.findMany({
      where,
      orderBy: { [orderBy || 'id']: align || 'desc' },
      take,
      skip,
    });

    const count = await this.prismaService.user.count({ where });

    return [users, count];
  }

  findById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  findByUsername(username: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { username } });
  }

  findByRefreshToken(refreshToken: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: { refreshToken },
    });
  }

  async create(body: CreateUserDTO): Promise<User> {
    const check = await this.findByUsername(body.username);
    if (check) throw new ConflictException('이미 사용 중인 아이디 입니다.');

    return this.prismaService.user.create({
      data: {
        username: body.username,
        contact: body.contact,
        password: hashSync(body.password, 10),
      },
    });
  }

  async setRefreshToken(id: string, refreshToken?: string): Promise<User> {
    const User = await this.findById(id);
    if (!User) throw new NotFoundException('사용자를 찾을 수 없습니다.');
    return this.prismaService.user.update({
      where: { id },
      data: { refreshToken: refreshToken ? refreshToken : null },
    });
  }
}
