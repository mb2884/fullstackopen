export const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <div>
      {persons
        .filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map(person => (
          <div key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => handleDelete(person)}>delete</button>
          </div>
        ))}
    </div>
  );
};
