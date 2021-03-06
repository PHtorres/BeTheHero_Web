import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    if (!ongId) {
        history.push('/');
    }

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleNewIncident(e) {
        e.preventDefault();

        const dados = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', dados, {
                headers: {
                    Authorization: ongId
                }
            });

            alert('Caso salvo com sucesso!');
            history.push('/profile');
            
        } catch{
            alert('Erro ao tentar enviar caso. Tente novamente.')
        }



    }

    return (
        <div className="newIncident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile"><FiArrowLeft size={16} color="#e02041" /> Voltar para Home</Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)} />
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}