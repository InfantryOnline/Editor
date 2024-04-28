import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Directory } from "../../../workspace/directory";
import { BehaviorSubject } from "rxjs";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";

interface FileNode {
    name: string;
    value: File | undefined;
    children?: FileNode[];
}

interface FlatFileNode {
    expandable: boolean;
    name: string;
    level: number;
    value: File | undefined;
}

const lvlFilesTitle = "Lvl Files";
const bloFilesTitle = "Blo Files";
const lioFilesTitle = "Lio Files";

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

    treeData: FileNode[] = [
        { name: lvlFilesTitle, value: undefined, children: [] },
        { name: bloFilesTitle, value: undefined, children: [] },
        { name: lioFilesTitle, value: undefined, children: [] },
    ]

    private _transformer = (node: FileNode, level: number) => {
        return {
          expandable: !!node.children && node.children.length > 0,
          name: node.name,
          level: level,
          value: node.value
        };
    };

    treeControl = new FlatTreeControl<FlatFileNode>(
        node => node.level,
        node => node.expandable
    );

    treeFlattener = new MatTreeFlattener(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.children
    );

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor() { }

    ngOnInit(): void {
        this.directory$
            .subscribe(() => {
                this.buildTrees();
                this.dataSource.data = this.treeData;
            })
    }

    onSelectFile(node: FileNode): void {
        if (node.name.endsWith(this.directory$.value.LevelFileSuffix)) {
            this.lvlSelected.emit(node.value);
        } else if (node.name.endsWith(this.directory$.value.BloFileSuffix)) {
            this.bloSelected.emit(node.value);
        } else if (node.name.endsWith(this.directory$.value.LioFileSuffix)) {
            this.lioSelected.emit(node.value);
        }
    }

    buildTrees(): void {
        this.treeData.forEach(treeBranch => {
            if (treeBranch.name == lioFilesTitle) {
                this.buildTree(treeBranch, this.directory$.value.lioFiles);
            } else if (treeBranch.name == bloFilesTitle) {
                this.buildTree(treeBranch, this.directory$.value.bloFiles);
            } else if (treeBranch.name == lvlFilesTitle) {
                this.buildTree(treeBranch, this.directory$.value.lvlFiles);
            }
        });
    }

    buildTree(treeBranch: FileNode, files: File[]): void {
        treeBranch.children = [];
        files.forEach(file => {
            treeBranch.children?.push({ name: file.name, value: file });
        })
    }

    hasChild = (_: number, node: FlatFileNode) => node.expandable;
}
