

describe('.env.local', () => {

    it('Defines the trello api key', () => {
        expect(process.env.TRELLO_API_KEY).toBeDefined();
    });

    it('Defines the trello token', () => {
        expect(process.env.TRELLO_TOKEN).toBeDefined();
    });

    it('Defines the trello board id', () => {
        expect(process.env.TRELLO_BOARD_ID).toBeDefined();
    });

    it('Defines the trello open list id', () => {
        expect(process.env.TRELLO_OPEN_LIST_ID).toBeDefined();
    });

    it('Defines the trello done list id', () => {
        expect(process.env.TRELLO_DONE_LIST_ID).toBeDefined();
    });


});