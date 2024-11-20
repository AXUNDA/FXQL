import { IsNotEmpty, IsString } from 'class-validator';

export class FXQLPayloadDto {
  @IsString()
  @IsNotEmpty()
  FXQL: string;
}
