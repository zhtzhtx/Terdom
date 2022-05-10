import { VNode } from './vnode';
export declare const array: (arg: any) => arg is any[];
export declare function primitive(s: any): s is (string | number);
export declare function isVnode(s: any): s is VNode;
