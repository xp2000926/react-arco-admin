import { Injectable } from '@nestjs/common'
import * as svgCaptcha from 'svg-captcha'

@Injectable()
export class CaptchaService {
  async captche(size = 4) {
    const captcha = svgCaptcha.create({
      //可配置返回的图片信息
      size, //生成几个验证码
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 5, // 干扰线条的数量
      mathOperator: '+', // 使用的运算符:+、-或+-(用于随机的+或-)
      fontSize: 50, //文字大小
      width: 100, //验证码高度
      height: 34, //字体大小
      color: false, //开启字体颜色
      background: '#cc9966', //背景颜色
      // charPreset:'abcd123456789', //随机预设字符
    })
    return captcha
  }
}
