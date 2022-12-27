import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BasicUaserFileDto} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-item-file',
  templateUrl: './item-file.component.html',
  styleUrls: ['./item-file.component.css']
})
export class ItemFileComponent {

    @Input() userFile: BasicUaserFileDto;
    @Output() whenSelect = new EventEmitter<BasicUaserFileDto>();

    emitFile() {
        this.whenSelect.emit(this.userFile);
    }

}
