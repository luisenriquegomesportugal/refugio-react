import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import moment from "moment";
import {CriancaCard} from "../../components/refukids/crianca-card.jsx";
import {Page} from "../../components/layout/page.jsx";

export const RefukidsLista = () => {
    const [criancas, setCriancas] = useState([]);

    useEffect(() => {
        const fetchData = async function () {
            let resCriancas = await fetch(`http://localhost:8000/query/refukids_crianca?columns=membros.id,nome,foto,nascimento,sexo,observacao&with=refukids_crianca.responsaveis:id,nome,foto,sexo,telefone`);
            setCriancas(await resCriancas.json());
        }

        fetchData();
    }, []);

    if (!criancas.length) {
        return null;
    }

    return <Page title="Refukids" subTitle="Crianças cadastradas">
        <ul className="d-flex flex-column">
            {criancas.map(crianca => <li key={crianca.id}>
                <CriancaCard membro={crianca}/>
            </li>)}
        </ul>
    </Page>;
};