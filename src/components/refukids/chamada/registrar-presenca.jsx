import { Button } from "react-bootstrap";
import { useState } from "react";
import QRCode from "qrcode";
import { useMutation, useQueryClient } from "react-query";
import { useFetchMutation } from "../../../hooks/fetch.js";
import { RefukidsChamadaCompartilharPresenca } from "./compartilhar-presenca.jsx";

export const RefukidsChamadaRegistrarPresenca = ({ chamada, membro }) => {
    const queryClient = useQueryClient()
    const [presenca, setPresenca] = useState(null);

    let { mutate: salvarPresenca, isLoading: salvandoPresenca } = useMutation(`ApiTurmaChamadaPresencaStore`, data =>
        useFetchMutation(`turma_chamada_presentes`, data), {
        onSuccess: (data, variables, context) => {
            queryClient.setQueryData(`ApiTurmaChamada${chamada.id}`, oldChamada => oldChamada
                ? {
                    ...oldChamada,
                    presentes: oldChamada.presentes
                        .map(presente => presente.id === data.membro_id
                            ? {...presente, pivot: data}
                            : presente)
                }
                : oldChamada);

            setPresenca(data);
        },
    });

    let { mutate: deletarPresenca, isLoading: deletandoPresenca } = useMutation(`ApiTurmaChamadaPresencaDelete`, data =>
        useFetchMutation(`turma_chamada_presentes/${data.id}`, {}, { method: 'DELETE' }), {
            onSuccess: (data, variables, context) => {
                console.log('onSuccess');
            },
            onSettled: () => {
                console.log('onSettled');
            },
            onError: () => {
                console.log('onError');
            }
        });

    return <>
        <RefukidsChamadaCompartilharPresenca
            chamada={chamada}
            membro={membro}
            presenca={presenca}
            visible={!!presenca}
            setInvisible={() => setPresenca(null)} />
        {
            membro.pivot
                ? <Button variant="success" size="sm" className="light px-2 d-inline-flex align-items-center cursor-pointer"
                    onClick={() => deletarPresenca({ id: membro.pivot.id })}>
                    <i className={`fa me-2 ${deletandoPresenca ? 'fa-spinner fa-spin' : 'fa-check'}`}></i>
                    Presente
                </Button>
                :
                <Button variant="danger" size="sm" className="light px-2 d-inline-flex align-items-center cursor-pointer"
                    onClick={() => salvarPresenca({
                        turma_chamada_id: chamada.id,
                        membro_id: membro.id
                    })}>
                    <i className={`fa me-2 ${salvandoPresenca ? 'fa-spinner fa-spin' : 'fa-times'}`}></i>
                    Faltou
                </Button>
        }
    </>;
}