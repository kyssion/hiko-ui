# 设计思路 :

数据域: => 用于圈定一个范围 ,在这个范围中 , 所有的组件都可以访问到数据域中的数据 .
组件 : 对应页面的真正的dom 负责渲染页面
事件 : 页面中所有的动作都集成在事件中 , 整个流程就是  事件 -> 修改数据域数据 -> 修改组件信息

# 数据域规则

其实本质上是数据域完成下面的组件的操作

1. 一个数据局域是一个 对象 比如:
   ```
   {
       name:123
   }
   ```
2. 数据域中每一个数据都是和一个组件绑定的. 也就是说组件的数据来源就是一个数据域 ,  组件和事件映射是双向的 .
   ```
   {
       "组件ID":"取数表达式" -> 取数表达是就是获取数据的方法 , 就是数据的路径 比如 , name.age[123], 表示的就是获取 对象或者map 中的name字段的age数组的第123 号.
   }
   ```
   ```
   {
       "name.age[123]" : list ("组件ID")
   }
   ```
   组件和数据双向绑定 , 就会数据更新快速找到需要变化的组件  , 组件可以快速地获取到数据 .

3. 一个组件只能绑定一个数据来源, 但是一个数据源可以对应多个组件 => 这里是防止状态不一致导致征用, 比如A组件可以同时获取 1 和 2 数据源的数据, 这种情况下就会发生状态不确定的问题 .  
   这个逻辑就是 , 组件修改的数据来源只能有一个, 但是一个数据来源可以修改多个组件
4. 数据与的可见性 . =>
   其实数据域相当于组件的一个属性 . 只要可以获取到组件 , 就能获取到这个组件所处的数据域和对应的取数逻辑, 通过这个就可以获取到数据信息 .
   也就是说, 对于任意一个组件都可以随意地方位任意一个组件的数据 .

5. 数据域边界问题 => 为啥要有数据域. 主要是为了分装和可控性.
   比如 我封装了一个表单组件 => 外部在调用的时候 , 我其实不希望直接挂载在外部的数据域中(可能会造成数据污染).所以是用数据域 .

数据域数据结构

```
// 基本数据数据结构
{
    "id": xxxx // 指定当前数据域的ID 信息
    "data":{}// 数据域数据
}
// 组件和数据域数据绑定关系数据结构
{
    "组件ID":"取数表达式" -> 取数表达是就是获取数据的方法 , 就是数据的路径 比如 , name.age[123], 表示的就是获取 对象或者map 中的name字段的age数组的第123 号.
}
// 数据域和数据绑定的数据结构
{
    "name.age[123]" : list ("组件ID")
}
```

提供的方法 :
1. 获取指定ID下的数据
2. 解析表达式下的数据
3. 获取一个组件的原始数据 .
4. 获取一个数据的组件依赖 .
5. 重要 : 调用圈定的组件重新渲染 数据域会接受到数据的变化 . 监听数据的修改 . 然后调用组件render函数重新渲染

# 组件规则

目标: 组件需要能直接创建dom . 所以应该还该基本上所有的dom信息 .

其实整个html 分为两个部分  . header和body. 这两个部分应该是隶属于不同的配置信息中

header 配置 :=> 待定

body 配置 :=>

组件应该还有一个概念 : 动态组件和静态组件 .
动态组件是会圈定在一个静态组件中的 . 动态的组件的属性修改依赖本身 , 但是删除添加顺序, 依赖父组件 : todo 再想想

特性 :
1.
   - 静态组件的子组件可以使静态组件 , 也可以是动态组件
   - 动态组件的子组件只能是动态组件
2.
   - 静态组件如果没有数据可以被渲染出来 .
   - 动态组件如果有数据会被渲染, 没有数据会被删除 .
      - 动态组件分为元素动态组件和list动态组件
         - - 元素动态组件和静态组件类似 , 只是和数据强制绑定 .
         - - list动态组件绑定的数据只能是一个数组 , 会遍历数组中每一个数据然后再父元素的子孩子中创建一批元素 . 排序信息是按照list数据进行排序.
      ```
      // 静态组件
      {
          "tag":"p",// 定义元素的标签
          "node_type":"statis" // 标记是动态组件还是静态组件  static 和 dynamic
          "content":"sadfasfasdf"// 定义元素的内容 . 
          "attr":{
              "src":"cccc" , // 定义元素的属性.
          }
          "id":"0-0-0-1", // html的id属性
          "name":["魔术组件"], // html的name信息
          "h_name":[],// 自定义名称- 暂时设计的是展示用的属性
          "data_field":"0" // 定义到数据域的路径
          "default_data": // 默认数据
          "render":"function_id" // -> 定义到渲染函数的位置 -> 支持编程语言或者配置文件 . 
          "child":[
              // 子组件
          ],
          "event": [{
              "OnClick":"function_id" // 监听js事件. 
          }]
          // 重要 todo : 有一个问题 , 如果一个数据发生变更其实还好 , 创建和删除流程要怎么处理 ? 
   
      }
      ```
todo : 创建和删除其实是

组件提供的方法 :
1. 获取子组件列表
2. 获取当前组件各种信息(teg , content , ....)
3. 修改当前组件各种信息 (tag, content, ....)
4. 获取当前组件的父组件 通过ID 树直接知道
5. 获取当前节点的数据 => 和数据域进行关联.
6. 重要 : render函数 => 这个函数其实本质上就是将数据中的数据和自身的属性进行绑定 . 可以适应一个配置文件 , 指定数据应用的属性是谁既可以 .
  render 函数分为静态 render 和动态render .  
   1. 如果是静态的render . -> 只需要做数据的绑定操作进行
   2. 如果是动态的render . -> 需要
      1. 对绑定的数据进行操作 -> 或者其他操作  
      2. 创建或者删除指定的数据 . 
      3. 重新静态组件的方法 渲染节点.

render 需要一批函数文件

# 事件规则

事件组件的核心作用就是触发数据域的数据修改 .

事件本身其实分为两个流程
1. 事件的触发端 (来源)
   - 页面的js事件
   - 定时任务触发
2. 事件的执行端 (处理逻辑)
   - 在当前的设计中, 执行端永远是改变数据 . 然后数据域触发组件更新 .

> 从这个可以看出事件的本质 . 其实是自动调用数据域的通用方法 . 本质上是一批js函数.

- event执行端需要一批函数文件 .
- 额外需要新建一个事件监听器 .