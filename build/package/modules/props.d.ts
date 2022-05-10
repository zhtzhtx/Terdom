import { VNode } from '../vnode';
export declare type Props = Record<string, any>;
declare function updateProps(oldVnode: VNode, vnode: VNode): void;
export declare const propsModule: {
    create: typeof updateProps;
    update: typeof updateProps;
};
export {};
