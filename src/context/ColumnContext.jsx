import { createContext } from "react";

export const ColumnContext = createContext();

export const ColumnProvider = ({ children }) => {
    const columns = [
        {
            id: 'todo',
            title: 'Todo',
            primaryBg: '#FFD23D',
            secondaryBg: '#FFE74F',
            tertiaryBg: '#FFE960',
            accentBg: '#FFFF00',
        }, {
            id: 'inprogress',
            title: 'In Progress',
            primaryBg: '#4790F6',
            secondaryBg: '#4BB4F4',
            tertiaryBg: '#95BCF4',
            accentBg: '#00BFFF',
        },
        {
            id: 'done',
            title: 'Done',
            primaryBg: '#8AFF24',
            secondaryBg: '#9AFF41',
            tertiaryBg: '#B0FF6B',
            accentBg: '#88F923',
        },
    ]


    return(
        <ColumnContext.Provider value={{columns}}>
            {children}
        </ColumnContext.Provider>
    )
}