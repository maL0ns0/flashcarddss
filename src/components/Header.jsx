import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <h1>Flash Cards</h1>
            <nav>
                <ul>
                    <li><Link to="topics">Topics</Link></li>
                    <li><Link to="quizzes">Quizzes</Link></li>
                    <li><Link to="new_quiz">New Quiz</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;