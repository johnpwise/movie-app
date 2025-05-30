// Router 
import { MemoryRouter } from 'react-router';

// Component Under Test
import BaseButton from './baseButton';

describe('<BaseButton />', () => {
    it('should render with the correct props and icon', () => {
        cy.mount(
            <MemoryRouter>
                <BaseButton 
                    dataId='test-data-id' 
                    text='Test Button'
                    variant='primary'
                    icon='bi-dribbble' 
                    disabled={false} 
                    onClick={() => { }} />
            </MemoryRouter>
        );

        // Assert
        cy.get('[data-id="test-data-id"]')
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Test Button')
            .and('have.class', 'btn-primary')
            .find('i.bi-dribbble')
            .should('exist');
    });

    it('should render with the correct props', () => {
        cy.mount(
            <MemoryRouter>
                <BaseButton 
                    dataId='test-data-id' 
                    text='Test Button No Icon'
                    variant='secondary'
                    disabled={false} 
                    onClick={() => { }} />
            </MemoryRouter>
        );

        // Assert
        cy.get('[data-id="test-data-id"]')
            .should('exist')
            .and('be.visible')
            .and('have.text', 'Test Button No Icon')
            .and('have.class', 'btn-secondary');
    });

    it('should render with the correct props and just an icon', () => {
        cy.mount(
            <MemoryRouter>
                <BaseButton 
                    dataId='test-data-id' 
                    icon='bi-alarm' 
                    disabled={false} 
                    onClick={() => { }} />
            </MemoryRouter>
        );

        // Assert
        cy.get('[data-id="test-data-id"]')
            .should('exist')
            .and('be.visible')
            .find('i.bi-alarm')
            .should('exist');
    });
})