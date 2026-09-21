import Column from "./Column"


const Board = () => {
    const columns = [
        {
            id: 'todo',
            title: 'Todo',
            numberOfCards: 0,
            primaryBg: '#FFD23D',
            secondaryBg: '#FFE74F',
            tertiaryBg: '#FFE960',
            accentBg: '#FFFF00',
        },       {
            id: 'inprogress',
            title: 'In Progress',
            numberOfCards: 0,
            primaryBg: '#4790F6',
            secondaryBg: '#4BB4F4',
            tertiaryBg: '#95BCF4',
            accentBg: '#00BFFF',
        },       
        {
            id: 'done',
            title: 'Done',
            numberOfCards: 0,
            primaryBg: '#8AFF24',
            secondaryBg: '#9AFF41',
            tertiaryBg: '#B0FF6B',
            accentBg: '#88F923',
        },
    ]
    
    return (
        <div className="w-full h-full flex">
            {columns.map((column, index)=>{
                return <Column key={column.id} column={column} />
            })}
        </div>

    )
}

export default Board