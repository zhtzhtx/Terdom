**<font size="8">Terdom</font>**

一个为了学习Snabbdom虚拟 DOM 库的源码，而实现的虚拟 DOM 库



---

## 介绍

Snabbdom是一款非常优秀的虚拟 DOM 库，阅读其源码有益于我们更进一步了解虚拟 DOM的设计思路，夯实自己基础。

Terdom是在Snabbdom的基础上，删减了非核心功能简化代码，并为每一句代码添加了注释，方便学习Snabbdom源码

## 示例

```mjs
import {
  init,
  h,
} from "snabbdom";

const patch = init();

const container = document.getElementById("container");

const vnode = h("div#container.two.classes", { on: { click: someFn } }, [
  h("span", { style: { fontWeight: "bold" } }, "This is bold"),
  " and this is just normal text",
  h("a", { props: { href: "/foo" } }, "I'll take you places!"),
]);
// 传入一个空的元素节点 - 将产生副作用（修改该节点）
patch(container, vnode);

const newVnode = h(
  "div#container.two.classes",
  { on: { click: anotherEventHandler } },
  [
    h(
      "span",
      { style: { fontWeight: "normal", fontStyle: "italic" } },
      "This is now italic type"
    ),
    " and this is still just normal text",
    h("a", { props: { href: "/bar" } }, "I'll take you places!"),
  ]
);
// 再次调用 `patch`
patch(vnode, newVnode); // 将旧节点更新为新节点
```

