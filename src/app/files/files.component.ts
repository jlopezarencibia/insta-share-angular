import {Component, Injector, OnInit} from '@angular/core';
import {BasicUaserFileDto, FileParameter, UserFileServiceProxy} from '@shared/service-proxies/service-proxies';
import {AppComponentBase} from '@shared/app-component-base';
import {firstValueFrom} from '@node_modules/rxjs';
import {FileAction} from '@shared/components/file-information/file-information.component';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.css']
})
export class FilesComponent extends AppComponentBase implements OnInit {

    loading = true;
    fileList: BasicUaserFileDto[];
    selectedFile: BasicUaserFileDto;

    constructor(
        injector: Injector,
        private readonly fileService: UserFileServiceProxy) {
        super(injector);
    }

    async ngOnInit() {
        this.fileList = await firstValueFrom(this.fileService.getAllFilesByUserId(this.appSession.userId));
        this.sortList();
        this.loading = false;
    }

    async fileChanged(files: FileList) {
        for (let i = 0; i < files.length; i++) {
            const fileToUpload = files.item(i);
            const formFile: FileParameter = {
                fileName: fileToUpload.name,
                data: fileToUpload
            };
            const result = await firstValueFrom(this.fileService.uploadFile(this.appSession.userId, formFile));
            console.log(result);
            console.log('uploaded');
            await this.refreshList();
            // this.http.post('https://localhost:44311/api/services/app/UserFile/UploadFile',
            //     formData).subscribe((response) => console.log(response), error => console.log(error));
        }
    }

    async refreshList(action?: FileAction) {
        this.loading = true;
        this.fileList = await firstValueFrom(this.fileService.getAllFilesByUserId(this.appSession.userId));
        this.sortList();
        this.loading = false;
    }

    sortList() {
        this.fileList = this.fileList.sort((a, b) => a.fileName < b.fileName ? 1 : a.fileName === b.fileName ? 0 : -1);
    }

    clearInformation() {
        this.selectedFile = undefined;
    }

    displayInformation(file: BasicUaserFileDto) {
        this.selectedFile = file;
    }
}
