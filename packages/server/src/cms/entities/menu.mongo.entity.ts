import { Entity, Column } from 'typeorm'
import { Common } from 'src/shared/entities/common.entity'
@Entity()
export class Menu extends Common {
  // 菜单
  @Column('')
  menus: []
}
