// 暂时不支持SVG相关操作
export interface DOMAPI {
    // 创建元素节点
    createElement: (tagName: any) => HTMLElement
    // 创建文本节点
    createTextNode: (text: string | number) => Text
    // 创建注释节点
    createComment: (text: string | number) => Comment
    // 在指定的已有子节点之前插入新的子节点。
    insertBefore: (parentNode: Node, newNode: Node, referenceNode: Node | null) => void
    // 删除子节点
    removeChild: (node: Node, child: Node) => void
    // 添加子节点
    appendChild: (node: Node, child: Node) => void
    // 获取元素父节点
    parentNode: (node: Node) => Node | null
    // 获取元素紧跟的节点
    nextSibling: (node: Node) => Node | null
    // 获取元素标签名
    tagName: (elm: Element) => string
    // 设置元素文本内容
    setTextContent: (node: Node, text: string | null) => void
    // 获取元素文本内容
    getTextContent: (node: Node) => string | null
    // 判定是否为元素节点
    isElement: (node: Node) => node is Element
    // 判定是否为文本节点
    isText: (node: Node) => node is Text
    // 判定是否为注释节点
    isComment: (node: Node) => node is Comment
}

function createElement(tagName: any): HTMLElement {
    return document.createElement(tagName)
}

function createTextNode(text: string): Text {
    return document.createTextNode(text)
}

function createComment(text: string): Comment {
    return document.createComment(text)
}

function insertBefore(parentNode: Node, newNode: Node, referenceNode: Node | null): void {
    parentNode.insertBefore(newNode, referenceNode)
}

function removeChild(node: Node, child: Node): void {
    node.removeChild(child)
}

function appendChild(node: Node, child: Node): void {
    node.appendChild(child)
}

function parentNode(node: Node): Node | null {
    return node.parentNode
}

function nextSibling(node: Node): Node | null {
    return node.nextSibling
}

function tagName(elm: Element): string {
    return elm.tagName
}

function setTextContent(node: Node, text: string | null): void {
    node.textContent = text
}

function getTextContent(node: Node): string | null {
    return node.textContent
}

function isElement(node: Node): node is Element {
    return node.nodeType === 1
}

function isText(node: Node): node is Text {
    return node.nodeType === 3
}

function isComment(node: Node): node is Comment {
    return node.nodeType === 8
}

export const htmlDomApi: DOMAPI = {
    createElement,
    createTextNode,
    createComment,
    insertBefore,
    removeChild,
    appendChild,
    parentNode,
    nextSibling,
    tagName,
    setTextContent,
    getTextContent,
    isElement,
    isText,
    isComment,
}