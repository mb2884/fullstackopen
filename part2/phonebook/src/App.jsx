import { useEffect, useState } from "react";
import personService from "./services/persons";
import { Persons } from "./components/Persons";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const makeInputHandler = setter => e => setter(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    const foundPerson = persons.find(p => p.name === newName);
    // New person: Add them!
    if (!foundPerson) {
      const newPerson = { name: newName, number: newNumber };
      personService.create(newPerson).then(returnedPerson => {
        setPersons([...persons, returnedPerson]);
        setNewName("");
        setNewNumber("");
        setMessage(`Added ${returnedPerson.name}`);
        setError(false);
        setTimeout(() => setMessage(null), 5000);
      });

      return;
    }
    // Duplicate person
    if (
      confirm(
        `${foundPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personService
        .update(foundPerson.id, { ...foundPerson, number: newNumber })
        .then(returnedPerson => {
          setPersons(
            persons.map(p => (p.id !== foundPerson.id ? p : returnedPerson))
          );
          setMessage(
            `Updated ${returnedPerson.name}'s number to ${returnedPerson.number}`
          );
          setError(false);
          setTimeout(() => setMessage(null), 5000);
          setNewNumber("");
          setNewName("");
        })
        .catch(error => {
          setMessage(
            `Information of ${foundPerson.name} has already been removed from server`
          );
          setError(true);
          setPersons(persons.filter(p => p.id !== foundPerson.id));
          setTimeout(() => setMessage(null), 5000);
        });
    }
  };

  const handleDelete = person => {
    if (confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id));
          setMessage(`Deleted ${person.name}`);
          setError(false);
          setTimeout(() => setMessage(null), 5000);
        })
        .catch(error => {
          setMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setError(true);
          setPersons(persons.filter(p => p.id !== person.id));
          setTimeout(() => setMessage(null), 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter
        handleFilterChange={makeInputHandler(setFilter)}
        filter={filter}
      />

      <h2>add a new</h2>

      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={makeInputHandler(setNewName)}
        handleNumberChange={makeInputHandler(setNewNumber)}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
