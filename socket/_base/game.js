/**
 * 游戏核心逻辑基础类
 * -----
 * @class Game
 */
class Game {
  /**
   * Creates an instance of Game.
   * @param {Channel} channel 
   * @memberof Game
   */
  constructor (channel) {
    this.channel = channel
    this.room = null
  }

  /**
   * 绑定房间
   * @param {Room} room 
   */
  bindRoom (room) {
    this.room = room
  }

  /**
   * 钩子函数，有玩家进入房间后调用
   * @param {Room} room 进入的房间
   * @param {Socket} socket
   * @param {Player} player
   */
  onEnter (room, socket, player) {}
}