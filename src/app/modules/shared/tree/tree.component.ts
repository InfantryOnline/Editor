import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { TreeNode, FlatTreeNode } from "../models/tree";

@Component({
    selector: 'app-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss']
})
export class TreeComponent<T> implements OnInit {
    @Input() treeData = new BehaviorSubject<TreeNode<T>[]>([]);
    @Output() selected = new EventEmitter<TreeNode<T>>();

    private _transformer = (node: TreeNode<T>, level: number) => {
        return {
          expandable: !!node.children && node.children.length > 0,
          name: node.name,
          level: level,
          value: node.value
        };
    };

    treeControl = new FlatTreeControl<FlatTreeNode<T>>(
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
        this.treeData
            .subscribe(data => {
                this.dataSource.data = data;
            });
    }

    onSelectFile(node: TreeNode<T>): void {
        this.selected.emit(node);
    }

    hasChild = (_: number, node: FlatTreeNode<T>) => node.expandable;
}
