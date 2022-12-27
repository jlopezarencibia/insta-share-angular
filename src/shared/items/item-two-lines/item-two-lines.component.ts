import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-item-two-lines',
  templateUrl: './item-two-lines.component.html',
  styleUrls: ['./item-two-lines.component.css']
})
export class ItemTwoLinesComponent {

    @Input() title: string;
    @Input() value: string;

}
