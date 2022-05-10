function updateClass(oldVnode, vnode) {
    // 用于缓存遍历中当前class属性的值
    var cur;
    // 用于缓存遍历中当前class的name
    var name;
    // 获取新VNode的dom元素
    var elm = vnode.elm;
    // 获取旧VNode的class数据
    var oldClass = oldVnode.data.class;
    // 获取新VNode的class数据
    var klass = vnode.data.class;
    // 如果新旧VNode都没有class，直接返回
    if (!oldClass && !klass)
        return;
    // 如果新旧VNode完全相同，直接返回
    if (oldClass === klass)
        return;
    // 如果旧VNode没有class，将其设置为空对象
    oldClass = oldClass || {};
    // 如果新VNode没有class，将其设置为空对象
    klass = klass || {};
    // 遍历旧VNode的class
    for (name in oldClass) {
        // 如果当前class旧VNode上有但新VNode没有，则删除该VNode
        if (oldClass[name] &&
            !Object.prototype.hasOwnProperty.call(klass, name)) {
            elm.classList.remove(name);
        }
    }
    // 遍历新Vnodde的class
    for (name in klass) {
        // 如果新旧VNode的class值不同，则根据新VNode的class值是true or false来判断是新增还是删除class
        cur = klass[name];
        if (cur !== oldClass[name]) {
            elm.classList[cur ? 'add' : 'remove'](name);
        }
    }
}
export const classModule = { create: updateClass, update: updateClass };
