const Course = ({ course }) => {
  return (
    <>
      <Header heading={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Header = ({ heading }) => <h1>{heading}</h1>;

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    ))}
  </>
);

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

const Total = ({ parts }) => {
  let exercises = parts
    .map((p) => p.exercises)
    .reduce((e, curVal) => e + curVal, 0);

  return (
    <p>
      <strong> Total of {exercises} exercises</strong>
    </p>
  );
};

export default Course;
