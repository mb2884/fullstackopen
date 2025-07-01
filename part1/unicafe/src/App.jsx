import { useState } from "react";

const Header = () => {
  return <h1>give feedback</h1>;
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ feedback }) => {
  const { good, neutral, bad } = feedback;
  const total = good + neutral + bad;
  if (total !== 0) {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text={"good"} value={good} />
            <StatisticLine text={"neutral"} value={neutral} />
            <StatisticLine text={"bad"} value={bad} />
            <StatisticLine text={"all"} value={total} />
            <StatisticLine text={"average"} value={(good - bad) / total} />
            <StatisticLine
              text={"positive"}
              value={(good / total) * 100 + " %"}
            />
          </tbody>
        </table>
      </>
    );
  }
  return (
    <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td> {text} </td>
      <td> {value} </td>
    </tr>
  );
};

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGoodClick = () => {
    setFeedback({ ...feedback, good: feedback.good + 1 });
  };
  const handleNeutralClick = () => {
    setFeedback({ ...feedback, neutral: feedback.neutral + 1 });
  };
  const handleBadClick = () => {
    setFeedback({ ...feedback, bad: feedback.bad + 1 });
  };

  return (
    <div>
      <Header />
      <Button onClick={handleGoodClick} text={"good"} />
      <Button onClick={handleNeutralClick} text={"neutral"} />
      <Button onClick={handleBadClick} text={"bad"} />
      <Statistics feedback={feedback} />
    </div>
  );
};

export default App;
