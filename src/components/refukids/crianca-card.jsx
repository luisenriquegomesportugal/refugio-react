import moment from "moment";
import { useBackendRoute } from "../../hooks/route.js";
import { useFormats } from "../../hooks/format.js";
import { Badge, Dropdown } from "react-bootstrap";
import { forwardRef, useState } from "react";
import { RefukidsChamadaCompartilharPresenca } from "./chamada/compartilhar-presenca.jsx";

export const CriancaCard = ({ chamada, membro, children }) => {
    const route = useBackendRoute();
    const { abrevNomeFormat, phoneFormat } = useFormats();

    const [compartilharPresenca, setCompartilharPresenca] = useState(false);

    return <div className="project-info gap-3">
        <div className="d-flex col-12 col-sm col-md-8 col-lg-3 order-1 order-sm-0 order-lg-0 align-self-start">
            <div className="d-flex flex-grow-1 flex-lg-grow-0 flex-row-reverse flex-sm-row align-items-start gap-3">
                <div className="project-media">
                    {
                        membro.foto
                            ? <a className="light-gallery-item" href={route('download', { 'file': membro.foto })}>
                                <img src={route('thumb', { 'file': membro.foto })}
                                    className="object-fit-cover" title={membro.nome} alt={abrevNomeFormat(membro.nome, true)} />
                            </a>
                            : <span
                                className={`img-placeholder text-uppercase ${membro.sexo === 'M' ? 'bgl-info text-info' : 'bgl-danger text-danger'}`}
                                title={membro.nome}>
                                {abrevNomeFormat(membro.nome, true)}
                            </span>
                    }
                </div>
                <div className="flex-grow-1 flex-lg-grow-0">
                    <div className="d-flex align-items-center gap-2">
                        {
                            membro.pivot && membro.pivot.numero
                                ? <Badge bg="success" className="badge-rounded mr-2">{membro.pivot.numero}</Badge>
                                : null
                        }
                        <span className="font-w500 text-black ellipsis-2">{membro.nome}</span>
                    </div>
                    <span className="d-block">{membro.sexo === 'M' ? 'Masculino' : 'Feminino'}</span>
                    <span className="d-block">
                        {moment().diff(moment(membro.nascimento, 'YYYY-MM-DD'), 'year')} {moment().diff(moment(membro.nascimento, 'YYYY-MM-DD'), 'year') === 1 ? 'ano' : 'anos'}
                    </span>
                </div>
            </div>
        </div>
        <div className="d-flex col-12 col-sm-12 col-md-6 col-lg-4 order-2 order-sm-2 order-lg-1 align-self-start">
            <div className="d-flex flex-row-reverse flex-sm-row align-items-start gap-3">
                <div className="project-media list d-none d-sm-inline-flex order-1 order-sm-0">
                    <ul className="users-lg">
                        {membro.responsaveis.map(responsavel => <li key={responsavel.id}>
                            {responsavel.foto
                                ?
                                <a className="light-gallery-item" href={route('download', { 'file': responsavel.foto })}>
                                    <img src={route('thumb', { 'file': responsavel.foto })} alt={abrevNomeFormat(responsavel.nome, true)}
                                        title={responsavel.nome} />
                                </a>
                                : <span
                                    className={`img-placeholder text-uppercase ${responsavel.sexo === 'M' ? 'bgl-info text-info' : 'bgl-danger text-danger'}`}
                                    title={responsavel.nome}>
                                    {abrevNomeFormat(responsavel.nome, true)}
                                </span>}
                        </li>)}
                    </ul>
                </div>
                <div className="order-0 order-sm-1">
                    <h5 className="mb-1 font-w500 text-black">Responsáveis</h5>
                    <ul>
                        {membro.responsaveis.map(responsavel => <li key={responsavel.id}>
                            <div className="dropdown">
                                <a data-bs-toggle="dropdown" aria-expanded="false"
                                    className="text-capitalize cursor-pointer">
                                    {abrevNomeFormat(responsavel.nome)} ({phoneFormat(responsavel.telefone)})
                                </a>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <a className="dropdown-item" target="_blank"
                                        href={`https://wa.me/${phoneFormat(responsavel.telefone)}`}>
                                        <i className="fab fa-whatsapp me-2" />
                                        Whatsapp
                                    </a>
                                    <a className="dropdown-item" target="_blank"
                                        href={`tel:${phoneFormat(responsavel.telefone)}`}>
                                        <i className="fa fa-phone me-2" />
                                        Telefone
                                    </a>
                                </div>
                            </div>
                        </li>)}
                    </ul>
                </div>
            </div>
        </div>
        <div className="d-flex col-12 col-sm-12 col-md order-3 order-sm-3 order-lg-2 align-self-start">
            <div className="d-flex align-items-start">
                <div>
                    <h5 className="mb-1 font-w500 text-black">Observações/Alergias</h5>
                    <span className="d-block ellipsis-2" title={membro.observacao || ''}>
                        {membro.observacao || 'Nenhuma'}
                    </span>
                </div>
            </div>
        </div>
        {
            children
                ? <div
                    className="d-flex col-12 col-sm col-md order-0 order-sm-1 order-lg-3 align-self-start justify-content-between justify-content-sm-end justify-content-lg-between">
                    <div
                        className="d-flex flex-grow-1 flex-md-grow-0 flex-lg-grow-1 align-items-center justify-content-between">
                        {children}
                        {
                            membro.pivot
                                ? <>
                                    <RefukidsChamadaCompartilharPresenca
                                        chamada={chamada}
                                        membro={membro}
                                        presenca={membro.pivot}
                                        visible={compartilharPresenca}
                                        setInvisible={() => setCompartilharPresenca(false)} />
                                    <Dropdown>
                                        <Dropdown.Toggle as={forwardRef(({ onClick }, ref) =>
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="cursor-pointer"
                                                ref={ref}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onClick(e);
                                                }}>
                                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#575757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        )}></Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => setCompartilharPresenca(true)}>
                                                <i className="fa fa-external-link-alt me-2"></i>
                                                Compartilhar presença
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                                : null
                        }
                    </div>
                </div>
                : null
        }
    </div>;
}