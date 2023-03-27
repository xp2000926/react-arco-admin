"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const doc_1 = require("./doc");
const port = 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    (0, doc_1.generateDocument)(app);
    await app.listen(port, () => {
        console.log(`服务:                 http://localhost:${port}`);
        console.log(`swagger-ui 接口文档:  http://localhost:${port}/api/doc`);
        console.log(`knife4j 接口文档:     http://localhost:${port}/doc.html`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map