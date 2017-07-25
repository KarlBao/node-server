/**
 * 游戏核心逻辑基础类
 * -----
 * @class Game
 */
class Game {
  /**
   * Creates an instance of Game.
   * @memberof Game
   */
  constructor () {
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
   * @param {Socket} socket
   * @param {Player} player
   */
  onEnter (socket, player) {}

  /**
   * 钩子函数，有玩家离开房间前调用
   * @param {Socket} socket
   * @param {Player} player
   */
  onLeave (socket, player) {}
}

module.exports = Game