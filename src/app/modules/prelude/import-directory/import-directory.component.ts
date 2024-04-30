import { Component, Output, EventEmitter } from "@angular/core";
import { Directory } from "../../../workspace/directory";

/**
 * Prompts the user to load  their infantry directory, so that we may query for the files
 * and allow them to open them.
 */
@Component({
    selector: 'app-import-directory',
    templateUrl: './import-directory.component.html',
    styleUrls: ['./import-directory.component.scss']
})
export class ImportDirectoryComponent {
    @Output() directorySelected: EventEmitter<Directory> = new EventEmitter<Directory>();
    
    onSelectFolder(): void {   
        // Would love to use showDirectoryPicker; sadly Firefox doesn't support it yet,
        // so let's go with the old fallback routine.

        const input = document.createElement('input') as HTMLInputElement;
        input.type = 'file';
        input.webkitdirectory = true;
      
        input.addEventListener('change', () => {
            if (input.files === null) {
                return;
            }

            let directory = new Directory();
            let files: File[] = [];

            for (let i = 0; i < input.files.length; i++) {
                files.push(input.files[i]);
            }

            directory.files = files;

            this.directorySelected.emit(directory);
        });

        if ('showPicker' in HTMLInputElement.prototype) {
            input.showPicker();
        } else {
            input.click();
        }
    }
}