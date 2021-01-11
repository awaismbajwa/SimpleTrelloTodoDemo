import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'

import HomePage from '../../pages/index';

describe("HomePage", () => {
    it("renders without crashing", () => {
        render(<HomePage trelloBoard={{tasks:[], done: []}} />);
        expect(screen.getByText('Trello ToDo Board')).toBeInTheDocument()
    });
});