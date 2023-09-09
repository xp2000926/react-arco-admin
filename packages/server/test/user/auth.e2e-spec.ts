import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { UserModule } from '../../src/user/user.module'
import * as request from 'supertest'

describe('AuthController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  describe('/auth/login (POST)', () => {
    //当用户名和密码正确时应该返回一个token
    it('should return a token when username and password are correct', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ phoneNumber: '18888888888', password: '888888' })
        .expect(201)
      expect(response.body.data.token).toBeDefined()
    })

    //当用户名或密码不正确时，应该返回401 Unauthorized吗
    it('should return 401 Unauthorized when username or password is incorrect', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ phoneNumber: '18888888888', password: '888881' })
        .expect(404)
    })
    afterEach(async () => {
      await app.close()
    })
  })
})
