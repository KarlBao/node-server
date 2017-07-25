## Room 类
---------
### 变量：
`channel` : 房间所属的命名空间

`roomId` : 房间号
### 方法：
`getPlayers()` : 返回此房间内所有玩家的数组

`getGame()` : 返回此房间内游戏的实例

`emit(event, [...args])` : 向房间内所有人发送 socket 事件，包括发送者

`broadcast(event, [...args])` : 向房间内所有人发送 socket 事件，不包括发送者

### 钩子：
`beforeEnter (socket)` : 有玩家进入房间前调用
`afterEnter (socket)` : 有玩家进入房间后调用
`beforeLeave (socket)` : 有玩家离开房间前调用
`afterLeave (socket)` : 有玩家离开房间后调用


## Game 类
---------
### 变量：
`channel` : 房间所属的命名空间

`room` : 游戏所属房间实例

### 方法：

### 钩子：
`onEnter(room, socket, player)` : 有玩家进入房间后逻辑，游戏主逻辑在此钩子中实现


## Player 类
---------
### 变量：
`socket` : 玩家的socket实例

`room` : 玩家所属房间实例

`name` : 玩家的名字，默认是socketId

### 方法：
`enter(room)` ： 进入一个房间

`leave()` : 离开当前房间