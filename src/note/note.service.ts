import { ForbiddenException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma.service';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { error } from 'console';

@Injectable()
export class NoteService {
  private logger = new Logger(NoteService.name)
  constructor(private readonly prismaService:PrismaService){}
   async create(createNoteDto: CreateNoteDto ,userId:number) {

    // create note
   const note =   await this.prismaService.note.create({
      data:{
        title:createNoteDto.body,
        body:createNoteDto.title,
        userId,
      }
    })
    this.logger.log("New note has been created")
    return  note
  }

   async findAll({take ,skip}:{take:number ,skip:number},
    userId:number) {
    const notes =  await  this.prismaService.note.findMany({
      skip,
      take,
      where:{

      userId
    }})
    return notes
  }

  async findOne(id: number ,userId:number) {
    const note =  await this.prismaService.note.findFirst({where :{id}})
    if(!note){
      throw new NotFoundException("Note not found")
    }
    if (note?.userId  !== userId){
      throw new  ForbiddenException("Not allowed")
    }
    return note
  }

  async update(id: number, updateNoteDto: UpdateNoteDto ,userId:number) {
        const note = await this.prismaService.note.findFirst({
          where:{id}
        })   

        // check if exist or not
         if(!note){
      throw new NotFoundException("Note not found")
    }

    //check allowed or not 
    if (note?.userId  !== userId){
      throw new  ForbiddenException("Not allowed")
    }
 const updated = await this.prismaService.note.update({
  where:{
id
  },
  data:updateNoteDto
 })
return updated

  
  }


 async remove(id: number ,userId:number) {
  try {
    
    return await  this.prismaService.note.delete({where :{id ,userId}})
  } catch (error) {
   if(error  instanceof PrismaClientKnownRequestError){
    if(error.code ==='P2025'){
      throw new ForbiddenException("Not allowed")
    }
   }
  }
    throw error

  }
}
