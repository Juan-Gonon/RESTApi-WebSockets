
function renderTickets (tickets = []) {
  for (let i = 0; i < tickets.length; i++) {
    if (i >= 4) break

    const ticket = tickets[i]

    if (!ticket) continue

    const lblTicket = document.querySelector(`#lbl-ticket-0${i + 1}`)
    const lblDesk = document.querySelector(`#lbl-desk-0${i + 1}`)

    lblTicket.innerHTML = `Ticket ${ticket.number}`
    lblDesk.innerHTML = ticket.handleAtDesk
  }
}

async function loadCurrentTickets (params) {
  const tickets = await fetch('/api/ticket/working-on').then((res) => res.json())

  renderTickets(tickets)

//   console.log(tickets)
}

loadCurrentTickets()
