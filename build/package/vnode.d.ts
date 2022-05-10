import { On } from './modules/eventlisteners';
import { Attrs } from './modules/attributes';
import { Classes } from './modules/class';
import { Props } from './modules/props';
import { VNodeStyle } from './modules/style';
export declare type Key = string | number;
export interface VNode {
    sel: string | undefined;
    data: VNodeData | undefined;
    children: Array<VNode | string | number> | undefined;
    elm: Node | undefined;
    text: string | number | undefined;
    key: Key | undefined;
}
export interface VNodeData {
    props?: Props;
    attrs?: Attrs;
    class?: Classes;
    style?: VNodeStyle;
    on?: On;
    key?: Key;
}
export declare function vnode(sel: string | undefined, data: any | undefined, children: Array<VNode | string | number> | undefined, text: string | number | undefined, elm: Element | Text | undefined): VNode;
