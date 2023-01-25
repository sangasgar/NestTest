import { BadRequestException, Injectable } from '@nestjs/common';
import { AppEror } from 'src/common/constant/errors';
import { CreateUserDTO } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponce } from './responce';
import { TokenService } from 'src/token/token.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}
  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppEror.USER_EXIST);
    return this.userService.createUser(dto);
  }
  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponce> {
    const userExist = await this.userService.findUserByEmail(dto.email);
    if (!userExist) throw new BadRequestException(AppEror.USER_NOT_EXIST);
    const validtaePassword = await bcrypt.compare(
      dto.password,
      userExist.password,
    );
    if (!validtaePassword) new BadRequestException(AppEror.WRONG_DATA);
    const token = await this.tokenService.generateJWTToken(dto.email);
    const user = await this.userService.piblicUser(dto.email);
    return { ...user, token };
  }
}
