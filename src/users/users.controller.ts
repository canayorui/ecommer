import { Controller, ParseUUIDPipe } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common/decorators';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';
import { UpdateUserAdminDto, UpdateUserDto } from 'src/dto/user.dto';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Role } from 'src/auth/enums/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;

    return this.usersService.getUsers(validPage, validLimit);
  }
  @HttpCode(200)
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Patch(':id/admin')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateAdminStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateUserAdminDto,
  ) {
    return this.usersService.setAdminStatus(id, payload.isAdmin);
  }
}
