import { Button, Col, Image, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useBackendRoute } from "../../../hooks/route.js";
import { useFormats } from "../../../hooks/format.js";
import { isMobile } from "react-device-detect";

export const RefukidsChamadaCompartilharPresenca = ({ chamada, membro, presenca, visible, setInvisible }) => {
    const backendRoute = useBackendRoute();
    const { phoneFormat, abrevNomeFormat } = useFormats();

    const [responsavel, setResponsavel] = useState(null);
    const [qrcode, setQrcode] = useState(null);

    useEffect(() => {
        if (presenca) {
            QRCode.toDataURL(backendRoute(`turma_chamada_presenca/${presenca?.id}`), function (err, url) {
                setQrcode(url);
            })
        }
    }, [presenca]);

    const compartilharPresenca = () => {
        if (!responsavel) {
            alert("Selecione um responsável");
            return;
        }

        let message = [
            `Ola, *${abrevNomeFormat(responsavel.nome)}*`,
            `Estou lhe enviando a confirmação de presença da sua criança na *${chamada.turma.nome}*.`,
            ``,
            `Criança: *${membro.nome}*`,
            `️️Número: *${presenca?.numero || ''}*`
        ].join('\n');

        window.open(`https://wa.me/${phoneFormat(responsavel.telefone)}?text=${encodeURI(message)}`, isMobile ? "_self" : "_blank");
        setInvisible();
    }

    return <Modal show={visible} onHide={setInvisible}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h4 className="mb-0 lh-1">{membro.nome}</h4>
                    <small className="text-muted fs-15">Número: {presenca?.numero || ''}</small>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs="12" sm className="d-flex flex-column align-items-start">
                        <ul className="gap-3">
                            {
                                membro.responsaveis.map((responsavel, i) => <li key={responsavel.id}
                                    className="d-flex mb-3">
                                    <div className="custom-control custom-checkbox checkbox-success me-3">
                                        <input type="radio" className="form-check-input cursor-pointer"
                                            id={`form-check-input-${responsavel.id}`} name="responsavel"
                                            onChange={() => setResponsavel(responsavel)} />
                                    </div>
                                    <label htmlFor={`form-check-input-${responsavel.id}`}
                                        className="d-flex flex-column align-items-start cursor-pointer">
                                        <h5 className="mb-1">{abrevNomeFormat(responsavel.nome)}</h5>
                                        <small className="text-muted">{phoneFormat(responsavel.telefone)}</small>
                                    </label>
                                </li>)
                            }
                        </ul>
                        <Button variant="success" size="sm" className="btn-block mb-1"
                            onClick={compartilharPresenca}>
                            <i className="fab fa-whatsapp me-3"></i>
                            Compartilhe com o responsável
                        </Button>
                        <small className="text-muted">ou, aponte a camera do seu celular para o QR Code</small>
                    </Col>
                    <Col xs="12" sm="5" className="text-center">
                        <Image src={qrcode} alt="" className="my-4 my-sm-0" />
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>;
}