import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectAllQuizzes} from './QuizzesSlice';

//Ahorita vemos lo de las tarjetas
//import Card from "../cards/Cars";
/*
{quiz.cardIds.map((id) => (
  <Card key={id} id={id} />
))}
*/


export default function Quiz() {
  const quizzes = useSelector( selectAllQuizzes );
  let { quizId } = useParams();
  const quiz = quizzes.find(quiz => quiz.quizId === quizId);

  return (
    <section>
      <h1>{quiz.name}</h1>
      <ul className="cards-list">
        {quizId}
      </ul>
      <Link to="/new_quiz" className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
