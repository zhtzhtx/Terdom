import { init } from '../../build/package/init.js'
import { h } from '../../build/package/h.js'

// 2. 注册模块
let patch = init()
// 3. 使用h()函数的第二个参数传入模块需要的数据(对象)
let content = h('div', [
    h('h1', '欢迎使用Terdom'),
    h('p', '掘金博文:'),
    h('a', {
        props: {
            href: "https://juejin.cn/user/1011206430663511/posts"
        }
    }, 'https://juejin.cn/user/1011206430663511/posts'),
    h('p', '源码地址:'),
    h('a', {
        props: {
            href: "https://github.com/zhtzhtx?tab=repositories"
        }
    }, 'https://github.com/zhtzhtx?tab=repositories')
])

let vnode = h('div', {
    style: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        "justify-content": "center",
        "align-items": "center"
    }
}, [content])



function eventHandler() {
    alert('点击')
}

let app = document.querySelector('#app')

patch(app, vnode)