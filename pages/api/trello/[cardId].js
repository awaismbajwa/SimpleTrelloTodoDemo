import { TrelloAPI } from '../../../TrelloAPI';


export default function handler(req, res){
    const {
        query: { cardId },
    } = req
    let response;
    if (req.method === 'DELETE') {
        //request to delete card
        response = TrelloAPI.removeCard(cardId);
    }
    else if (req.method === 'PUT' || req.method === 'PATCH'){
        //request to change card list
        response = TrelloAPI.updateCard(cardId, req.body.listId);
    }
    else if (req.method === 'POST') {
        //create new card
        response = TrelloAPI.createCard(req.body);
    }
    return response.then((result) => {
        res.status(200).send('done');
    });

}