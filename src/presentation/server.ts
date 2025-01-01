/* eslint-disable @typescript-eslint/no-extraneous-class */
import express, { Router } from 'express'
import path from 'path'

interface Options {
  port: number
  routes: Router
  publicPath?: string

}

export class Server {
  public readonly app = express()
  private serverListener?: any
  private readonly port: number
  private readonly routes: Router
  private readonly publicPath: string

  constructor (options: Options) {
    const { port, routes, publicPath = 'public' } = options
    this.port = port
    this.routes = routes
    this.publicPath = publicPath
  }

  public execute (): void {
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
      res.sendFile(indexPath)
    })

    // this.app.use(this.routes)

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }

  public close (): void {
    this.serverListener?.close()
  }
}
