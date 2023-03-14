import moment from "moment";
import {route} from "../../utils/route.js";

export const CriancaCard = ({membro, children}) => {
    const formatTelefone = ({telefone}) => {
        if (!telefone) {
            return null;
        }

        telefone = telefone.replace(/[^\d]+/, '');
        return telefone.length > 9 ? telefone : `91${telefone}`;
    }

    return <div className="card">
        <div className="project-info gap-3">
            <div className="d-flex col-lg-3 col-sm-10 col-12 order-0 order-lg-0">
                <div className="d-flex flex-grow-1 flex-lg-grow-0 flex-row-reverse flex-sm-row align-items-start gap-3">
                    <div className="project-media">
                        {
                            membro.foto
                                ? <a href={route('download', {'file': membro.foto})}
                                     data-exthumbimage={route('download', {'file': membro.foto})}
                                     data-src={route('download', {'file': membro.foto})}>
                                    <img src={route('download', {'file': membro.foto})}
                                         className="object-fit-cover" alt=""/>
                                </a>
                                : <span
                                    className={`img-placeholder text-uppercase ${membro.sexo === 'M' ? 'bgl-info text-info' : 'bgl-danger text-danger'}`} title={membro.nome}>
                                        {membro.nome[0]}{Array.from(membro.nome.split(' ')).pop()[0]}
                                </span>
                        }
                    </div>
                    <div className="flex-grow-1 flex-lg-grow-0">
                        <h5 className="mb-1 font-w500 text-black ellipsis-2">{membro.nome}</h5>
                        <span className="d-block">{membro.sexo === 'M' ? 'Masculino' : 'Feminino'}</span>
                        <span className="d-block">
                            { moment().diff(moment(membro.nascimento, 'YYYY-MM-DD'), 'year') } { moment().diff(moment(membro.nascimento, 'YYYY-MM-DD'), 'year') === 1 ? 'ano' : 'anos' }
                        </span>
                    </div>
                </div>
            </div>
            <div className="d-flex col-lg-4 col-sm-6 col-12 order-2 order-lg-1">
                <div className="d-flex flex-row-reverse flex-sm-row align-items-start gap-3">
                    <div className="project-media list d-none d-sm-inline-flex order-1 order-sm-0">
                        {membro.responsaveis.map(responsavel => responsavel.foto
                            ? <a key={responsavel.id} href={ route('download', {'file': responsavel.foto}) }
                                 data-exthumbimage={ route('download', {'file': responsavel.foto}) }
                                 data-src={ route('download', {'file': responsavel.foto}) }>
                                <img src={ route('download', {'file': responsavel.foto}) } alt=""
                                     title={responsavel.nome} />
                            </a>
                            : <span key={responsavel.id} className={`img-placeholder text-uppercase ${responsavel.sexo === 'M' ? 'bgl-info text-info' : 'bgl-danger text-danger'}`} title={responsavel.nome}>
                                {responsavel.nome[0]}{Array.from(responsavel.nome.split(' ')).pop()[0]}
                            </span>)}
                    </div>
                    <div className="order-0 order-sm-1">
                        <h5 className="mb-1 font-w500 text-black">Responsáveis</h5>
                        <ul>
                            {membro.responsaveis.map(responsavel => <li key={responsavel.id}>
                                <div className="dropdown">
                                    <a data-bs-toggle="dropdown" aria-expanded="false" className="text-capitalize">
                                        {Array.from(responsavel.nome.toLowerCase().split(' ')).shift()} {Array.from(responsavel.nome.toLowerCase().split(' ')).pop()} ({formatTelefone(responsavel)})
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        <a className="dropdown-item" target="_blank"
                                           href={`https://wa.me/${formatTelefone(responsavel)}`}>Whatsapp</a>
                                        <a className="dropdown-item" target="_blank"
                                           href={`tel:${formatTelefone(responsavel)}`}>Telefone</a>
                                    </div>
                                </div>
                            </li>)}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`d-flex ${children ? 'col-lg-3' : 'col-lg-4'} col-sm-6 col-12 order-3 order-lg-2`}>
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
                    className="d-flex col-lg-2 col-sm-2 col-12 align-items-start justify-content-between justify-content-sm-end order-5 order-sm-1 order-lg-3">
                    <div
                        className="project-status d-flex flex-grow-1 flex-lg-grow-0 align-items-center justify-content-between justify-content-sm-end">
                        {children}
                    </div>
                </div>
                : null
            }
        </div>
    </div>;
}