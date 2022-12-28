import {Component, EventEmitter, Input, Output} from '@angular/core';
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
        const fileObj = new Blob([this.base64ToArrayBuffer(file.fileBytes)], {type: `application/octet-stream`});
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(fileObj);
        link.download = file.fileName + '.zip';
        link.click();
        link.remove();
        this.action.emit(FileAction.Download);
        this.loading = false;
    }

    async remove() {
        this.loading = true;
        await firstValueFrom(this.fileService.delete(this.file.id));
        this.file = undefined;
        this.action.emit(FileAction.Remove);
        this.loading = false;
    }

    private getFileExtension(): string {
        const src = this.file.fileName.split('.');
        return src[src.length - 1];
    }

    private base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }
}

export enum FileAction {
    Edit = 'Edit',
    Download = 'Download',
    Remove = 'Remove'
}
