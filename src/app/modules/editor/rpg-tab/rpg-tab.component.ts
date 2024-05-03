import { Component, Input, OnInit } from "@angular/core";
import { RpgTabContext } from "../../../workspace/tab-context";
import { BehaviorSubject } from "rxjs";
import { TreeNode } from "../../shared/models/tree";
import { RpgEntry } from "../../../io/rpg";
import { FormControl, FormGroup } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";

/**
 * Displays the tab for viewing, and modifying Skill (.rpg) files.
 */
@Component({
    selector: 'app-rpg-tab',
    templateUrl: './rpg-tab.component.html',
    styleUrls: ['./rpg-tab.component.scss']
})
export class RpgTabComponent implements OnInit {
    @Input() context?: RpgTabContext;

    treeData$: BehaviorSubject<TreeNode<RpgEntry>[]> = new BehaviorSubject<TreeNode<RpgEntry>[]>([]);

    categories?: any;
    
    form = new FormGroup({
        skillId: new FormControl(),
        price: new FormControl(),
        cashAdjustment: new FormControl(),
        name: new FormControl(''),
        category: new FormControl(''),
        resetSkills: new FormControl(),
        description: new FormControl(),
        resetInventory: new FormControl(),
        defaultVehicleId: new FormControl(),
        blobId: new FormControl(),
        blobName: new FormControl(),
        logic: new FormControl(),
        mutators: new FormControl()
    });

    ngOnInit(): void {      
        this.constructTree();
    }

    onSelectFile($event:any): void {
        this.form.patchValue($event.value);        
    }

    get treeData(): TreeNode<RpgEntry>[] {
        return this.treeData$.value;
    }
    
    constructTree(): void {
        let data = [];

        if (this.context?.file) {
            let entriesByCategory: any[] = [];

            for(let entry of this.context.file.entries) {
                let category = entriesByCategory.find(t => t.category === entry.category);

                if (!category) {
                    category = {
                        category: entry.category,
                        entries: [entry]
                    }   

                    entriesByCategory.push(category);
                } else {
                    category.entries.push(entry);
                }
            }

            for (let category of entriesByCategory) {
                const children = [];

                for (let entry of category.entries) {
                    children.push({
                        name: entry.name.replace(/\"/g, '').trim(),
                        value: entry,
                        children: []
                    })
                }

                data.push({
                    name: category.category,
                    value: category,
                    children: children
                });
            }
        }

        this.treeData$.next(data);
    }

    onChangeCategory($event: MatSelectChange) {
        if ($event.value === null) {
            // TODO: Spawn a box that allows them to type in a new category.
        }
    }
}