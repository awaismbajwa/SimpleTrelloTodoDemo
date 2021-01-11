import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'

import TrelloCard from '../../components/TrelloCard';

describe("TrelloCard", () => {
    it("renders without crashing", () => {
        render(<TrelloCard card={{name: 'test name', desc: 'test description'}} />);
        expect(screen.getByTitle('Open in Trello')).toBeInTheDocument()
    });
});