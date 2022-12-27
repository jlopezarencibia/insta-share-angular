import { Pipe, PipeTransform } from '@angular/core';
import {FileStatus} from '@shared/service-proxies/service-proxies';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: FileStatus): string {
      switch (value) {
          case FileStatus._0: return 'Processing';
          case FileStatus._1: return 'Pending';
          case FileStatus._2: return 'Ready';
      }
  }

}
