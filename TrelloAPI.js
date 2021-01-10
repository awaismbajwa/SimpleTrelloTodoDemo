import * as TrelloNodeAPI from 'trello-node-api';


export let TrelloAPI = {
    authorize: function () {
        this.trelloConnection = new TrelloNodeAPI();
        this.trelloConnection.setApiKey(process.env.TRELLO_API_KEY);
        this.trelloConnection.setOauthToken(process.env.TRELLO_TOKEN);
    },
    getBoardTasks: async function () {
        if (!this.trelloConnection) {
            this.authorize();
        }
        let result = {
            tasks: [],
            done: []
        }
        let response;
        try {
            response = await this.trelloConnection.board.searchCards(process.env.TRELLO_BOARD_ID);
        } catch (error) {
            if (error) {
                console.log('error ', error);
            }
        }
        if (response) {
            result.tasks = response.filter(card => {
                card.doneListID = process.env.TRELLO_DONE_LIST_ID;
                card.openListID = process.env.TRELLO_OPEN_LIST_ID;
                return card.idList == process.env.TRELLO_OPEN_LIST_ID;
            });
            result.done = response.filter(card => card.idList == process.env.TRELLO_DONE_LIST_ID);
        }
        return result;
    },
    removeCard: async function (cardId) {
        if (!this.trelloConnection) {
            this.authorize();
        }
        let response;
        try {
            response = await this.trelloConnection.card.del(cardId);
        } catch (error) {
            if (error) {
                console.log('error ', error);
            }
            return false;
        }
        return response;
    },
    createCard: async function (cardData) {
        if (!this.trelloConnection) {
            this.authorize();
        }
        let card = {
            name: cardData.name,
            desc: cardData.desc,
            idList: process.env.TRELLO_OPEN_LIST_ID
        }
        let response;
        try {
            response = await this.trelloConnection.card.create(card);
        } catch (error) {
            if (error) {
                console.log('error ', error);
            }
            return false;
        }
        return response;
    },
    updateCard: async function (cardId, newListID) {
        if (!this.trelloConnection) {
            this.authorize();
        }
        let response;
        try {
            response = await this.trelloConnection.card.update(cardId, {idList: newListID});
        } catch (error) {
            if (error) {
                console.log('error ', error);
            }
            return false;
        }
        return response;
    }
}