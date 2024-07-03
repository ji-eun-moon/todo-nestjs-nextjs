import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, Validate } from 'class-validator';
import { PasswordMatch } from '../validators/password-match.validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: '아이디를 입력해 주세요.' })
  @ApiProperty({ description: '아이디', example: 'username' })
  username: string;

  @IsNotEmpty({ message: '연락처를 입력해 주세요.' })
  @ApiPropertyOptional({ description: '연락처', example: '010-1234-5678' })
  contact: string;

  @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @ApiProperty({ description: '비밀번호', example: 'password' })
  password: string;

  @IsNotEmpty({ message: '비밀번호를 다시 한 번 입력해 주세요.' })
  @Validate(PasswordMatch, { message: '비밀번호가 일치하지 않습니다.' })
  @ApiProperty({ description: '비밀번호 확인', example: 'password' })
  passwordConfirm: string;
}
