import { useParams } from "react-router-dom";
import moment from "moment";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useFetch } from "../../hooks/fetch.js";
import { CriancaCard } from "../../components/refukids/crianca-card.jsx";
import { Page } from "../../components/layout/page.jsx";
import { Lista } from "../../components/lista.jsx";
import { RefukidsChamadaRegistrarPresenca } from "../../components/refukids/chamada/registrar-presenca.jsx";
import { RefukidsCadastrarCriancaModal } from "../../components/refukids/cadastro/modal.jsx";

export const Presentes = () => {
    const { turmaId, chamadaId } = useParams();

    let { data: chamada, isLoading } = useQuery(`ApiTurmaChamada${chamadaId}`, () =>
        useFetch(`turma_chamada/${chamadaId}`), { refetchOnWindowFocus: false });

    const renderedActions = chamada
        ? <div className="welcome-text">
            <span>
                {
                    moment().isSame(moment(chamada.dia, 'YYYY-MM-DD'), 'day')
                        ? <b>Hoje</b>
                        : moment(chamada.dia, 'YYYY-MM-DD').format('DD/MM/YYYY')
                }
            </span>
        </div>
        : null;

    return <Page
        back={`/turma/${turmaId}`}
        title="Chamada Refukids"
        subTitle={chamada?.turma?.nome || null}
        actions={renderedActions}
        loading={isLoading}>
        <Row>
            <Col className="mb-3 d-flex justify-content-end">
                <RefukidsCadastrarCriancaModal />
            </Col>
        </Row>
        <Row>
            <Col>
                <Lista
                    data={chamada?.presentes}
                    renderList={pagMembros => <ul>
                        {pagMembros.map(membro => <li key={membro.id}>
                            <CriancaCard chamada={chamada} membro={membro}>
                                {
                                    moment().isSame(moment(chamada.dia, 'YYYY-MM-DD'), 'day')
                                        ? <RefukidsChamadaRegistrarPresenca chamada={chamada} membro={membro} />
                                        : null
                                }
                            </CriancaCard>
                        </li>)}
                    </ul>} />
            </Col>
        </Row>
    </Page>;
};