import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import moment from "moment";
import {CriancaCard} from "../../components/refukids/crianca-card.jsx";
import {Page} from "../../components/layout/page.jsx";

export const Presentes = () => {
    const {turmaId, chamadaId} = useParams();
    const [turma, setTurma] = useState(null);
    const [chamada, setChamada] = useState(null);
    const [presentes, setPresentes] = useState([]);

    useEffect(() => {
        setTurma(null);
        setChamada(null);
        setPresentes(null);

        const fetchData = async function () {
            let resTurma = await fetch(`http://localhost:8000/query/turma/${turmaId}?si&columns=id,nome`);
            let resChamada = await fetch(`http://localhost:8000/query/turma_chamada/${chamadaId}?columns=id,dia`);
            let resPresentes = await fetch(`http://localhost:8000/query/turma_chamada/${chamadaId}/presentes?columns=membros.id,nome,foto,nascimento,sexo,observacao&with=presentes.responsaveis:id,nome,foto,sexo,telefone`);
            setTurma(await resTurma.json());
            setChamada(await resChamada.json());
            setPresentes(await resPresentes.json());
        }

        fetchData();
    }, [turmaId, chamadaId]);

    if (!turma || !chamada || !presentes) {
        return null;
    }

    return <Page
        title="Chamada Refukids"
        subTitle={turma.nome}
        back={`/turma/${turmaId}`}
        actions={<div className="welcome-text">
            <span>
                {
                    moment().isSame(moment(chamada.dia, 'YYYY-MM-DD'))
                        ? <b>Hoje</b>
                        : moment(chamada.dia, 'YYYY-MM-DD').format('DD/MM/YYYY')
                }
            </span>
        </div>}>
        <ul className="d-flex flex-column">
            {
                moment().isSame(moment(chamada.dia, 'YYYY-MM-DD'))
                    ? <b>Hoje</b>
                    : presentes.map(presente => <li key={presente.id}>
                        <CriancaCard membro={presente}/>
                    </li>)
            }
        </ul>
    </Page>;
};