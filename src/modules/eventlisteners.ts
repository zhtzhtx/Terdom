import { VNode, VNodeData } from '../vnode'

type Listener<T> = (this: VNode, ev: T, vnode: VNode) => void

export type On = {
    [N in keyof HTMLElementEventMap]?: Listener<HTMLElementEventMap[N]> | Array<Listener<HTMLElementEventMap[N]>>
} & {
    [event: string]: Listener<any> | Array<Listener<any>>
}

type SomeListener<N extends keyof HTMLElementEventMap> = Listener<HTMLElementEventMap[N]> | Listener<any>

function invokeHandler<N extends keyof HTMLElementEventMap>(handler: SomeListener<N> | Array<SomeListener<N>>, vnode: VNode, event?: Event): void {
    if (typeof handler === 'function') {
        // 如果类型是function，说明只有一个事件监听，将this指向vnode调用
        handler.call(vnode, event, vnode)
    } else if (typeof handler === 'object') {
        // 如果类型是对象，说明有多个事件监听，遍历依次调用
        for (var i = 0; i < handler.length; i++) {
            invokeHandler(handler[i], vnode, event)
        }
    }
}

function handleEvent(event: Event, vnode: VNode) {
    var name = event.type
    var on = (vnode.data as VNodeData).on

    // 如果on中存在事件监听，则进行运行
    if (on && on[name]) {
        invokeHandler(on[name], vnode, event)
    }
}

// 创建一个事件监听的闭包，这样可以确保每次创建的都是一个独立的事件监听
function createListener() {
    return function handler(event: Event) {
        handleEvent(event, (handler as any).vnode)
    }
}

function updateEventListeners(oldVnode: VNode, vnode?: VNode): void {
    // 获取旧VNode中监听的事件
    var oldOn = (oldVnode.data as VNodeData).on
    // 获取旧VNode中已经创建的监听事件
    var oldListener = (oldVnode as any).listener
    // 获取旧VNode的dom
    var oldElm: Element = oldVnode.elm as Element
    // 获取新VNode中监听的事件
    var on = vnode && (vnode.data as VNodeData).on
    // 获取新VNode中已经创建的监听事件
    var elm: Element = (vnode && vnode.elm) as Element
    // 缓存遍历中当前事件的名称
    var name: string

    // 如果新旧VNode监听事件完全一样，直接返回
    if (oldOn === on) {
        return
    }

    // 如果旧VNode中有已经创建的事件监听
    if (oldOn && oldListener) {
        // 如果新VNode中没有事件监听
        if (!on) {
            for (name in oldOn) {
                // 删除旧VNode中的事件监听
                oldElm.removeEventListener(name, oldListener, false)
            }
        } else {
            // 如果新VNode中有事件监听，则遍历旧VNode
            for (name in oldOn) {
                // 如果新VNode中没有当前的事件监听，则删除该事件监听
                if (!on[name]) {
                    oldElm.removeEventListener(name, oldListener, false)
                }
            }
        }
    }

    // 如果新VNode有事件监听
    if (on) {
        // 如果新VNode上已经存在事件监听，则直接继承，如果没有则创建一个新事件监听
        var listener = (vnode as any).listener = (oldVnode as any).listener || createListener()
        // 更新listener上的vnode
        listener.vnode = vnode

        // 如果旧VNode没有事件监听
        if (!oldOn) {
            // 遍历新VNode上的事件监听
            for (name in on) {
                // 将其添加到dom上
                elm.addEventListener(name, listener, false)
            }
        } else {
            // 如果旧VNode有事件监听
            // 遍历新VNode上的事件监听
            for (name in on) {
                // 将旧VNode上没有的事件监听添加到dom上
                if (!oldOn[name]) {
                    elm.addEventListener(name, listener, false)
                }
            }
        }
    }
}

export const eventListenersModule = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners
}
