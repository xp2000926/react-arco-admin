import { AppLogger } from '../../shared/logger/logger.service';
import { SystemService } from '../../shared/system.service';
import { MongoRepository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.mongo.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';
export declare class UserService {
    private readonly systemService;
    private readonly userRepository;
    private readonly logger;
    constructor(systemService: SystemService, userRepository: MongoRepository<User>, logger: AppLogger);
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
    } & User>;
    findAll(): Promise<[User[], number]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
