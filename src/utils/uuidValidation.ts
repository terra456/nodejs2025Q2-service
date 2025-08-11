import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'node:crypto';

export class uuidValidation {
  @IsNotEmpty()
  @IsUUID()
  id: UUID;
}
