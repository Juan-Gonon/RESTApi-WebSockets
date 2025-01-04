/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { UuidAdapter } from '../../config/uuid.adapter'
import { Ticket } from '../../domain/interfaces/ticket'

export class TicketService {
  private readonly tickets: Ticket[] = [
    {
      id: UuidAdapter.v4(),
      number: 1,
      createdAt: new Date(),
      done: false
    },
    {
      id: UuidAdapter.v4(),
      number: 2,
      createdAt: new Date(),
      done: false
    },
    {
      id: UuidAdapter.v4(),
      number: 3,
      createdAt: new Date(),
      done: false
    }
  ]

  public get pendingTickets (): Ticket[] {
    return this.tickets.filter((ticket) => !ticket.handleAtDesk)
  }

  public lastTicketNumber (): number {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0
  }

  public createTicket (): Ticket {
    const newTicket: Ticket = {
      id: UuidAdapter.v4(),
      number: this.lastTicketNumber() + 1,
      createdAt: new Date(),
      done: false
    }

    this.tickets.push(newTicket)

    // TODO: WS

    return newTicket
  }

  public drawTicket (desk: string): Object {
    const ticket = this.tickets.find((ticket) => !ticket.handleAtDesk)

    if (!ticket) return { status: 'error', message: 'No hay tickets pendientes' }

    ticket.handleAtDesk = desk
    ticket.handleAt = new Date()

    // TODO WS

    return { status: 'ok', ticket }
  }

  public onFinishedTicket (id: string): Object {
    const ticket = this.tickets.find((ticket) => ticket.id === id)

    if (!ticket) return { status: 'error', message: 'Ticket no encontrado' }

    this.tickets.map((ticket) => {
      if (ticket.id === id) {
        ticket.done = true
      }

      return ticket
    })

    return { status: 'ok' }
  }
}
