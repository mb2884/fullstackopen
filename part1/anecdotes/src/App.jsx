import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const AnecdoteDisplay = ({ title, anecdotes, index, votes }) => {
  return (
    <>
      <h1>{title}</h1>
      {anecdotes[index]}
      <br />
      has {votes[index]} votes
      <br />
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const maxIndex = votes.indexOf(Math.max.apply(Math, votes));

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleNextClick = () => {
    setSelected(randomInteger(0, anecdotes.length - 1));
  };

  const handleVotesClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <AnecdoteDisplay
        title={"Anecdote of the day"}
        anecdotes={anecdotes}
        index={selected}
        votes={votes}
      />
      <Button onClick={handleVotesClick} text={"votes"} />
      <Button onClick={handleNextClick} text={"next anecdote"} />
      <AnecdoteDisplay
        title={"Anecdote with most votes"}
        anecdotes={anecdotes}
        index={maxIndex}
        votes={votes}
      />
    </div>
  );
};

export default App;
