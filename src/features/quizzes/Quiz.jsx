import './quiz.css';
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectAllQuizzes} from './QuizzesSlice';
import Card from '../cards/Card';

export default function Quiz() {
  const quizzes = useSelector( selectAllQuizzes );
  let { quizId } = useParams();
  const quiz = quizzes.find(quiz => quiz.quizId === quizId);

  return (
    <section className="cardSection">
      <h1 className="titleTwo">{quiz.name}</h1>
      <ul className="cards-list">
        {quiz.cardIds.map((id) => (
        <Card key={id} id={id} />
        ))}
      </ul>
      <Link to="/new_quiz" className="button">
        Create a New Quiz
      </Link>
    </section>
  );
}
