const RoomManager = require('./room-manager')
/**
 * 房间统一管理
 * key: roomId
 * value: {RoomManager}
 * RoomInfo.room: {Room} 房间类实例
 * RoomInfo.game: {Game} 该房间的游戏类实例，每个房间有且仅有一个游戏
 */
let rooms = {}

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
    console.info(`Creating new room ${roomId}`)
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
    const roomManager = rooms[this.roomId]
    // 调用钩子
    this.beforeEnter(socket)

    socket.join(this.roomId)

    roomManager.addPlayer(player)

    console.info(`[Room] : ${socket.id} enters room ${this.roomId}`)

    // 调用钩子
    roomManager.game.onEnter(socket, player)
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
    const player = getPlayers().find(player => player.socket.id === socket.id)
    const roomManager = rooms[this.roomId]

    if (player) {
      // 调用钩子
      this.beforeLeave(socket)

      roomManager.removePlayer(socket.id)
      console.info(`[Room] : ${socket.id} leaves room ${this.roomId}`)

      // 房间内没有玩家后自动销毁
      if (this.getPlayers().length === 0) {
        delete rooms[this.roomId]
        console.info(`[Room] : room ${this.roomId} has no players, so it's removed from the list of rooms.`)
      }

      // 调用钩子
      this.afterLeave(socket)

      return true
    } else {
      console.info(`[Room] : failed to leave, because room ${this.roomId} does not exist.`)
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
    return rooms[this.roomId].game
  }
  
  /**
   * 获得房间内的所有玩家
   * @memberof Room
   */
  getPlayers () {
    const obj = rooms[this.roomId].players
    return obj.map(socketId => obj[socketId]) || []
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
  if (!rooms[roomId]) {
    const room = new Room(channel, roomId)
    const players = []
    const roomInfo = new RoomManager(room, game, players)
    rooms[roomId] = roomInfo
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
const getRoom = function (roomId) {
  if (rooms[roomId]) {
    return rooms[roomId].room
  } else {
    return false
  }
}

module.exports = {
  get: getRoom,
  create: createRoom
}
