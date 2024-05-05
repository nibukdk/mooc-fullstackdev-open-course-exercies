const experss = require("express"),
  cors = require("cors"),
  app = experss();
const Contact = require("./mongo");

app.use(cors());

app.use(experss.static("dist"));
app.use(experss.json());

app.get("/api/persons", (_, res, next) =>
  Contact.find({})
    .then((contacts) => res.json(contacts))
    .catch((e) => next(e))
);

app.get("/api/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.status(202).json(person);
      } else {
        res.status(404).send("No person found with the id: " + id);
      }
    })
    .catch((e) => next(e));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then((_) => res.status(202).end())
    .catch((e) => next(e));
});

app.post("/api/persons/", (req, res, next) => {
  const body = req.body;
  // if (!body.name || !body.number) {
  //   return res
  //     .status(400)
  //     .json({ message: "Name or Phone number is missing " });
  // }
  const newContact = new Contact({
    name: body.name ?? "",
    number: body.number ?? "",
  });

  newContact
    .save()
    .then((savedContact) => res.status(202).json(savedContact))
    .catch((e) => next(e));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const newContact = {
    name: body.name ?? "",
    number: body.number ?? "",
  };

  Contact.findByIdAndUpdate(req.params.id, newContact, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedContact) => res.status(202).json(updatedContact))
    .catch((e) => next(e));
});

app.get("/info", (req, res, next) => {
  Contact.find({})
    .then((contacts) =>
      res
        .status(200)
        .end(
          `Phonebook has info for ${contacts.length} people. \n ${new Date(
            Date.now()
          )}`
        )
    )
    .catch((e) => next(e));
});

const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(400).send({ message: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).send({
      message: err.message,
    });
  }

  //  else {
  //   return res
  //     .status(400)
  //     .send({ message: "Something went wrong, reload and try again!" });
  // }

  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`App is running at port ${PORT}`));
