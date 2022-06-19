export let ADD_GAME_API = buildUrl`/games/`;
export let GET_GAME_API = buildUrl`/games/`;
export let GET_GAMES_API = buildUrl`/games/${'id'}`;
export let UPDATE_GAME_API = buildUrl`/games/${'id'}`;
export let DELETE_GAME_API = buildUrl`/games/${'id'}`;

function buildUrl(base: TemplateStringsArray, ...params: any[]) {
    return (function(...values: any) {
        let dict = values[values.length - 1] || {};
        let result = [base[0]];
        params.forEach(function(param, i) {
            let valor = Number.isInteger(param) ? values[param] : dict[param];
            result.push(valor, base[i + 1]);
        });
        return result.join('');
    });
}
