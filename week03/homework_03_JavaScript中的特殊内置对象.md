#### JavaScript中的特殊内置对象（Built-in Exotic Object）

1. 绑定函数（Bound Function Exotic Objects）
    * 绑定函数具有以下内部属性：
        * [[BoundTargetFunction]] - 包装的函数对象
        * [[BoundThis]] - 在调用包装函数时始终作为 this 值传递的值
        * [[BoundArguments]] - 列表，在对包装函数做任何调用都会优先用列表元素填充参数列表

2. 数组（Array Exotic Objects）
    * length属性：
        * 0到2的32次方-1
        * 数值内置的修改数组元素个数的方法会改变length的值
        * 修改length的值会修改数组元素的个数

3. 字符串（String Exotic Objects）
    * length属性：
        * 返回字符的个数
        * 不可写且不可配置
    * 支持下标运算，用0或正整数可以取到对应位置上的字符

4. arguments对象（Arguments Exotic Objects）
    * arguments对象是所有（非箭头）函数中都可用的局部变量
    * 此对象包含传递给函数的每个参数，可以像数组一样使用下标来访问每一个参数，第一个参数在索引0处
    * arguments对象不是一个Array，只有一个length属性，但类似与Array，且可以被转换成一个真正的Array，可以使用如下方法转换：
        * Array.prototype.slice.call(arguments)
        * [].slice.call(arguments)
        * Array.from(arguments)
        * [...arguments]

5. 整数索引的对象（Integer-Indexed Exotic Objects）
    * 类型化数组（Typed Arrays）：
        * 可以访问原始二进制数据
        * 是类数组对象
        * 数据缓冲区（ArrayBuffer）：通用的固定长度的二进制缓冲区，不能直接操纵一个ArrayBuffer中的内容
        * 类型数组视图（Typed array views）：创建一个数组类型视图来代表特定格式的缓冲区，从而实现读写缓冲区的内容

6. 模块的命名空间对象（Module Namespace Exotic Objects）

7. 不可变原型对象（Immutable Prototype Exotic Objects）
    * Object.prototype不能再被设置原型
    