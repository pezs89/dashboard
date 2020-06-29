import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objKey',
})
export class ObjKeyPipe<T> implements PipeTransform {
  transform(value: T, args: any[] = null): string[] {
    return Object.keys(value);
  }
}
