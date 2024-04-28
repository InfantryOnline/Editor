export interface TreeNode<T> {
    name: string;
    value: T | undefined;
    children?: TreeNode<T>[];
}

export interface FlatTreeNode<T> {
    expandable: boolean;
    name: string;
    level: number;
    value: T | undefined;
}

export function BuildTree<T>(treeBranch: TreeNode<T>, items: T[]): void {
    treeBranch.children = [];
    items.forEach(item => {
        treeBranch.children?.push({ name: (item as any).name, value: item });
    });
}
