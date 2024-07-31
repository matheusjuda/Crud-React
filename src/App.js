import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './componentes/Home';
import Alunos from './componentes/Alunos';
import Sobre from './componentes/Sobre';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>Lista de Alunos</h1>
      <BrowserRouter>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/" activeClassName="active">Página Inicial</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/alunos" activeClassName="active">Cadastro Alunos</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/sobre" activeClassName="active">Sobre</NavLink>
          </li>
        </ul>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/alunos' element={<Alunos />} />
          <Route path='/sobre' element={<Sobre />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
