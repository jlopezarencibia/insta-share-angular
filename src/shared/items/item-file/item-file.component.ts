import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BasicUaserFileDto} from '@shared/service-proxies/service-proxies';
import {invokeMap} from 'lodash-es';

@Component({
    selector: 'app-item-file',
    templateUrl: './item-file.component.html',
    styleUrls: ['./item-file.component.css']
})
export class ItemFileComponent implements OnInit {

    @Input() userFile: BasicUaserFileDto;
    @Output() whenSelect = new EventEmitter<BasicUaserFileDto>();

    iconType: IconType = IconType.File;
    bgType: BgType = BgType.File;

    ngOnInit(): void {
        this.getIconType();
    }


    getIconType() {
        switch (this.getFileExtension()) {
            case 'jgg':
            case 'png':
            case 'jpeg':
            case 'bmp':
            case 'ico':
                this.iconType = IconType.Image;
                this.bgType = BgType.Image;
                break;
            case 'doc':
            case 'docx':
                this.iconType = IconType.Word;
                this.bgType = BgType.Word;
                break;
            case 'xls':
            case 'xlsx':
                this.iconType = IconType.Excel;
                this.bgType = BgType.Excel;
                break;
            case 'ppt':
            case 'pptx':
                this.iconType = IconType.Ppt;
                this.bgType = BgType.Ppt;
                break;
            case 'pdf':
                this.iconType = IconType.PDF;this.bgType = BgType.PDF;
                break;
            case 'zip':
            case 'gz':
            case 'rar':
            case '7z':
                this.iconType = IconType.Zip;
                this.bgType = BgType.Zip;
                break;
            case 'mpg':
            case 'avi':
            case 'mkv':
            case 'mp4':
            case 'm4v':
                this.iconType = IconType.Video;
                this.bgType = BgType.Video;
                break;
            case 'mp3': case 'wav': case 'aac':
                this.iconType = IconType.Audio;
                this.bgType = BgType.Audio;
            case 'txt':
            case 'rtf':
                this.iconType = IconType.Text;
                this.bgType = BgType.Text;
                break;
            case 'js':
            case 'cs':
            case 'html':
            case 'css':
            case 'scss':
            case 'less':
            case 'ts':
            case 'json':
            case 'xml':
                this.iconType = IconType.Code;
                this.bgType = BgType.Code;
                break;

        }
        return IconType.File;
    }

    emitFile() {
        this.whenSelect.emit(this.userFile);
    }

    getFileExtension() {
        const splittedName = this.userFile.fileName.split('.');
        const lastIndex = splittedName.length - 1;
        return splittedName[lastIndex];
    }
}

enum IconType {
    File = 'fa-file',
    Image = 'fa-file-image',
    Word = 'fa-file-word',
    Excel = 'fa-file-excel',
    PDF = 'fa-file-pdf',
    Ppt = 'fa-file-powerpoint',
    Zip = 'fa-file-zipper',
    Video = 'fa-file-video',
    Text = 'fa-file-text',
    Code = 'fa-file-code',
    Audio = 'fa-file-audio'
}

enum BgType {
    File = 'bg-gradient-gray',
    Image = 'bg-gradient-success',
    Word = 'bg-gradient-blue',
    Excel = 'bg-gradient-green',
    PDF = 'bg-gradient-teal',
    Ppt = 'bg-gradient-red',
    Zip = 'bg-gradient-yellow',
    Video = 'bg-gradient-purple',
    Text = 'bg-gradient-olive',
    Code = 'bg-gradient-primary',
    Audio = 'bg-gradient-info'
}
