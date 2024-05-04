const experss = require("express"),
  cors = require("cors"),
  app = experss();
const Contact = require("./mongo");

app.use(cors());

app.use(experss.static("dist"));
app.use(experss.json());

app.get("/api/persons", (_, res) =>
  Contact.find({}).then((contacts) => res.json(contacts))
);

app.get("/api/persons/:id", (req, res) => {
  Contact.findById(req.params.id).then((person) => {
    if (person) {
      res.status(202).json(person);
    } else {
      res.status(404).send("No person found with the id: " + id);
    }
  });
});

app.delete("/api/persons/:id", (req, res) => {
  Contact.findByIdAndDelete(req.params.id)
    .then((_) => res.status(202).end())
    .catch((e) =>
      res.status(404).send("No person found with the id: " + req.params.id)
    );
});

app.post("/api/persons/", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res
      .status(400)
      .json({ message: "Name or Phone number is missing " });
  }
  const newContact = new Contact({
    name: body.name,
    number: Number(body.number),
  });

  newContact.save().then((savedContact) => res.status(202).json(savedContact));
});

app.get("/info", (req, res) => {
  Contact.find({}).then((contacts) =>
    res
      .status(200)
      .end(
        `Phonebook has info for ${contacts.length} people. \n ${new Date(
          Date.now()
        )}`
      )
  );
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`App is running at port ${PORT}`));
