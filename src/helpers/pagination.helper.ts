import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDTO {
  @ApiProperty({
    description: 'Quantity of Data, by default 10',
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? parseInt(value) : 10))
  limit: number;

  @ApiProperty({ description: 'Current Page Number', default: 1 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? parseInt(value) : 1))
  @Min(1)
  page: number;

  constructor(partial: Partial<PaginationDTO> = {}) {
    Object.assign(this, {
      limit: 10,
      page: 1,
      ...partial,
    });
  }
}
