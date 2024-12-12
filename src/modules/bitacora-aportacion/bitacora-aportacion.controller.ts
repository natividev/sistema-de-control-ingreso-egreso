import { Controller, Post, Body, Patch, Query, Get } from '@nestjs/common';
import { BitacoraAportacionService } from './bitacora-aportacion.service';
import { CreateBitacoraAportacionDto } from './dto/create-bitacora-aportacion.dto';
import { UpdateBitacoraAportacionDto } from './dto/update-bitacora-aportacion.dto';
import { FilterQueryParams } from '../proyecto/dto/filter-query-params';

@Controller('bitacora-aportacion')
export class BitacoraAportacionController {
  constructor(
    private readonly bitacoraAportacionService: BitacoraAportacionService,
  ) {}

  @Post()
  createBitacora(
    @Body() createBitacoraAportacionDto: CreateBitacoraAportacionDto,
  ) {
    return this.bitacoraAportacionService.createBitacora(
      createBitacoraAportacionDto,
    );
  }

  @Patch()
  updateBitacora(
    @Body() updateBitacoraAportacionDto: UpdateBitacoraAportacionDto,
    @Query('id') id: number,
  ) {
    return this.bitacoraAportacionService.updateBitacora(
      updateBitacoraAportacionDto,
      id,
    );
  }

  @Get()
  async findAll(@Query() filterQueryParams: FilterQueryParams) {
    return await this.bitacoraAportacionService.findAllBitacora(
      filterQueryParams,
    );
  }
}
