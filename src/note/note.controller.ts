import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Request, Query, ParseIntPipe } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createNoteDto: CreateNoteDto ,@Request() req:{user:{sub:number}}) {
    return this.noteService.create(createNoteDto ,req.user.sub);
  }

@UseGuards(AuthGuard)
@Get()
findAll(
  @Request() req: { user: { sub: number } },
  @Query('take', new ParseIntPipe({ optional: true })) take?: number,
  @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
) {
  const takeValue = take ?? 10; // default to 10
  const skipValue = skip ?? 5;  // default to 5

  return this.noteService.findAll({ take: takeValue, skip: skipValue }, req.user.sub);
}

@UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number ,@Request() req:{user:{sub:number}}) {
  
    return this.noteService.findOne(id ,req.user.sub);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(+id);
  }
}
