import { nanoid } from "nanoid";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { ColumnContext } from "../context/ColumnContext";

export function useCards() {
    const { data, setData } = useContext(TaskContext);
    const { columns } = useContext(ColumnContext)
    function addCard(columnId) {
        let card = {
            id: nanoid(),
            columnId: columnId,
            content: "New Task",
            priority: 0,
        };
        setData((prev) => [...prev, card]);
    }
    function deleteCard(cardId) {
        let upd_data = data.filter((card) => card.id != cardId);
        setData(upd_data);
    }

    function updateContent(content, cardId) {
        let upd_data = data.map((card) => {
            if (card.id == cardId) {
                return { ...card, content: content };
            } else {
                return card;
            }
        });
        setData(upd_data);
    }

    function updatePriority(val, cardId) {
        let upd_data = data.map((card) => {
            if (card.id == cardId) {
                return { ...card,priority:card.priority === val ? val-1 : val};
            } else {
                return card;
            }
        });
        setData(upd_data);
    }

    function moveCard(cardId, index, direction) {
        let newindex = index + (direction)

        let newcol = columns[newindex].id;
        let upd_data = data.map((card) => {
            if (card.id == cardId) {
                return { ...card, columnId: newcol };
            } else {
                return card;
            }
        });
        setData(upd_data);
    }
    return {
        addCard,
        deleteCard,
        updateContent,
        updatePriority,
        moveCard,
    };
}
