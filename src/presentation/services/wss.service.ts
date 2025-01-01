/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Server } from 'http'
import { WebSocketServer, WebSocket } from 'ws'

interface Options {
  server: Server
  path?: string // ws
}

export class WssService {
  private static _instance: WssService
  private readonly wss: WebSocketServer

  private constructor (options: Options) {
    const { server, path = '/ws' } = options

    this.wss = new WebSocketServer({ server, path })
    this.start()
  }

  static get instance (): WssService {
    if (!WssService._instance) {
      throw 'WssService is not initialized'
    }

    return WssService._instance
  }

  static initWss (options: Options): void {
    WssService._instance = new WssService(options)
  }

  public start (): void {
    this.wss.on('connection', (ws: WebSocket) => {
      console.log('Client connected')

      ws.on('close', () => console.log('Client disconnected'))
    })
  }
}
