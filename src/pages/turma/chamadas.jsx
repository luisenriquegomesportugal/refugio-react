import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { Page } from "../../components/layout/page.jsx";
import { useFetch } from "../../hooks/fetch.js";
import { useQuery } from "react-query";
import { Lista } from "../../components/lista.jsx";
import { TurmaNovaChamada } from "../../components/turma/chamada/cadastro.jsx";
import { Col, Row } from "react-bootstrap";

export const Chamadas = () => {
    const { turmaId } = useParams();

    const { data: turma, isLoading } = useQuery(`ApiTurma${turmaId}`, () =>
        useFetch(`turma/${turmaId}`));

    return <Page
        title="Chamada refukids"
        subTitle={turma?.nome || null}
        loading={isLoading}>
        <Row>
            <Col className="mb-3 d-flex justify-content-end">
                <TurmaNovaChamada turmaId={turmaId} />
            </Col>
        </Row>
        <Row>
            <Col>
                <Lista
                    data={turma?.chamadas}
                    filterFunction={(chamada, filtro) => moment(chamada.dia, 'YYYY-MM-DD')
                        .format('DD/MM/YYYY')
                        .includes(filtro)
                    }
                    renderList={pagChamadas => <div className="table-responsive">
                        <table className="table table-bordered table-hover style-1">
                            <thead>
                                <tr>
                                    <th>
                                        <b>Dia</b>
                                    </th>
                                    <th>
                                        <b>#</b>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagChamadas.map(chamada =>
                                    <tr key={chamada.id}>
                                        <td>
                                            {
                                                moment().isSame(moment(chamada.dia, 'YYYY-MM-DD'), 'day')
                                                    ? <b>Hoje</b>
                                                    : moment(chamada.dia, 'YYYY-MM-DD').format('DD/MM/YYYY')
                                            }
                                        </td>
                                        <td>
                                            <div className="d-flex action-button">
                                                {
                                                    moment().isSame(moment(chamada.dia, 'YYYY-MM-DD'), 'day')
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
                    </div>} />
            </Col>
        </Row>
    </Page>;
};