import { VNode } from '../vnode';
export declare type VNodeStyle = Record<string, string>;
/**
 *  在snabbdom中style有三个额外的生命周期delayed, remove和destroy，主要是方便我们css动画的使用，而我们terdom是为了学习虚拟dom
 * 的原理，所以这里我删除这两个生命周期，方便源码的阅读。
 * */
declare function updateStyle(oldVnode: VNode, vnode: VNode): void;
export declare const styleModule: {
    create: typeof updateStyle;
    update: typeof updateStyle;
};
export {};
