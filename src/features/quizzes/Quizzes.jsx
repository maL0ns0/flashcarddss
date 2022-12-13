import { Link } from "react-router-dom";

const Quizzes = () => {
  const quizzes = {}; // replace this with a call to your selector to get all the quizzes in state
  return (
    <section className="center">
      <h1>Quizzes</h1>
      <ul className="quizzes-list">
        {Object.values(quizzes).map((quiz) => (
          <Link key={quiz.id} to={ROUTES.quizRoute(quiz.id)}>
            <li className="quiz">{quiz.name}</li>
          </Link>
        ))}
      </ul>
      <Link to= '/new_quiz' className="button">
        Create New Quiz
      </Link>
    </section>
  );
}

export default Quizzes;