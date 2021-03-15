import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('权限控制')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Public()
  @ApiOperation({ summary: '登录' })
  @Post('/login')
  async login(@Body() body) {
    return this.authService.login(body)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test')
  test(@Request() req) {
    return req.user
  }
}
