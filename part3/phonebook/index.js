const experss = require("express"),
  app = experss();

app.use(experss.json());

let contacts = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (_, res) => res.json(contacts));

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = contacts.find((p) => p.id === id);
  if (person) {
    res.status(202).json(person);
  } else {
    res.status(404).send("No person found with the id: " + id);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = contacts.find((p) => p.id === id);

  if (person) {
    contacts = contacts.filter((p) => p.id != id);

    res.status(202).json(contacts);
  } else {
    res.status(404).send("No person found with the id: " + id);
  }
});

app.post("/api/persons/", (req, res) => {
  const body = req.body;

  if (body.name && body.number) {
    if (
      contacts.find((p) => p.name === body.name) ||
      contacts.find((p) => p.number === body.number)
    ) {
      res
        .status(404)
        .json({
          err: "Name or Phone number already exists. THey must be unique.",
        });
      return;
    }
    const person = { id: generateId(), ...body };
    contacts = [...contacts, person];

    res.status(202).json(person);
  } else {
    res.status(404).send("Name or Phone number is missing ");
  }
});

app.get("/info", (req, res) => {
  res
    .status(200)
    .end(
      `Phonebook has info for ${contacts.length} people. \n ${new Date(
        Date.now()
      )}`
    );
});

const PORT = 3001;
app.listen(PORT, () => console.log(`App is running at port ${PORT}`));

let generateId = () =>
  contacts.length === 0 ? 0 : Math.max(...contacts.map((c) => c.id)) + 1;
