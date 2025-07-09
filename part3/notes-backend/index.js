require("dotenv").config();
const express = require("express");
const Note = require("./models/note");

const app = express();

app.use(express.json());
app.use(express.static("dist"));

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

// Home page
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// GET all notes
app.get("/api/notes", (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes);
  });
});

// GET specific note
app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note);
  });
});

// DELETE specific note
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
});

// POST note
app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then(savedNote => {
    response.json(savedNote);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
