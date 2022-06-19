export interface GameResponse {
    data: Game[];
    status: string;
}

export interface Game {
    id: number;
    title: string;
}
