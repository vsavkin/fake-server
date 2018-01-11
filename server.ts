import * as express from 'express';
import * as bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let users = [
  { id: 111, name: 'Julie' },
  { id: 222, name: 'Hank' },
  { id: 333, name: 'Al' }
];

let lastId = 1;
let tickets = [
  {
    id: 0,
    description: 'Install a monitor arm',
    assigneeId: 111,
    completed: false
  },
  {
    id: 1,
    description: 'Move the desk to the new location',
    assigneeId: 111,
    completed: false
  }
];


app.get('/api/tickets', (req, res) => {
  setTimeout(() => {
    res.send(tickets);
  }, randomDelay());
});

app.get('/api/users', (req, res) => {
  setTimeout(() => {
    res.send(users);
  }, randomDelay());
});

app.get('/api/ticket/:id', (req, res) => {
  setTimeout(() => {
    const matching = tickets.filter(t => t.id === +req.params.id)[0];
    if (matching) {
      res.send(matching);
    } else {
      res.status(404).send({error: `Cannot find ticket ${+req.params.id}`});
    }
  }, randomDelay());
});

app.get('/api/users/:id', (req, res) => {
  setTimeout(() => {
    const matching = users.filter(t => t.id === +req.params.id)[0];
    if (matching) {
      res.send(matching);
    } else {
      res.status(404).send({error: `Cannot find user ${+req.params.id}`});
    }
  }, randomDelay());
});

app.post('/api/tickets', (req, res) => {
  setTimeout(() => {
    const t = req.body;
    if (!t.description) {
      res.status(500).send({error: `Description is a required field`});
    } else {
      const newTicket = {id: ++lastId, description: t.description, assigneeId: null, completed: false};
      tickets.push(newTicket);
      res.send(newTicket);
    }
  }, randomDelay());
});

app.post('/api/assign', (req, res) => {
  setTimeout(() => {
    const ticketId = req.body.ticketId;
    const assigneeId = req.body.assigneeId;

    const matchingTicket = tickets.filter(t => t.id === ticketId)[0];
    const matchingUser = users.filter(u => u.id === assigneeId)[0];

    if (!matchingTicket) {
      res.status(404).send({error: `Cannot find ticket ${ticketId}`});
    } else if (!matchingUser) {
      res.status(404).send({error: `Cannot find user ${assigneeId}`});
    } else {
      matchingTicket.assigneeId = assigneeId;
      res.send(matchingTicket);
    }
  }, randomDelay());
});

app.post('/api/complete', (req, res) => {
  setTimeout(() => {
    const ticketId = req.body.ticketId;
    const completed = req.body.completed;

    const matchingTicket = tickets.filter(t => t.id === ticketId)[0];

    if (!matchingTicket) {
      res.status(404).send({error: `Cannot find ticket ${ticketId}`});
    } else {
      matchingTicket.completed = completed;
      res.send(matchingTicket);
    }
  }, randomDelay());
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));


function randomDelay() {
  return Math.random() * 4000;
}
