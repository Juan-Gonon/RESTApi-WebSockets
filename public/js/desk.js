const lblPending = document.getElementById('lbl-pending')
const deskHeader = document.querySelector('h1')

const btnDraw = document.querySelector('#btn-draw')
const btnDone = document.querySelector('#btn-done')

const searchParams = new URLSearchParams(window.location.search)
const noMoreAlert = document.querySelector('.alert')
const lblCurrentTicket = document.querySelector('small')

if (!searchParams.has('escritorio')) {
  window.location = 'index.html'
  throw new Error('Escritorio es requerido')
}

const deskNumber = searchParams.get('escritorio')
let workingTicket = null
deskHeader.innerText = deskNumber

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

async function getTicket () {
  await finishTicket()
  const { status, ticket, message } = await fetch(`/api/ticket/draw/${deskNumber}`).then(res => res.json())

  if (status === 'error') {
    lblCurrentTicket.innerText = message
    return
  }

  workingTicket = ticket
  lblCurrentTicket.innerText = ticket.number
}

async function finishTicket () {
  if (workingTicket === null) {
    lblCurrentTicket.innerText = 'Seleccione un ticket'
    return
  }
  // console.log(workingTicket)

  const { status, message } = await fetch(`/api/ticket/done/${workingTicket.id}`, { method: 'put' }).then((res) => res.json())

  if (status !== 'ok') {
    lblCurrentTicket.innerText = message
  }

  workingTicket = null
  lblCurrentTicket.innerText = 'Nadie'
}

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

btnDraw.addEventListener('click', getTicket)
btnDone.addEventListener('click', finishTicket)

connectToWebSockets()
loadInitialCount()
