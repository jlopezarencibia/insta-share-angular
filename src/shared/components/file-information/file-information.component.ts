import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BasicUaserFileDto, UserFileServiceProxy} from '@shared/service-proxies/service-proxies';
import {firstValueFrom} from '@node_modules/rxjs';
import {browser} from '@node_modules/protractor';

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
        this.loading = true;
        await firstValueFrom(this.fileService.rename(this.file.id, this.newName))
            .catch(() => {
                this.newName = this.file.fileName;
                this.cancelEdit();
                this.loading = false;
                return;
            });
        this.file.fileName = this.newName;
        this.action.emit(FileAction.Edit);
        this.cancelEdit();
        this.loading = false;
    }

    async download() {
        this.loading = true;
        const file = await firstValueFrom(this.fileService.get(this.file.id));
        console.log(file);
        const blob = new Blob([file.fileBytes]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = file.fileName;
        link.click();
        this.action.emit(FileAction.Download);
        this.loading = false;
    }

    async remove() {
        this.loading = true;
        await firstValueFrom(this.fileService.delete(this.file.id));
        this.action.emit(FileAction.Remove);
        this.loading = false;
    }
}

export enum FileAction {
    Edit = 'Edit',
    Download = 'Download',
    Remove = 'Remove'
}
