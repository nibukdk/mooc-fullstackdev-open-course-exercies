import { useState } from "react";

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
  const obj = anecdotes.reduce((o, key) => Object.assign(o, { [key]: 0 }), {});

  const [votes, setVotes] = useState({ ...obj });
  const [popularAnecdote, setPopularAnecdote] = useState({
    anecdote: "",
    vote: 0,
  });

  const generateRandomAnectode = () => {
    const randIndex = Math.floor(Math.random() * anecdotes.length);

    setSelected(randIndex);
  };

  const handleAnecdoteVote = (selectedKey) => {
    const newVotes = { ...votes };
    newVotes[selectedKey] = newVotes[selectedKey] + 1;
    setVotes(newVotes);
    handlePopularAnecdote(newVotes); // update popular vote
  };

  const handlePopularAnecdote = (votesObj) => {
    const hightestAnecdotes = Object.keys(votesObj).reduce((a, b) =>
      votesObj[a] > votesObj[b] ? a : b
    );

    const newPopularAnecdote = {
      ...popularAnecdote,
      anecdote: hightestAnecdotes,
      vote: votesObj[hightestAnecdotes],
    };
    console.log(newPopularAnecdote);

    setPopularAnecdote(newPopularAnecdote);
  };

  return (
    <>
      <Anectode value={anecdotes[selected]} />
      <AnectodeStats voteCount={votes[anecdotes[selected]]} />

      <Button
        onClickHandler={() => handleAnecdoteVote(anecdotes[selected])}
        value="vote"
      />
      <Button onClickHandler={generateRandomAnectode} value="next anecdote" />

      <HighestVotedAnectode
        anecdote={popularAnecdote.anecdote}
        value={popularAnecdote.vote}
      />
    </>
  );
};

const Button = ({ onClickHandler, value }) => {
  return <button onClick={onClickHandler}>{value} </button>;
};

const Anectode = ({ value }) => (
  <>
    <h1>Anecdote of the day</h1>
    <p> {value}</p>
  </>
);

const HighestVotedAnectode = ({ anecdote, value }) => {
  if (value === 0) {
    return <></>;
  }
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p> {anecdote}</p>
      <p> It has {value} votes</p>
    </>
  );
};

const AnectodeStats = ({ voteCount }) => <p> has {voteCount ?? 0} votes.</p>;
export default App;
