/**
 * 房间统一管理
 * key: roomId
 * value: {RoomManager}
 */
const roomManager = require('./room-manager')

/**
 * 房间类
 * 提供快速创建房间、加入房间等方法
 * 并对房间内玩家及游戏进行管理
 * 该类提供以下钩子：beforeEnter, afterEnter, beforeLeave, afterLeave
 * @class Room
 */
class Room {
  /**
   * Creates an instance of Room.
   * @param {Channel} channel 
   * @param {Game} game 游戏主要逻辑的实例 
   * @param {Number | String} roomId 
   * @memberof Room
   */
  constructor (channel, roomId) {
    this.roomId = roomId
    this.channel = channel
  }

  /**
   * 加入房间
   * @param {Socket} socket 
   * @param {Player} player 
   * @param {Object} opts 可选参数
   * @memberof Room
   */
  enter (socket, player, opts = {}) {
    const defaultOpts = {}
    const options = Object.assign(defaultOpts, opts)
    // 调用钩子
    this.beforeEnter(socket)

    socket.join(this.roomId)

    roomManager.addPlayer(this.channel.name, this.roomId, socket.id, player)

    // 调用钩子
    this.getGame().onEnter(socket, player)
    this.afterEnter(socket)
  }

  /**
   * 离开房间
   * 当有玩家离开时自动调用
   * @param {Socket} socket
   * @return {Boolean} 
   * @memberof Room
   */
  leave (socket) {
    const player = this.getPlayers().find(player => player.socket.id === socket.id)

    if (player) {
      // 调用钩子
      this.beforeLeave(socket)

      this.getGame().onLeave(socket, player)
      roomManager.removePlayer(this.channel.name, this.roomId, socket.id)

      // 调用钩子
      this.afterLeave(socket)

      return true
    } else {
      return false
    }
  }

  /**
   * 通知房间内所有玩家，包括发送者
   * @param {String} event 
   * @param {any} args 
   * @memberof Room
   */
  emit (event, ...args) {
    this.channel.in(this.roomId).emit(event, ...args)
  }

  /**
   * 通知房间内所有玩家，但不包括发送者
   * @param {String} event 
   * @param {any} args 
   * @memberof Room
   */
  broadcast (event, ...args) {
    this.channel.to(this.roomId).emit(event, ...args)
  }

  /**
   * 获得房间内的游戏实例
   * @memberof Room
   */
  getGame () {
    return roomManager.getRoom(this.channel.name, this.roomId).game
  }

  /**
   * 获得房间内的所有玩家
   * @memberof Room
   */
  getPlayers () {
    const obj = roomManager.getRoom(this.channel.name, this.roomId).players
    return Object.keys(obj).map(socketId => obj[socketId]) || []
  }

  /**
   * 以下为 Room 类钩子函数
   * 可在 Room 继承类中实现
   */
  beforeEnter (socket) {}
  afterEnter (socket) {}
  beforeLeave (socket) {}
  afterLeave (socket) {}
}

/**
 * 手动创建一个新的房间（默认状态下加入一个不存在的房间时会自动创建，见 enterRoom 函数中的 force 选项）
 * @param {Channel} channel
 * @param {Game} game
 * @param {String | Number} roomId
 * @return {Room | false} 房间实例，若房间已存在则返回 false
 */
const createRoom = function (channel, game = null, roomId = 0) {
  if (!roomManager.getRoom(channel.name, roomId)) {
    const room = new Room(channel, roomId)
    roomManager.addRoom(channel.name, room, game)
    return room
  } else {
    return false
  }
}

/**
 * 获得房间
 * @param {String | Number} roomId
 * @return {Room | false} 
 */
const getRoom = function (channel, roomId) {
  return roomManager.getRoom(channel.name, roomId).room
}

module.exports = {
  get: getRoom,
  create: createRoom
}
