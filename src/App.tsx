import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import {CharacterGrid} from "./pages/CharacterGrid";
export function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grid" element={<CharacterGrid />} />
      </Routes>
    </BrowserRouter>
  );
}