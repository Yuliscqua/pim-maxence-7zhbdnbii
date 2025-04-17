import AddGame from './components/AddGame';
import { Link } from 'react-router-dom';

function AddingPage () {
    return (
        <div className="addingGame">
            <Link to ="/">Accueil</Link>
            <AddGame />
        </div>
    )    
}

export default AddingPage;
