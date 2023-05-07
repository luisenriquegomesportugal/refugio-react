import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import {useFetch} from "../../../hooks/fetch.js";

export const RefukidsCadastrarCrianca = () => {
    const {register, handleSubmit, reset} = useForm();
    const [qtdResponsaveis, setQtdResponsaveis] = useState(1);

    const {mutateAsync: salvar, isLoading} = useMutation('ApiPostRefukidsCrianca', (variables) =>
        useFetch('refukids_crianca', {
            method: "POST",
            body: JSON.stringify(variables),
            headers: {"Content-type": "application/json; charset=UTF-8"}}))

    useEffect(() => {
        reset();
        setQtdResponsaveis(1);
    }, []);

    const onSubmit = (params) => {
        salvar(params);
    }

    return <div className="basic-form">
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                <legend className="h5">
                    Criança
                </legend>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">
                        Sexo <span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-9 d-flex align-items-center">
                        <label className="radio-inline me-3">
                            <input className="me-2" type="radio" name="sexo"
                                   value="M" {...register("sexo")}
                                   checked required/>
                            Masculino
                        </label>
                        <label className="radio-inline me-3">
                            <input className="me-2" type="radio" name="sexo"
                                   value="F" {...register("sexo")} required/>
                            Feminino
                        </label>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">
                        Nome <span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" {...register("nome")} required/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">
                        Dt. Nascimento <span className="text-danger">*</span>
                    </label>
                    <div className="col-sm-9">
                        <input type="date" className="form-control" {...register("nascimento")} required/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Alergias/Cuidados</label>
                    <div className="col-sm-9">
                                        <textarea className="form-control"
                                                  rows="5" {...register("observacoes")}></textarea>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Foto</label>
                    <div className="col-sm-9">
                        <div className="form-file">
                            <input type="file"
                                   className="form-file-input form-control" {...register("foto")} />
                        </div>
                    </div>
                </div>
            </fieldset>
            {
                Array.from({length: qtdResponsaveis})
                    .map((_, i) => <fieldset key={i} className="mt-3">
                        <legend className="h5">
                            {i + 1}º Responsável
                        </legend>
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label">
                                Nome <span className="text-danger">*</span>
                            </label>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control" {...register(`responsavel[${i}][nome]`)} required/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label">
                                Telefone <span className="text-danger">*</span>
                            </label>
                            <div className="col-sm-9">
                                <input type="text"
                                       className="form-control" {...register(`responsavel[${i}][telefone]`)} required/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label">Foto</label>
                            <div className="col-sm-9">
                                <div className="form-file">
                                    <input type="file"
                                           className="form-file-input form-control" {...register(`responsavel[${i}][foto]`)} />
                                </div>
                            </div>
                        </div>
                    </fieldset>)
            }
            <div className="row mt-3">
                <div className="col gap-2 d-flex flex-column flex-sm-row justify-content-between">
                    <Button type="button" variant="outline-secondary" onClick={() => setQtdResponsaveis(qtd => ++qtd)}>
                        <i className="fas fa-user-plus me-2"></i>
                        Adicionar outro responsável
                    </Button>
                    <Button type="submit" variant="primary">
                        <i className="fas fa-save me-2"></i>
                        Cadastrar
                    </Button>
                </div>
            </div>
        </form>
    </div>;
}