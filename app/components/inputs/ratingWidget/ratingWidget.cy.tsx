// Router 
import { MemoryRouter } from 'react-router';

// Component Under Test
import RatingWidget from './ratingWidget';

// CSS
import './ratingWidget.css';

describe('<RatingWidget />', () => {
    it('should render with the correct props', () => {
        cy.mount(
            <MemoryRouter>
                <RatingWidget 
                    dataId='test-rating-widget' 
                    rating={5} 
                    onChange={() => { }} 
                    isDisabled={false} />
            </MemoryRouter>
        );

        // Assert
        cy.get('[data-id="test-rating-widget"]')
            .should('exist')
            .and('be.visible')
            .find('.bi.bi-star')
            .should('have.length', 5);

        cy.get('[data-id="test-rating-widget"]')
            .find('.bi.bi-star-fill')
            .should('have.length', 5);
    });

    it('should allow changing the rating', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy');

        cy.mount(
            <MemoryRouter>
                <RatingWidget 
                    dataId='test-rating-widget-change' 
                    rating={3} 
                    onChange={onChangeSpy} 
                    isDisabled={false} />
            </MemoryRouter>
        );

        // Click to change rating
        cy.get('[data-id="test-rating-widget-change"] .bi.bi-star')
            .eq(3) // Click on 7th star (4th unchecked star)
            .click();

        // Assert that onChange was called with the new rating
        cy.get('@onChangeSpy').should('have.been.calledWith', 7);
    });

    it('should not allow changing the rating when disabled', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy');

        cy.mount(
            <MemoryRouter>
                <RatingWidget 
                    dataId='test-rating-widget-disabled' 
                    rating={4} 
                    onChange={onChangeSpy} 
                    isDisabled={true} />
            </MemoryRouter>
        );

        // Try to click a star
        cy.get('[data-id="test-rating-widget-disabled"] .bi.bi-star')
            .eq(2) // Click on 3rd star
            .click();

        // Assert that onChange was not called
        cy.get('@onChangeSpy').should('not.have.been.called');
    });
});