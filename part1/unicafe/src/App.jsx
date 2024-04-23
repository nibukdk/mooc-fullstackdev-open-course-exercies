import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodReview = () => setGood(good + 1);
  const handleBadReview = () => setBad(bad + 1);
  const handleNeutralReview = () => setNeutral(neutral + 1);

  let stats = <p>No Feedback given</p>;

  if (good !== 0 || (bad !== 0 && neutral !== 0)) {
    stats = <Statistics good={good} bad={bad} neutral={neutral} />;
  }

  return (
    <div>
      <Header text="Give Feedback" />
      <div>
        <Button text="good" onClickHandler={handleGoodReview} />
        <Button text="bad" onClickHandler={handleBadReview} />
        <Button text="neutral" onClickHandler={handleNeutralReview} />
      </div>
      <Header text="Statistics" />
      {stats}
    </div>
  );
};

const Header = ({ text }) => <h1> {text}</h1>;

const Button = ({ text, onClickHandler }) => (
  <button onClick={onClickHandler}>{text}</button>
);

const Statistics = ({ good, bad, neutral }) => {
  let totalReviews = bad + good + neutral;
  let positivePercentage = (1 - (bad + neutral) / totalReviews) * 100;
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="totalReviews" value={totalReviews} />
        <StatisticsLine text="average" value={(good - bad) / totalReviews} />
        <StatisticsLine text="posritivePercentage" value={positivePercentage} />
      </tbody>
    </table>
  );
};

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td> {text} </td>
    <td> {value} </td>
  </tr>
);

export default App;
