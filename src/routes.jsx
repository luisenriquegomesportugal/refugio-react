import {createHashRouter, createRoutesFromElements, Route} from "react-router-dom";
import {Principal} from "./layouts/Principal.jsx";
import {Dashboard} from "./pages/dashboard.jsx";
import {Chamadas} from "./pages/turma/chamadas.jsx";
import {Presentes} from "./pages/turma/presentes.jsx";
import {RefukidsLista} from "./pages/refukids/listagem.jsx";

export const router = createHashRouter(
    createRoutesFromElements(
        <Route path="/" element={<Principal/>}>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="refukids/lista" element={<RefukidsLista />}/>
            <Route path="turma/:turmaId" element={<Chamadas />}/>
            <Route path="turma/:turmaId/chamada/:chamadaId" element={<Presentes/>}/>
        </Route>
    )
);