export default function Results({ player }) {
    return (
        <div>
            <pre>{JSON.stringify(player, null, 2)}</pre>
        </div>
    )
}