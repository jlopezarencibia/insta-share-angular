import {Component, Injector} from '@angular/core';
import {FileParameter, UserFileServiceProxy} from '@shared/service-proxies/service-proxies';
import {AppComponentBase} from '@shared/app-component-base';
import {firstValueFrom} from '@node_modules/rxjs';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.css']
})
export class FilesComponent extends AppComponentBase {

    constructor(
        injector: Injector,
        private readonly fileService: UserFileServiceProxy) {
        super(injector);
    }

    upload(inputFile: HTMLInputElement) {

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
            // this.http.post('https://localhost:44311/api/services/app/UserFile/UploadFile',
            //     formData).subscribe((response) => console.log(response), error => console.log(error));
        }
    }
}
