export interface Ticket {
  id: string
  number: number
  createdAt: Date
  handleAtDest?: string // Escritorio 1
  handleAt?: Date
  done: boolean
}
