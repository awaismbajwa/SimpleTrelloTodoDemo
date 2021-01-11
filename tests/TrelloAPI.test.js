
import {TrelloAPI} from '../TrelloAPI';

describe('TrelloAPI', () => {

    it('authorizes successfully with trello board', () => {
        TrelloAPI.authorize();
        expect(TrelloAPI.trelloConnection).toBeDefined();
    });

    it('returns two lists of open and done tasks in board', async () => {
        TrelloAPI.authorize();
        let result = await TrelloAPI.getBoardTasks();
        expect(result).toBeDefined();
        expect(result.errorMessage).toBeUndefined();
    });

});