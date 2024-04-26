import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Directory } from "../../../workspace/directory";

@Component({
    selector: 'app-directory',
    templateUrl: './directory.component.html',
    styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent {
    @Input() directory: Directory = new Directory();

    @Output() bloSelected: EventEmitter<File> = new EventEmitter<File>();
    @Output() lvlSelected: EventEmitter<File> = new EventEmitter<File>();

    onSelectBloFile($event: File): void {
        this.bloSelected.emit($event);
    }

    onSelectLvlFile($event: File): void {
        this.lvlSelected.emit($event);
    }
}