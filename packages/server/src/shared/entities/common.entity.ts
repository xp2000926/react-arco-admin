import {
  Column,
  CreateDateColumn,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class Common {
  @ObjectIdColumn()
  _id: ObjectID;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({
    default: false,
    select: false,
  })
  isDelete: boolean;
  @VersionColumn({
    select: false,
  })
  version: number; //本条记录被更新的次数
}
