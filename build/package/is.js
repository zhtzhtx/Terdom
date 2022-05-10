// 判断是否为数组
export const array = Array.isArray;
// 判断是否为字符串或数字
export function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
// 判断是否为vnode
export function isVnode(s) {
    return !!s.sel;
}
