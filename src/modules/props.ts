import { VNode, VNodeData } from '../vnode'

export type Props = Record<string, any>

function updateProps(oldVnode: VNode, vnode: VNode): void {
    // 用于缓存props的name
    var key: string
    // 缓存遍历中当前props的值
    var cur: any
    // 缓存遍历中旧props的值
    var old: any
    // 缓存VNode的dom元素
    var elm = vnode.elm
    // 获取旧VNode的props属性
    var oldProps = (oldVnode.data as VNodeData).props
    // 获取新VNode的props属性
    var props = (vnode.data as VNodeData).props

    // 如果新旧VNode都没有props属性，直接返回
    if (!oldProps && !props) return
    // 如果新旧VNode的props属性完全一样，直接返回
    if (oldProps === props) return
    //  如果旧VNode没有props，将其设置为空对象
    oldProps = oldProps || {}
    //  如果新VNode没有props，将其设置为空对象
    props = props || {}

    // 遍历新VNode的props
    for (key in props) {
        // 缓存当前prop属性的值
        cur = props[key]
        // 缓存旧VNode中同名prop的值
        old = oldProps[key]
        // 如果新旧prop值不同，同时当dom是含有value属性的元素（如：input），当前value值和当前prop值不同时，将值设置为当前prop的值
        if (old !== cur && (key !== 'value' || (elm as any)[key] !== cur)) {
            (elm as any)[key] = cur
        }
    }
}

export const propsModule = { create: updateProps, update: updateProps }
