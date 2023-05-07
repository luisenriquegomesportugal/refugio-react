import moment from "moment";

export const useFormats = () => ({
    phoneFormat: (telefone) => {
        if (!telefone) {
            return null;
        }

        telefone = telefone.replaceAll(/[^\d]+/g, '');
        return telefone.length > 9 ? telefone : `91${telefone}`;
    },
    dateFormat: (date) => {
        if (!date) {
            return null;
        }

        return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    },
    abrevNomeFormat: (nome, inicial = false) => {
        if (!nome) {
            return null;
        }

        let nomeSplited = nome.split(' ');
        let primeiro = inicial ? nomeSplited.shift()[0] : nomeSplited.shift();

        let ultimo = '';
        if (nomeSplited.length) {
            ultimo = inicial ? nomeSplited.pop()[0] : nomeSplited.pop();
        }

        return `${primeiro}${inicial ? '' : ' '}${ultimo}`;
    }
})