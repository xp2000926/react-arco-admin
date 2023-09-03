import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces'

import configuration from './configuration'

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: '.env',
  load: [configuration],
}
