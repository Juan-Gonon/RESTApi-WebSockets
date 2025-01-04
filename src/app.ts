/* eslint-disable @typescript-eslint/no-misused-promises */
import { createServer } from 'http'
import { envs } from './config/envs'
import { AppRouter } from './presentation/router/router'
import { Server } from './presentation/server'
import { WssService } from './presentation/services/wss.service'

(() => {
  main()
})()

function main (): void {
  const server = new Server({
    port: envs.PORT
  })

  const httpServer = createServer(server.app)
  WssService.initWss({ server: httpServer })

  server.setRoutes(AppRouter.routes)

  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port: ${envs.PORT}`)
  })
}
