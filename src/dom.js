window.dom = {
    create(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before(node, node2) {
        node.parentNode.insertBefore(node, node2)
    },
    append(parent, node) {
        parent.appendChild(node)
    },
    wrap(node, parent) {
        // 把Parent放到node前面
        // 把node append到parent里
        // 目标: div1
        //        ↓----> div2
        // 变成  div1
        //        ↓----> div3
        //                ↓----> div2
  			// 先把div3 放到div2的前面，再div3.appendChild(div2)
        node.before(node, parent)
        parent.append(node)
    },
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    // empty 把所有子节点删掉
    // 坑：childNodes.length每次的Length会变化
    empty(node) {
        // const {childNodes} = node 等价于const childNodes = node.childNodes
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },
    attr(node, name, value) {
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, string) {
        if (arguments.length === 2) {
            // 适配不同浏览器
            if ('innerText' in node) { 
                node.innerText = string
            } else {
                node.textContent = string
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) { 
                return node.innerText
            } else {
                return node.textContent
            }
        }

    },
    html(node, string) {
        if (arguments.length === 2) {
            //修改
            node.innerHTML = string
        } else if (arguments.length === 1) {
            // 获取内容
            return node.innerHTML
        }
    },
    //改样式
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(div, 'color', 'red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                //dom.style(test, 'border')
                // 获取某个css属性
                return node.style[name]
            }

            if (name instanceof Object) {
                //dom.style(test, {border: '1px solid red', color: 'blue'})
                let object = name
                for (let key in object) {
                    // key : border / color
                    // node.style.border = ....
                    // node.style.color = ...
                    node.style[key] = object[key]
                }
            }
        }

    },
    class: {
        add(node, className) {
         node.classList.add(className)   
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
        return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {
    node.addEventListener(eventName,fn)
    },
    off(node, eventName, fn) {
    node.removeEventListener(eventName,fn)
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
    return node.parentNode
    },
    children(node) {
    return node.children
    },
    siblings(node) {
   return Array.from(node.parentNode.children).filter(n=>n!==node)
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x=x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x=x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++){
        fn.call(null,nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++){
            if (list[i] === node) {
            break
            }
        }
        return i
    }
};