// src/app/models/treeNode.model.ts
export interface SearchNode {
    data: {
        cmnName: string;
        height: number;
        condition: string;
        leafArea: number;
        cStorage: number;
    };
}
