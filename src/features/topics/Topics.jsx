import NewTopicForm from "./NewTopicForm";
import { Link } from "react-router-dom";
import { selectAllTopics } from "./TopicsSlice";
import { useSelector } from "react-redux";
//import ROUTES from "../../app/routes";
//{ROUTES.topicRoute(topic.id)}
//{ROUTES.newTopicRoute()}

export default function Topics() {
  const topics = useSelector(selectAllTopics); // replace this with a call to your selector to select all the topics in state
  console.log(topics);

  return (
    <section className="center">
      <h1>Topics</h1>
      <ul className="topics-list">
        {topics.map((topic) => (
          <li className="topic" key={topic.id}>
            <Link to="/quizzes" className="topic-link">
              <div className="topic-container">
                <img src={topic.icon} alt="" />
                <div className="text-content">
                  <h2>{topic.name}</h2>
                  <p>{topic.quizIds.length} Quizzes</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/topics/new" className="button create-new-topic-button">
        Create New Topic
      </Link>
    </section>
  );
}
