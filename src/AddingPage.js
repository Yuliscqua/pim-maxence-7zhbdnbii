import AddGame from './components/AddGame';
import { Link } from 'react-router-dom';
import Header from './components/Header';

function AddingPage () {
    return (
        <div className="addingGame">
            <Header />
            <Link to ="/">Accueil</Link>
            <AddGame />
        </div>
    )    
}

export default AddingPage;
