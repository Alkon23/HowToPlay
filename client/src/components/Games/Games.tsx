import { useGames } from "../../core/hooks/useGames";

export const Games = () => {

    const {games} = useGames();

    return (
        <div>
            <h1>Stored Games</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                </tr>
                </thead>
                <tbody>
                {games.map(game => (
                    <tr>
                        <td>{game.id}</td>
                        <td>{game.title}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )


}
