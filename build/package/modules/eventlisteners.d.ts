import { VNode } from '../vnode';
declare type Listener<T> = (this: VNode, ev: T, vnode: VNode) => void;
export declare type On = {
    [N in keyof HTMLElementEventMap]?: Listener<HTMLElementEventMap[N]> | Array<Listener<HTMLElementEventMap[N]>>;
} & {
    [event: string]: Listener<any> | Array<Listener<any>>;
};
declare function updateEventListeners(oldVnode: VNode, vnode?: VNode): void;
export declare const eventListenersModule: {
    create: typeof updateEventListeners;
    update: typeof updateEventListeners;
    destroy: typeof updateEventListeners;
};
export {};
