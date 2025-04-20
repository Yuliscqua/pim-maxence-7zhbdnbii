import AddGame from './components/AddGame';
import Header from './components/Header';
import {useParams } from 'react-router-dom';

function AddingPage () {
    const { userId } = useParams();
    return (
        <div className="addingGame">
            <Header userId={userId}/>
            <AddGame userId={userId}/>
        </div>
    )    
}

export default AddingPage;
