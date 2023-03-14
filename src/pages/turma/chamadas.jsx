import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import moment from "moment";
import {Page} from "../../components/layout/page.jsx";

export const Chamadas = () => {
    const {turmaId} = useParams();
    const [turma, setTurma] = useState(null);
    const [chamadas, setChamadas] = useState([]);

    useEffect(() => {
        setTurma(null);
        setChamadas([]);

        const fetchData = async function () {
            let resTurma = await fetch(`http://localhost:8000/query/turma/${turmaId}?si&columns=id,nome`);
            let resChamadas = await fetch(`http://localhost:8000/query/turma/${turmaId}/chamadas?si&columns=id,dia,turma_id&with[]=chamadas.presentes:id`);
            setTurma(await resTurma.json());
            setChamadas(await resChamadas.json());
        }

        fetchData();
    }, [turmaId]);

    if (!turma) {
        return null
    }

    return <Page title="Chamada refukids" subTitle={turma.nome}>
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover style-1" id="chamada-refukids">
                                <thead>
                                <tr>
                                    <th>
                                        <b>Dia</b>
                                    </th>
                                    <th>
                                        <b>Presentes</b>
                                    </th>
                                    <th>
                                        <b>#</b>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {chamadas.map(chamada => <tr key={chamada.id}>
                                        <td>
                                            {
                                                moment().isSame(moment(chamada.dia, 'YYYY-MM-DD'))
                                                    ? <b>Hoje</b>
                                                    : moment(chamada.dia, 'YYYY-MM-DD').format('DD/MM/YYYY')
                                            }
                                        </td>
                                        <td>
                                            {chamada.presentes.length} {chamada.presentes.length === 1 ? 'criança' : 'crianças'}
                                        </td>
                                        <td>
                                            <div className="d-flex action-button">
                                                {
                                                    moment().isSame(chamada.dia)
                                                        ? <Link to={`/turma/${turmaId}/chamada/${chamada.id}`}
                                                                className="btn btn-success btn-xs px-2">
                                                            <i className="fa fa-pen me-2"></i>
                                                            <span className="d-none d-md-inline">Cadastrar presentes</span>
                                                            <span className="d-inline d-md-none">Presentes</span>
                                                        </Link>
                                                        : <Link to={`/turma/${turmaId}/chamada/${chamada.id}`}
                                                                className="btn btn-outline-info btn-xs light px-2">
                                                            <i className="fa fa-folder-open me-2"></i>
                                                            <span className="d-none d-md-inline">Visualizar presentes</span>
                                                            <span className="d-inline d-md-none">Presentes</span>

                                                        </Link>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Page>;
};