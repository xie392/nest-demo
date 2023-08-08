import {
  Controller,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Body,
  HttpException
} from '@nestjs/common'
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express'
import { createWriteStream } from 'fs'
import { join } from 'path'

function reslovePath(path: string) {
  return join(__dirname, '../../public/upload', path)
}

@Controller('upload')
export class UploadController {
  // 单文件上传
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file)
    try {
      const filename = Date.now() + '-' + file.originalname
      const writeStream = createWriteStream(reslovePath(filename))
      writeStream.write(file.buffer)

      return {
        code: 200,
        message: '上传成功',
        data: {
          url: `http://localhost:3000/static/upload/${filename}`
        }
      }
    } catch (err) {
      return {
        code: 500,
        message: '上传失败',
        data: err
      }
    }
  }

  // 多文件上传
  @Post('list')
  @UseInterceptors(
    FileFieldsInterceptor(
      Array.from({ length: 2 }, (_, i) => ({ name: `files-${i}`, maxCount: 1 }))
    )
  )
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      const data: string[] = []
      for (const key in files) {
        const file = files[key][0]
        const filename = Date.now() + '-' + key + '.' + file.originalname?.split('.').at(-1)
        // 以流的形式写入文件
        const writeStream = createWriteStream(reslovePath(filename))
        writeStream.write(file.buffer)
        data.push(`http://localhost:3000/static/upload/${filename}`)
      }

      return {
        code: 200,
        message: '上传成功',
        data
      }
    } catch (err) {
      return {
        code: 500,
        message: '上传失败',
        data: err.message
      }
    }
  }

  // 只能上传图片
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(null, false)
        }
        cb(null, true)
      }
    })
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    // console.log(file)
    if (!file) {
      return '请上传图片格式为jpg|jpeg|png|gif的文件'
    } else {
      return 'ok'
    }
  }
}
