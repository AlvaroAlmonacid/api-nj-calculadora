import { Module } from '@nestjs/common';
import { CalculadoraController } from './calculadora.controller';

@Module({
  controllers: [CalculadoraController]
})
export class CalculadoraModule {}
