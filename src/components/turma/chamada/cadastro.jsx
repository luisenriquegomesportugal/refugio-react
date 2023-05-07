import { Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { useFetchMutation } from "../../../hooks/fetch.js";
import { useNavigate } from "react-router-dom";

export const TurmaNovaChamada = ({turmaId}) => {
    const navigate = useNavigate();

    let { mutate: criarChamada, isLoading: criandoChamada } = useMutation(`ApiTurmaChamadaStore`, data =>
        useFetchMutation(`turma_chamada`, data), {
        onSuccess: (data) => {
            navigate(`/turma/${turmaId}/chamada/${data.id}`);
        },
    });

    return <Button variant="primary" className="px-2 d-inline-flex align-items-center cursor-pointer"
        onClick={() => criarChamada({turmaId})}>
        <i className={`fa me-2 ${criandoChamada ? 'fa-spinner fa-spin' : 'fa-plus'}`}></i>
        Nova chamada
    </Button>;
}