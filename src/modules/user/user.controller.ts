import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './common/user.dto';
import { UsersService } from './user.service';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UsersService) { }

    // @Get()
    // findAll() {
    //     return this.userService.findAll();
    // }


}
