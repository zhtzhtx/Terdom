import { VNode } from '../vnode';
export declare type Attrs = Record<string, string | number | boolean>;
declare function updateAttrs(oldVnode: VNode, vnode: VNode): void;
export declare const attributesModule: {
    create: typeof updateAttrs;
    update: typeof updateAttrs;
};
export {};
