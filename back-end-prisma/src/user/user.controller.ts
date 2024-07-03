import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserDTO } from './dtos/user.dto';
import { plainToInstance } from 'class-transformer';
import { SearchResponseDTO } from 'src/common/dtos/search-response.dto';
import { SearchOptionDTO } from 'src/common/dtos/search-option.dto';
import { CreateUserDTO } from './dtos/create-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: '사용자 전체 조회',
    description: '사용자 전체를 조회합니다.',
  })
  @ApiOkResponse({ type: UserDTO, isArray: true })
  async findAll() {
    return plainToInstance(UserDTO, await this.userService.findAll());
  }

  @Get('search')
  @ApiOperation({
    summary: '사용자 검색',
    description: '사용자를 검색합니다.',
  })
  @ApiOkResponse({
    type: SearchResponseDTO,
    schema: {
      items: {
        type: 'object',
        $ref: getSchemaPath(UserDTO),
      },
    },
  })
  async search(@Query() option: SearchOptionDTO) {
    const [admins, count] = await this.userService.search(option);

    return {
      items: plainToInstance(UserDTO, admins),
      pageInfo: {
        pageNo: option.pageNo,
        pageSize: option.pageSize,
        totalPages: Math.ceil(count / option.pageSize),
        totalItems: count,
        pageItems: admins.length,
      },
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: '사용자 조회',
    description: '특정 사용자를 조회합니다.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '사용자 ID',
    type: String,
  })
  @ApiOkResponse({ type: UserDTO })
  async findById(@Param('id') id: string) {
    return plainToInstance(UserDTO, await this.userService.findById(id));
  }

  @ApiOperation({
    summary: '사용자 생성',
    description: '새로운 사용자를 생성합니다.',
  })
  @ApiBody({ description: '사용자 생성 데이터', type: CreateUserDTO })
  @Post('create')
  @ApiCreatedResponse({
    description: '성공적으로 생성됨',
    type: UserDTO,
  })
  @ApiBody({ description: '사용자 생성 데이터', type: CreateUserDTO })
  async create(@Body() body: CreateUserDTO) {
    return plainToInstance(UserDTO, await this.userService.create(body));
  }
}
