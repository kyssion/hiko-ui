
let domConfig = [
    {
        "id":"a",
        "type":"div",
        "text":"hello world",
        "style":{

        },
        "attr":{
            "contextmenu":"this is hello world"
        },
        "child":[
            {
                "id":"a-a",
                "type":"button",
                "text":"this is button"
            }
        ]
    }
]

function creatDom(domConfig){
    let ansDoms =[]
    if (domConfig===undefined || domConfig===null || domConfig.length===0){
        return ansDoms
    }
    for (let index =0; index<domConfig.length;index++){
        let itemDomConfig = domConfig[index]
        let itemDom = document.createElement(itemDomConfig.type)
        for (let attr in itemDomConfig.attr){
            console.log(attr)
            itemDom.setAttribute(attr, itemDomConfig.attr[attr])
        }
        itemDom.innerText = itemDomConfig.text
        if (itemDomConfig.child!==undefined && itemDomConfig.child!==null && itemDomConfig.child.length!==0){
            let childDoms = creatDom(itemDomConfig.child)
            for (const cDom of childDoms) {
                console.log("item create")
                itemDom.appendChild(cDom)
            }
        }
        ansDoms.push(itemDom)
    }
    return ansDoms
}
let ans = creatDom(domConfig)
console.log(ans)

for (const item of ans) {
    document.body.appendChild(item)
}