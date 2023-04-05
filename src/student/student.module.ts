import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { studentSchema } from './schemas/student.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Student', schema: studentSchema }])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService]
})
export class StudentModule {}
