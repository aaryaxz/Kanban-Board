import { nanoid } from "nanoid";
import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

export function useCards() {
    const { data, setData } = useContext(TaskContext);

    function addCard(columnId) {
        let card = {
            id: nanoid(),
            columnId: columnId,
            content: "New Task",
        };
        setData((prev) => [...prev, card]);
    }
    function deleteCard(cardId) {
        let upd_data = data.filter((card) => card.id != cardId);
        // console.log(upd_data)
        setData(upd_data);
    }

    function updateCard(content, cardId) {
        let upd_data = data.map((card) => {
            if (card.id == cardId) {
                return { ...card, content: content };
            } else {
                return card;
            }
        });
        setData(upd_data);
    }

    function moveCard(cardId, index, columns, direction) {
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
        updateCard,
        moveCard,
    };
}
