import {CriancaCard} from "../../components/refukids/crianca-card.jsx";
import {Page} from "../../components/layout/page.jsx";
import {Lista} from "../../components/lista.jsx";
import {useFetch} from "../../hooks/fetch.js";
import {useQuery} from "react-query";
import {Col, Row} from "react-bootstrap";
import {RefukidsCadastrarCriancaModal} from "../../components/refukids/cadastro/modal.jsx";

export const RefukidsLista = () => {
    const {isLoading, data} = useQuery("ApiRefukidsCrianca", () =>
        useFetch(`refukids_crianca`));

    return <Page
        title="Refukids"
        subTitle="Crianças cadastradas"
        loading={isLoading}>
        <Row>
            <Col className="mb-3 d-flex justify-content-end">
                <RefukidsCadastrarCriancaModal />
            </Col>
        </Row>
        <Row>
            <Col>
                <Lista
                    data={data}
                    renderList={pagina => <ul>
                        {pagina.map(linha => <li key={linha.id}>
                            <CriancaCard membro={linha}/>
                        </li>)}
                    </ul>}/>
            </Col>
        </Row>
    </Page>;
};