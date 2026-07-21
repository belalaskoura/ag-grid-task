import {useNavigate} from "react-router-dom";

export function Home() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Welcome to the Rick and Morty App</h1>
            <div className="flex space-x-4">
                <button
                    onClick={() => navigate('/grid')}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >View Characters</button>
                </div>
        </div>        
    )   
}