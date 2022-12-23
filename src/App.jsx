import Layout from "./components/Layout"
import {Routes, Route} from 'react-router-dom'
import Topics from './features/topics/Topics'
import Topic from './features/topics/Topic'
import NewTopicForm from './features/topics/NewTopicForm'
import Quizzes from './features/quizzes/Quizzes';
import Quiz from './features/quizzes/Quiz';
import NewQuizForm from './features/quizzes/NewQuizForm';

function App() {
  return(
    <Routes>
      <Route path="/" element={<Layout />}>
      
        <Route path="topics">
          <Route index element={<Topics />} />
          <Route path="new" element={<NewTopicForm />} />
          <Route path=":topicId" element={<Topic />} />
        </Route>

        <Route path="quizzes">
          <Route index element={<Quizzes />} />
          <Route path=":quizId" element={<Quiz/>} />
        </Route>

        <Route path="new_quiz">
          <Route index element={<NewQuizForm />}/>
        </Route>
      
      </Route>
    </Routes>
  );
}

export default App
