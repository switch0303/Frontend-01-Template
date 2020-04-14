#### 引言
关于JavaScript是面向对象还是基于对象的争论一直不断，要回答这个问题还是得先来看看什么是面向对象以及什么是基于对象。
#### 基于对象
[wikipedia](https://en.wikipedia.org/wiki/Object-based_language)上关于基于对象语言的说明如下：
>The term "object-based language" may be used in a technical sense to describe any programming language that uses the idea of encapsulating state and operations inside "objects". 

意思是说”基于对象的语言“可以用来描述使用**将状态和操作封装在“对象”内部**的思想的任何编程语言。
很显然，JavaScript的object具有这个特点。

紧接着，wikipedia上又说道：
>Object-based languages need not support inheritance or subtyping, but those that do are also said to be "object-oriented". Object-based languages that do not support inheritance or subtyping are usually not considered to be true object-oriented languages.

大意是：基于对象的语言不需要支持继承或子类型化。 不支持继承或子类型的基于对象的语言通常不被视为真正的面向对象的语言。
如此看来，JavaScript似乎不是所谓真正的面向对象语言。

#### 面向对象
[wikipedia](https://en.wikipedia.org/wiki/Object-oriented_programming)上关于OOP的页面上有如下说明：
>Object-oriented programming uses objects, but not all of the associated techniques and structures are supported directly in languages that claim to support OOP. The features listed below are common among languages considered to be strongly class- and object-oriented (or multi-paradigm with OOP support), with notable exceptions mentioned.

大意如下：
面向对象的编程使用对象，但是并不是所有支持相关技术和结构的语言都直接支持声称支持OOP的语言。 下面列出的功能在被认为是严格面向类和对象（或带有OOP支持的多范式）的语言之间是常见的，但提到了一些例外。

这说明，关于面向对象的定义其实存在争议，其中有严格的满足所谓面向对象特征的（封装、继承和多态）基于类（calss-based）的语言，如C++、Java等；另外有并不满足所有面向对象特征的基于原型（prototype-based）的语言，如JavaScript。那么JavaScript这种基于原型的语言到底算不算面向对象语言，那就要看一下面向对象编程的本质。

#### 面向对象编程本质

OO语言之父在谈到OOP时是这样说的：[参考资料](https://www.zhihu.com/question/305042684/answer/550196442?utm_source=wechat_session&utm_medium=social&utm_oi=590252861460451328)
> I thought of objects being like biological cells and/or individual computers on a network, only able to communicate with messages (so messaging came at the very beginning -- it took a while to see how to do messaging in a programming language efficiently enough to be useful)....OOP to me means only messaging, local retention and protection and hiding of state-process, and extreme late-binding of all things. It can be done in Smalltalk and in LISP.

大意是：
OOP应该体现一种网状结构，这个结构上的每个节点“Object”只能通过“消息”和其他节点通讯。每个节点会有内部隐藏的状态，状态不可以被直接修改，而应该通过消息传递的方式来间接的修改。

这个编程思想被设计能够编写庞大复杂的系统。

所以面向对象编程的本质可以看作是“独立”和“通讯”。OOP设计思想在前，OOP编码在后，即所谓严格的面向对象语言具有的封装、继承、多态等特性。简单使用OOP语言写代码，程序也不会自动变成OOP。

而且随着编程语言的迭代，人们还会主动抛弃所谓的面向对象语言的特性，比如Go语言对于继承特性的抛弃，但是并不能一刀切地就说它不是面向对象编程语言了。

#### 结论
综上所述，如果按照严格的定义，JavaScript不能算是面向对象编程语言，但是回归到面向对象编程的本质，JavaScript仍然可以算是面向对象编程语言。
