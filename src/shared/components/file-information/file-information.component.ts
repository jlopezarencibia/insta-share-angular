import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BasicUaserFileDto, UserFileServiceProxy} from '@shared/service-proxies/service-proxies';
import {firstValueFrom} from '@node_modules/rxjs';

@Component({
    selector: 'app-file-information',
    templateUrl: './file-information.component.html',
    styleUrls: ['./file-information.component.css']
})
export class FileInformationComponent {

    @Input() file: BasicUaserFileDto;
    @Output() action = new EventEmitter<FileAction>();
    newName = '';
    loading = false;

    isEditing = false;

    constructor(private readonly fileService: UserFileServiceProxy) {

    }

    goToEdit() {
        this.newName = this.file.fileName;
        this.isEditing = true;
    }

    cancelEdit() {
        this.isEditing = false;
        this.newName = this.file.fileName;
    }

    async edit() {
        this.file = await firstValueFrom(this.fileService.rename(this.file.id, this.newName));
        this.action.emit(FileAction.Edit);
        this.cancelEdit();
    }

    download() {

    }

    remove() {

    }
}

export enum FileAction {
    Edit = 'Edit',
    Download = 'Download',
    Remove = 'Remove'
}
