import { vnode } from "./vnode.js";
// 类型判断
import * as is from "./is.js";
export function h(sel, b, c) {
    // 缓存 VNode 数据
    let data = {};
    // 缓存 children 数据
    let children;
    // 缓存文本数据
    let text;
    // 用于缓存遍历children的index
    let i;
    // 处理参数,实现重载的机制
    if (c !== undefined) {
        // 处理三个参数的情况
        // sel、data、children/text
        if (b !== null) {
            data = b;
        }
        if (is.array(c)) {
            children = c;
            // 如果c是字符串或者数字
        }
        else if (is.primitive(c)) {
            text = c;
            // 如果c是VNode
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined && b !== null) {
        // 处理两个参数的情况
        // 如果b是数组
        if (is.array(b)) {
            children = b;
            // 如果b是字符串或数字
        }
        else if (is.primitive(b)) {
            text = b;
        }
        else {
            // 这里由于b没有使用any类型，所以需要进一步判断b是否为VNode
            if (is.isVnode(b)) {
                children = [b];
            }
            else {
                data = b;
            }
        }
    }
    // 处理 children 中的原始值(string/number)
    if (children !== undefined) {
        for (i = 0; i < children.length; ++i) {
            // 如果 child 是string/number,创建文本节点
            // 这里由于children没有使用any类型，所以需要进一步判断children[i]是否为string | number
            // 不能直接使用children[i],所以使用msg缓存
            const msg = children[i];
            if (is.primitive(msg)) {
                children[i] = vnode(undefined, undefined, undefined, msg, undefined);
            }
        }
    }
    // 符合VNode
    return vnode(sel, data, children, text, undefined);
}
