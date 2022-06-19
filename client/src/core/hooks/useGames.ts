import { useEffect, useState } from "react";
import { Game, GameResponse } from "../model/Game";
import { RestTemplate } from "../api/RestTemplate";
import { GET_GAMES_API } from "../api/ApiConstants";

export const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        loadGames();
    }, []);

    const loadGames = async () => {
        const result = await RestTemplate.get<GameResponse>(GET_GAMES_API());
        setGames(result.data.data);
    };

    return {games};
};
