import Mock from 'mockjs';
import setupMock from '@/utils/setupMock';
setupMock({
    mock:false,//关闭mock数据 mock 为 false 关闭，true 开启
    setup() {
        Mock.mock(new RegExp('/api/rele/list'), () => {
            return [
                {

                }, {}, {

                }
            ]
        })
    }
})