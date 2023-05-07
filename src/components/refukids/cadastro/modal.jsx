import {Button, Modal} from "react-bootstrap";
import {useState} from "react";
import {RefukidsCadastrarCrianca} from "./cadastro.jsx";

export const RefukidsCadastrarCriancaModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" className="px-2 d-inline-flex align-items-center cursor-pointer"
                    onClick={handleShow}>
                <i className="fa fa-plus me-2"></i>
                Novo cadastro
            </Button>

            <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Cadastro Refukids
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RefukidsCadastrarCrianca />
                </Modal.Body>
            </Modal>
        </>
    );
}