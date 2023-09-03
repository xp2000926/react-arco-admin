import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as packageConfig from '../package.json'
import { knife4jSetup } from 'nest-knife4j'
export const generateDocument = app => {
  const options = new DocumentBuilder()
    .setTitle(packageConfig.name)
    .setDescription(packageConfig.description) // 文档介绍
    .setVersion(packageConfig.version) // 文档版本
    .setExternalDoc(packageConfig.name, 'http://localhost:4000/api/doc')
    .addBearerAuth() // jwt 允许token鉴权 增加鉴权功能
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api/doc', app, document)
  knife4jSetup(app, [
    {
      name: packageConfig.version,
      url: `/api/doc-json`,
      swaggerVersion: packageConfig.version,
      location: `/api/doc-json`,
    },
  ])
}
