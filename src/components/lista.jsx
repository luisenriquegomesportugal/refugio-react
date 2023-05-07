import {PaginatedList} from "react-paginated-list";
import {useState} from "react";
import Skeleton from "react-loading-skeleton";
import * as React from "react";

export const Lista = ({data, renderList, filterFunction}) => {
    const [page, setPage] = useState(1);
    const [filtro, setFiltro] = useState('');

    let dataFiltered = data || [];
    if (filtro) {
        dataFiltered = data.filter(line => filterFunction
            ? filterFunction(line, filtro)
            : Object.values(line)
                .some(value => value !== null
                    && value.toString()
                        .toLowerCase()
                        .startsWith(filtro.toLowerCase())));
    }

    const firstPage = dataFiltered.length
        ? (page * 10) - 9
        : 0;

    const lastPage = page * 10 > dataFiltered.length
        ? dataFiltered.length
        : page * 10;

    const infoPage = `Mostrando de ${firstPage} até ${lastPage} de ${dataFiltered.length} ${dataFiltered.length === 1 ? 'registro' : 'registros'}`;

    let filteredInfoPage = '';
    if (data && dataFiltered.length !== data.length) {
        filteredInfoPage = `(filtrados do total de ${data.length} ${data.length === 1 ? 'registro' : 'registros'})`;
    }

    return <div className="card">
        <div className="card-header flex-column flex-md-row">
            <input
                type="search"
                className="form-control mb-3 mb-md-0"
                style={{width: "100%", maxWidth: "20rem"}}
                placeholder="Pesquisar por ..."
                value={filtro}
                onChange={e => {
                    setPage(1);
                    setFiltro(e.target.value);
                }}/>
            <span>{data ? infoPage : <Skeleton width="300px"/>} {filteredInfoPage}</span>
        </div>
        <div className="card-body">
            {
                data
                    ? <PaginatedList
                        nextText={<i className="fa fa-angle-double-right"/>}
                        prevText={<i className="fa fa-angle-double-left"/>}
                        onPageChange={(_, page) => setPage(page)}
                        list={dataFiltered}
                        renderList={renderList}/>
                    : <Skeleton height="50px"/>
            }
        </div>
    </div>;
}