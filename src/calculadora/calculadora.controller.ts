import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { concat } from 'rxjs';
import { resultadoOut } from 'src/dto/resultadoOut';

@Controller('calculadora')
export class CalculadoraController {
    posicion: number = -2;
    parteResultado: string[] = [];
    resultadoParcial: number = 0;
    formato: boolean = false;
    operacion: string = '';
    resultadoOut: resultadoOut = {
        formato: false,
        operacion: ''
    };
    

    @Get('sumar')
    sumar(@Query('a') a:string, @Query('b') b:string): number{
        return parseInt(a)+parseInt(b);
    }

    @Get('restar')
    restar(@Query('a') a:number, @Query('b') b:number): number{
        return a-b;
    }

    @Get('multiplicar')
    multiplicar(@Query('a') a:number, @Query('b') b:number): number{
        return a*b;
    }

    @Get('dividir')
    dividir(@Query('a') a:number, @Query('b') b:number): number{
        return a/b;
    }

    @Get('resultado')
    resultado(@Query('r') r:string): number{
        //multiplicación
        if (r.indexOf('*') > 0){
            console.log('Resultado %s',r);
            this.posicion = r.indexOf('*');
            console.log('Posición %d', this.posicion);
            while (this.posicion > 0){
                this.parteResultado[0] = r.substring(0,this.posicion-1);
                console.log('donde esta el * %d',this.parteResultado[0]);
                if (this.parteResultado[0].length > 1){
                    this.parteResultado[0] = r.substring(0,this.posicion-2);
                    console.log(this.parteResultado[0]);
                    this.parteResultado[1] = r.substring(this.posicion+1,this.posicion+2);
                    console.log(this.parteResultado[1]);
                }
                this.parteResultado[1] = r.substring(this.posicion+1)
                this.posicion = -1;
                console.log('Posición %d en while', this.posicion);
            } 
        }
        else if (r.indexOf('/') > 0){

        }
        return 10;
    }

    @Post('resultadoPost')
    resultadoPost(@Body('r') r:string): number{
        //multiplicación
        if (r.indexOf('*') > 0){
            this.posicion = r.indexOf('*');
            while (this.posicion > 0){
                this.parteResultado[0] = r.substring(0,this.posicion);
                console.log('donde esta el * %s',this.parteResultado[0]);
                if (this.parteResultado[0].length > 1){
                    this.parteResultado[0] = r.substring(0,this.posicion-1);
                    console.log(this.parteResultado[0]);
                    this.parteResultado[1] = r.substring(this.posicion-1,this.posicion);
                    console.log(this.parteResultado[1]);
                    this.parteResultado[2] = r.substring(this.posicion+1,this.posicion+2);
                    console.log(this.parteResultado[2]);
                    this.parteResultado[3] = r.substring(this.posicion+2);
                    console.log(this.parteResultado[3]);
                    this.resultadoParcial = this.multiplicar(parseFloat(this.parteResultado[1]),parseFloat(this.parteResultado[2]));
                    console.log(this.resultadoParcial);
                    r = (this.parteResultado[0].concat(this.resultadoParcial.toString()).concat(this.parteResultado[3]));
                    console.log(r);
                }
                //this.parteResultado[1] = r.substring(this.posicion+1)
                this.posicion = r.indexOf('*');
                //this.posicion = -1;
                console.log('Posición %d en while', this.posicion);
            } 
        }
        else if (r.indexOf('/') > 0){

        }
        return 10;
    }    

    @Post('sumarPost')
    sumarPost(
        @Body('num1') num1: string,
        @Body('num2') num2: string
    )
    {
        return parseInt(num1)+parseInt(num2);
    }

    @Post('restarPost')
    restarPost(
        @Body('num1') num1: number,
        @Body('num2') num2: number
    )
    {
        return num1-num2;
    }  
    
    @Post('multiplicarPost')
    multiplicarPost(
        @Body('num1') num1: number,
        @Body('num2') num2: number
    )
    {
        console.log('N1: %d  N2: %d',num1,num2);
        return num1*num2;
    }       

    @Post('dividirPost')
    dividirPost(
        @Body('num1') num1: number,
        @Body('num2') num2: number
    )
    {
        return num1/num2;
    } 

    @Post('validarFormato')
    validarFormato(
        @Body('r') r: string
    ): resultadoOut{
        var expRegNumero = '^[0-9]+$';

        if (r.indexOf('*') > 0)
        {
            this.parteResultado = r.split('*');
            if (this.parteResultado.length != 2)
            {
                this.formato = false;
                this.operacion = '';
            }
            else if (this.parteResultado[0].match(expRegNumero) != null && this.parteResultado[1].match(expRegNumero) != null)
            {
                this.formato = true;
                this.operacion = '*'
            }
            else
            {
                this.formato = false;
                this.operacion = '';
            }
        }
        else if (r.indexOf('/') > 0){
            this.parteResultado = r.split('/');
            if (this.parteResultado.length != 2)
            {
                this.formato = false;
                this.operacion = '';
            }
            else if (this.parteResultado[0].match(expRegNumero) != null && this.parteResultado[1].match(expRegNumero) != null)
            {
                this.formato = true;
                this.operacion = '/';
            }
            else
            {
                this.formato = false;
                this.operacion = '';
            }            
        }
        else if (r.indexOf('+') > 0){
            this.parteResultado = r.split('+');
            if (this.parteResultado.length != 2)
            {
                this.formato = false;
                this.operacion = '';
            }
            else if (this.parteResultado[0].match(expRegNumero) != null && this.parteResultado[1].match(expRegNumero) != null)
            {
                this.formato = true;
                this.operacion = '+';
            }
            else
            {
                this.formato = false;
                this.operacion = '';
            }            
        }
        else if (r.indexOf('-') > 0){
            this.parteResultado = r.split('-');
            if (this.parteResultado.length != 2)
            {
                this.formato = false;
                this.operacion = '';
            }
            else if (this.parteResultado[0].match(expRegNumero) != null && this.parteResultado[1].match(expRegNumero) != null)
            {
                this.formato = true;
                this.operacion = '-';
            }
            else
            {
                this.formato = false;
                this.operacion = '';
            }            
        }
        //console.log('FORMATO: %s',this.formato);
        //console.log('OPERACIÓN: %s',this.operacion);
        this.resultadoOut.formato = this.formato;
        this.resultadoOut.operacion = this.operacion;
        //console.log('FINAL: %s %s',this.resultadoOut.formato, this.resultadoOut.operacion);
        return this.resultadoOut;
    }
}
