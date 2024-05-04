import { Component, Input, OnInit } from "@angular/core";
import { RpgTabContext } from "../../../workspace/tab-context";
import { BehaviorSubject } from "rxjs";
import { TreeNode } from "../../shared/models/tree";
import { RpgEntry, RpgResetKind } from "../../../io/rpg";
import { FormControl, FormGroup } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";

interface FormEntry {
    entry: RpgEntry;
    form: FormGroup;
}

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

    RpgResetKind = RpgResetKind;

    treeData$: BehaviorSubject<TreeNode<RpgEntry>[]> = new BehaviorSubject<TreeNode<RpgEntry>[]>([]);

    categories?: any;

    forms: FormEntry[] = [];
    
    form = new FormGroup({
        skillId: new FormControl(),
        price: new FormControl(),
        cashAdjustment: new FormControl(),
        name: new FormControl(''),
        category: new FormControl(''),
        resetSkills: new FormControl(),
        description: new FormControl(),
        resetInventory: new FormControl(false),
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
        // TODO: Save current form in `forms`, then switch to the new one.
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

    get formattedSkill(): string {
        // NOTE: No need to build out a full blown AST here
        //       since the most we are dealing with are simple
        //       equality comparisons that we need to unfurl
        //       from encoded numeric representations.
        //
        //       The representation syntax is simple and will be
        //       documented once we move this skill out into it's
        //       own file.

        const skill = this.form.get('logic')?.value as string;

        const parts: string[] = [];

        if (!skill) {
            return '';
        }

        let part = '';

        // Run the skill string through a simple state machine.
        for(let i = 0; i < skill.length; i++) {
            let c = skill.charAt(i);

            if (c === '-' || this.isCharNumber(c)) {
                if (part.trim() !== '') {
                    parts.push(part);
                    part = '';
                }

                let digits = '';

                do {
                    digits += c;
                    c = skill.charAt(++i);
                } while (this.isCharNumber(c));

                parts.push(digits);
            }

            part += c;

            // NICE: If we ever build an AST/Lexer/Parser.
            // 
            // if (c === ' ') {

            // } else if (c === '(') {

            // } else if (c === ')') {

            // } else if (c === '|') {

            // } else if (c === '&') {

            // } else if (c === '!') {

            // }
        }

        console.log(parts);

        let interpolatedParts = [];

        for (let part of parts) {
            let num = parseInt(part, 10);

            if (isNaN(num)) {
                interpolatedParts.push(part);
                continue;
            }

            if (num >= 0) { // Skills
                // Skill IDs/Classes do not have a quantity.
                const skill = this.context?.file?.entries.find(t => t.skillId === num);

                if (!skill) {
                    continue;
                }

                interpolatedParts.push(`${skill.name}`);
            } else { // Attributes
                // Attributes are negative, and contain a minimum quantity as part of inventory requirement.
                // The last three digits are the quantity, the preceding (negative) number is the attribute ID

                let id = parseInt(part.slice(0, part.length - 3));
                let qty = parseInt(part.slice(-3, part.length), 10);

                if (isNaN(id) || isNaN(qty)) {
                    continue;
                }
                
                const attr = this.context?.file?.entries.find(t => t.skillId === id);

                if (!attr) {
                    continue;
                }

                interpolatedParts.push(`${attr.name}:${qty}+`);
            }
        }

        return interpolatedParts.join(' ');
    }

    isCharNumber(c: string) : boolean {
        return c >= '0' && c <= '9';
      }
}