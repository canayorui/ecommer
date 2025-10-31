import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common/decorators';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //definicion de los endpoints
  @HttpCode(200)
  @Get() //Get => http://localhost:3000/users
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;
    return this.usersService.getUsers(validPage, validLimit);
  }
  @HttpCode(200)
  @Get(':id') // Get http://localhost:3000/users/:id
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
  @HttpCode(201)
  @Post() // Post http://localhost:3000/users
  addUser(@Body() user: any) {
    //validaciones basicas
    if (!user.email) return 'El campo email es obligatorio';
    if (!user.name) return 'El campo name es obligatorio';
    if (!user.password) return 'El campo password es obligatorio';
    return this.usersService.addUser(user);
  }
  @HttpCode(200)
  @Put(':id') // Put http://localhost:3000/users/:id
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() user: any) {
    //validaciones
    if (!user.email) return 'El campo email es obligatorio';
    if (!user.name) return 'El campo name es obligatorio';
    if (!user.password) return 'El campo password es obligatorio';
    return this.usersService.updateUser(id, user);
  }
  @HttpCode(200)
  @Delete(':id') // Delete http://localhost:3000/users/:id
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
