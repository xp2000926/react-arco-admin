"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDocument = void 0;
const swagger_1 = require("@nestjs/swagger");
const packageConfig = require("../package.json");
const nest_knife4j_1 = require("nest-knife4j");
const generateDocument = (app) => {
    const options = new swagger_1.DocumentBuilder()
        .setTitle(packageConfig.name)
        .setDescription(packageConfig.description)
        .setVersion(packageConfig.version)
        .setExternalDoc(packageConfig.name, 'http://localhost:4000/api/doc')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/api/doc', app, document);
    (0, nest_knife4j_1.knife4jSetup)(app, [
        {
            name: packageConfig.version,
            url: `/api/doc-json`,
            swaggerVersion: packageConfig.version,
            location: `/api/doc-json`,
        },
    ]);
};
exports.generateDocument = generateDocument;
//# sourceMappingURL=doc.js.map