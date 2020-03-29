import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import api from '../../services/api';

export default function Logon() {

    const history = useHistory();
    const [Id, setId] = useState('');

    async function handleLogin(e) {

        e.preventDefault();

        try {
            const response = await api.post('sessions', { id: Id });
            localStorage.setItem('ongId', Id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');

        } catch{
            alert('Falaha no logon. Tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input
                        placeholder="Sua ID"
                        value={Id}
                        onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register"><FiLogIn size={16} color="#e02041" /> Não tenho cadastro</Link>
                </form>
            </section>
            <img src={heroesImg} alt="heroes" />
        </div>
    )
}