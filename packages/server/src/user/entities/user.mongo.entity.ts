import { ObjectId } from 'mongoose'
import { Common } from 'src/shared/entities/common.entity'
import { Column, Entity } from 'typeorm'

@Entity()
export class User extends Common {
  @Column('text')
  name: string
  @Column({ length: 200 })
  email: string
  @Column()
  role?: ObjectId
}
