import { Request, Response } from 'express'

export class TicketController {
  // DI
  // constructor(){}

  public getTickets = async (req: Request, res: Response): Promise<void> => {
    res.json('getTickets')
  }

  public getLastTicketNumber = async (req: Request, res: Response): Promise<void> => {
    res.json('getLastTicketNumber')
  }

  public pendingTickets = async (req: Request, res: Response): Promise<void> => {
    res.json('pendingTickets')
  }

  public createTicket = async (req: Request, res: Response): Promise<void> => {
    res.json('createTicket')
  }

  public drawTicket = async (req: Request, res: Response): Promise<void> => {
    res.json('drawTicket')
  }

  public ticketFinished = async (req: Request, res: Response): Promise<void> => {
    res.json('ticketFinished')
  }

  public workingOn = async (req: Request, res: Response): Promise<void> => {
    res.json('workingOn')
  }
}
