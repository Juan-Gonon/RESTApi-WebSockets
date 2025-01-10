const currentTicketLbl = document.querySelector('span')
const createTicketBtn = document.querySelector('button')

function getLastTicket () {
  fetch('/api/ticket/last').then((response) => {
    if (response.ok) {
      response.json().then((res) => {
        currentTicketLbl.innerHTML = res
      })
    }
  })
}

function createTicket () {
  fetch('/api/ticket', {
    method: 'post'
  }).then((response) => {
    if (response.ok) {
      response.json().then((res) => {
        currentTicketLbl.innerHTML = res.number
      })
    }
  })
}

createTicketBtn.addEventListener('click', createTicket)

getLastTicket()
