// Router 
import { MemoryRouter } from 'react-router';

// Component Under Test
import BaseBadge from './baseBadge';

describe('<BaseBadge />', () => {
    it('should render with the correct props', () => {
        cy.mount(
            <MemoryRouter>
                <BaseBadge 
                    dataId='test-base-badge' 
                    variant='primary' 
                    text='Test Badge' />
            </MemoryRouter>
        );

        // Assert
        cy.get('[data-id="test-base-badge"]')
            .should('exist')
            .and('be.visible')
            .and('have.class', 'badge')
            .and('have.class', 'bg-primary')
            .and('contain.text', 'Test Badge');
    });

    it('should render with a number as text', () => {
        cy.mount(
            <MemoryRouter>
                <BaseBadge 
                    dataId='test-base-badge-number' 
                    variant='secondary' 
                    text={42} />
            </MemoryRouter>
        );

        // Assert
        cy.get('[data-id="test-base-badge-number"]')
            .should('exist')
            .and('be.visible')
            .and('contain.text', '42');
    });
});