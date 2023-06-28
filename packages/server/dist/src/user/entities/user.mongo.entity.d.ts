import { ObjectId } from 'mongoose';
import { Common } from 'src/shared/entities/common.entity';
export declare class User extends Common {
    name: string;
    email: string;
    role?: ObjectId;
}
