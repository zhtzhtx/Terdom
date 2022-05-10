/**
 *  在snabbdom中style有三个额外的生命周期delayed, remove和destroy，主要是方便我们css动画的使用，而我们terdom是为了学习虚拟dom
 * 的原理，所以这里我删除这两个生命周期，方便源码的阅读。
 * */
function updateStyle(oldVnode, vnode) {
    // 缓存遍历中当前新VNode中的style
    var cur;
    // 缓存遍历中当前style的name
    var name;
    // 获取dom节点
    var elm = vnode.elm;
    // 获取旧VNode的style
    var oldStyle = oldVnode.data.style;
    // 获取新VNode的style
    var style = vnode.data.style;
    // 如果新旧VNode都没有设置style，直接返回
    if (!oldStyle && !style)
        return;
    // 如果新旧VNode的style完全相同，直接返回
    if (oldStyle === style)
        return;
    // 如果没有旧VNode的style，设置为空对象
    oldStyle = oldStyle || {};
    // 如果没有新VNode的style，设置为空对象
    style = style || {};
    // 遍历旧VNode的style
    for (name in oldStyle) {
        // 如果新VNode中没有相同name的style
        if (!style[name]) {
            if (name[0] === '-' && name[1] === '-') {
                // 如果是以 -- 开头,代表是css变量,使用removeProperty删除
                elm.style.removeProperty(name);
            }
            else {
                // 否则直接设为空
                elm.style[name] = '';
            }
        }
    }
    // 遍历新VNode中的style
    for (name in style) {
        // 缓存当前style的值
        cur = style[name];
        if (cur !== oldStyle[name]) {
            if (name[0] === '-' && name[1] === '-') {
                // 如果是以 -- 开头,代表是css变量,使用setProperty设置
                elm.style.setProperty(name, cur);
            }
            else {
                // 否则直接设置
                elm.style[name] = cur;
            }
        }
    }
}
export const styleModule = {
    create: updateStyle,
    update: updateStyle,
};
