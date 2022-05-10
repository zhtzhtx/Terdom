import { VNode } from '../vnode';
export declare type Classes = Record<string, boolean>;
declare function updateClass(oldVnode: VNode, vnode: VNode): void;
export declare const classModule: {
    create: typeof updateClass;
    update: typeof updateClass;
};
export {};
