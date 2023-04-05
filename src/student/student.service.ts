import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IStudent, IStudentUpdate } from './interfaces/student.interface';
import { Student, StudentLean } from './types';
import { statusMessage } from 'src/utilities/util';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private readonly studentModel:Model<IStudent>) {}
  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  findAll() {
    return `This action returns all student`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  async update(id: Types.ObjectId, data: IStudentUpdate): Promise<Student> {
    return await this.studentModel.findOneAndUpdate({student_id: id}, data)
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }

  async findById(studentId: number) {
    return await this.studentModel.findById(studentId);
}

async findByPhone(phone: string, projection: any, options:any): Promise<StudentLean | undefined> {
  options.lean = true;
  return await this.studentModel.findOne({ phone}, projection, options);
}

async findByEmail(email: string, projection: any, options:any): Promise<StudentLean | undefined> {
  options.lean = true;
  return await this.studentModel.findOne({ email }, projection, options);
}

async updateByStudId(student_id: string | number, dataToSet: any, options?:any): Promise<any | undefined> {
  options.lean = true;
  options.new = true;
  return await this.studentModel.findOneAndUpdate({student_id}, dataToSet, options);
}

async updateByPhone(phone: string | number, dataToSet: any, options?:any): Promise<any | undefined> {
  options.lean = true;
  options.new = true;
  return await this.studentModel.findOneAndUpdate({phone}, dataToSet, options);
}

async updateByMultiCriteria(data: any, dataToSet: any, options?:any): Promise<any | undefined> {
  options.lean = true;
  options.new = true;
  return await this.studentModel.findOneAndUpdate(data, dataToSet, options);
}

hashData(data: string) {
  return bcrypt.hash(data, 10);
}
}
