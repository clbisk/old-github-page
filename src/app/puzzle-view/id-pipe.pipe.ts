import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idPipe'
})
export class IdPipePipe implements PipeTransform {

  transform(value: number): string {
    return value.toString().replace(',', '');
  }

}
