import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'size'
})
export class SizePipe implements PipeTransform {

    transform(size: number) {
        let value = `${(size / (1024 * 1024)).toFixed(2)} MB`;
        if (value.toString() === '0.00 MB') {
            value = `${(size / 1024).toFixed(2)} KB`;
        }
        return value;
    }

}
