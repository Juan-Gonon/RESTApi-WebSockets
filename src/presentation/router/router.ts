import { Router } from 'express'
import { TicketRoutes } from '../tickets/routes'

/* eslint-disable @typescript-eslint/no-extraneous-class */
export class AppRouter {
  static get routes (): Router {
    const router = Router()

    router.use('/api/ticket', TicketRoutes.routes)

    return router
  }
}
