import {useNavigate} from "react-router-dom";
import './Home.css'

export function Home() {
    const navigate = useNavigate();
    return (
        <div className="home">
            <h1 >Welcome to the Rick and Morty App</h1>
                <button onClick={() => navigate('/grid')}>View Characters</button>
        </div>        
    )   
}