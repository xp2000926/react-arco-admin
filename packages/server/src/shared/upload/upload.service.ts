import { join } from 'path'
import { ensureDir, outputFile } from 'fs-extra'
import { encryptFileMD5 } from '../utils/cryptogram.util'

export class UploadService {
    /**
     * 上传
     * @param file
     */
    async upload(file) {
        //存储文件夹的位置
        const uploadDir =
            !!process.env.UPLOAD_DIR && process.env.UPLOAD_DIR !== ''
                ? process.env.UPLOAD_DIR
                : join(__dirname, '../../..', 'static/upload')
        await ensureDir(uploadDir)
        const currentSign = encryptFileMD5(file.buffer)
        //取扩展字
        const extension = file.originalname.split('.')
        const fileType = extension[extension.length - 1]
        const fileName = currentSign + '.' + fileType
        const uploadPath = uploadDir + '/' + fileName + ''
        // console.log('uploadPath', uploadPath)
        await outputFile(uploadPath, file.buffer)
        return {
            url: '/static/upload/' + fileName,
            path: uploadPath,
        }
    }
}
