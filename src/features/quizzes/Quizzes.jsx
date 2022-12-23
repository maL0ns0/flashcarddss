import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectAllQuizzes} from './QuizzesSlice.js';


const Quizzes = () => {
  const quizzes = useSelector(selectAllQuizzes);
  return (
    <section className="center">
      <h1>Quizzes</h1>
      <ul className="quizzes-list">
        {quizzes.map( quiz => (
          <Link key={quiz.quizId} to={`/quizzes/${quiz.quizId}`}>
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