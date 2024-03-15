import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'opinion',
  standalone: true,
})
export class OpinionPipe implements PipeTransform {
  transform(artisan: any): any[] {
    let wholePart = Math.floor(artisan.note);
    let decimal = artisan.note - wholePart;
    let halfPart = 0;
    let empty = 0;
    if (decimal != 0) {
      halfPart = 1;
    }

    if (halfPart + wholePart != 5) {
      empty = 5 - (halfPart + wholePart);
    }
    const fullnote = Array(wholePart).fill(0);
    const halfnote = Array(halfPart).fill(0);
    const emptynote = Array(empty).fill(0);

    const note = [fullnote, halfnote, emptynote];

    return note;
  }
}
