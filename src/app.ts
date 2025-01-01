import { envs } from './config/envs'
import { AppRouter } from './presentation/router/router'
import { Server } from './presentation/server'

(() => {
  main()
})()

function main (): void {
  const server = new Server({
    port: envs.PORT,
    routes: AppRouter.routes
  })

  server.execute()
}
