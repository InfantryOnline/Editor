import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Directory } from "../../../workspace/directory";
import { BehaviorSubject } from "rxjs";
import { TreeNode, BuildTree } from "../../shared/models/tree";

const lvlFilesTitle = "Lvl Files";
const bloFilesTitle = "Blo Files";
const lioFilesTitle = "Lio Files";

const initialTreeData: TreeNode<File>[] = [
    { name: lvlFilesTitle, value: undefined, children: [] },
    { name: bloFilesTitle, value: undefined, children: [] },
    { name: lioFilesTitle, value: undefined, children: [] },
];

@Component({
    selector: 'app-directory',
    templateUrl: './directory.component.html',
    styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
    @Input() directory$ = new BehaviorSubject<Directory>(new Directory());

    @Output() bloSelected: EventEmitter<File> = new EventEmitter<File>();
    @Output() lvlSelected: EventEmitter<File> = new EventEmitter<File>();
    @Output() lioSelected: EventEmitter<File> = new EventEmitter<File>();

    fileTreeData$ = new BehaviorSubject<TreeNode<File>[]>(initialTreeData);

    constructor() { }

    ngOnInit(): void {
        this.directory$
            .subscribe(() => {
                this.buildTrees();
            })
    }

    onSelectFile(node: TreeNode<File>): void {
        if (node.name.endsWith(this.directory$.value.LevelFileSuffix)) {
            this.lvlSelected.emit(node.value);
        } else if (node.name.endsWith(this.directory$.value.BloFileSuffix)) {
            this.bloSelected.emit(node.value);
        } else if (node.name.endsWith(this.directory$.value.LioFileSuffix)) {
            this.lioSelected.emit(node.value);
        }
    }

    buildTrees(): void {
        this.fileTreeData$.value.forEach(treeBranch => {
            if (treeBranch.name == lioFilesTitle) {
                BuildTree(treeBranch, this.directory$.value.lioFiles);
            } else if (treeBranch.name == bloFilesTitle) {
                BuildTree(treeBranch, this.directory$.value.bloFiles);
            } else if (treeBranch.name == lvlFilesTitle) {
                BuildTree(treeBranch, this.directory$.value.lvlFiles);
            }
        });
    }
}
