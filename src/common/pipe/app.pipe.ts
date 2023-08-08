import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { ObjectSchema } from 'joi'

@Injectable()
export class AppPipePipe implements PipeTransform {
  private readonly schema: ObjectSchema

  constructor(schema: ObjectSchema) {
    this.schema = schema
  }

  transform(value: any, metadata: ArgumentMetadata) {
    console.log('AppPipePipe', value)
    const { error } = this.schema.validate(value)

    if (error) {
      console.log('error', error)
      throw new BadRequestException('ValidationError:' + error.message)
    }
    return value
  }
}
