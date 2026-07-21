import { useNavigate } from "react-router-dom";
import './Home.css';

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <h1 className="home-heading">Rick and Morty Database</h1>
            <p className="home-text">
                A minimal tracker for dimensional entities, life status, and origin locations.
            </p>
            <button className="home-button" onClick={() => navigate('/grid')}>
                Explore Characters →
            </button>
        </div>        
    );   
}
