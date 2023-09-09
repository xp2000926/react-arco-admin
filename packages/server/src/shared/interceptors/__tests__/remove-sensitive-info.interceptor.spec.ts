import { RemoveSensitiveInfoInterceptor } from './../remove-sensitive-info.interceptor'
//describe =>测试单元
//it 代表-一个测试单元
// expect 断言

describe('remove-sensitive-info.interceptor', () => {
  it('delValue should run ', () => {
    const re = new RemoveSensitiveInfoInterceptor()
    expect(re.delValue({ b: 1 }, 'a')).toEqual({ b: 1 })
    expect(re.delValue({ a: 1, b: 2 }, 'a')).toEqual({ b: 2 })
    expect(
      re.delValue(
        {
          b: {
            a: 1,
          },
        },
        'a',
      ),
    ).toEqual({ b: {} })

    expect(
      re.delValue(
        {
          b: {
            a: 1,
          },
        },
        'a',
      ),
    ).toEqual({ b: {} })

    expect(
      re.delValue(
        {
          b: {
            a: {
              c: 1,
            },
          },
        },
        'a',
      ),
    ).toEqual({ b: {} })

    expect(
      re.delValue(
        {
          b: {
            c: {
              a: 1,
            },
          },
          a: 2,
        },
        'a',
      ),
    ).toEqual({ b: { c: {} } })
  })
})
