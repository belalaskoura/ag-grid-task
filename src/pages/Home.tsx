import {useNavigate} from "react-router-dom";

export function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Welcome to the Rick and Morty App</h1>
            <div>
                <button onClick={() => navigate('/grid')}>View Characters</button>
            </div>
        </div>        
    )   
}