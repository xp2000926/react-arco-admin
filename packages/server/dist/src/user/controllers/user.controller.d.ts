import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { PaginationParamsDto } from 'src/shared/dtos/pagination-params.dto';
export declare class UserController {
    private readonly userService;
    private readonly configService;
    constructor(userService: UserService, configService: ConfigService);
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
    } & import("../entities/user.mongo.entity").User>;
    findAll(query: PaginationParamsDto): Promise<{
        data: import("../entities/user.mongo.entity").User[];
        meta: {
            total: number;
        };
    }>;
    findOne(id: string): Promise<import("../entities/user.mongo.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
