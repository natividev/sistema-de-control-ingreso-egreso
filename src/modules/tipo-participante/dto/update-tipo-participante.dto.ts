import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoParticipanteDto } from './create-tipo-participante.dto';

export class UpdateTipoParticipanteDto extends PartialType(CreateTipoParticipanteDto) {}
