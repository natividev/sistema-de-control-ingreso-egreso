import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneraleDto } from './create-generale.dto';

export class UpdateGeneraleDto extends PartialType(CreateGeneraleDto) {}
