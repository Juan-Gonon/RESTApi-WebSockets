const lblPending = document.getElementById('lbl-pending')
const deskHeader = document.querySelector('h1')

const searchParams = new URLSearchParams(window.location.search)
const noMoreAlert = document.querySelector('.alert')

if (!searchParams.has('escritorio')) {
  window.location = 'index.html'
  throw new Error('Escritorio es requerido')
}

function checkTicketCount (currentCount = 0) {
  // noMoreAlert.classList.toggle('d-none')
  if (currentCount === 0) {
    noMoreAlert.classList.remove('d-none')
  } else {
    noMoreAlert.classList.add('d-none')
  }
  lblPending.innerHTML = currentCount
}

async function loadInitialCount () {
  const pendingTickets = await fetch('/api/ticket').then((resp) => resp.json())
  checkTicketCount(pendingTickets.length)
}

const deskNumber = searchParams.get('escritorio')
deskHeader.innerText = deskNumber

function connectToWebSockets () {
  // eslint-disable-next-line no-undef
  const socket = new WebSocket('ws://localhost:3000/ws')

  socket.onmessage = (event) => {
    //  console.log(event.data) // onTicket-cont-changed
    const { type, payload } = JSON.parse(event.data)
    if (type !== 'on-ticket-count-changed') return
    // lblPending.innerHTML = payload
    checkTicketCount(payload)
  }

  socket.onclose = (event) => {
    console.log('Connection closed')
    setTimeout(() => {
      console.log('retrying to connect')
      connectToWebSockets()
    }, 1500)
  }

  socket.onopen = (event) => {
    console.log('Connected')
  }
}

connectToWebSockets()
loadInitialCount()
