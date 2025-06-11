// Router 
import { MemoryRouter } from 'react-router';

// Component Under Test
import BaseCheckbox from './baseCheckbox';

describe('<BaseCheckbox />', () => {
    it('should render with the correct props', () => {
        cy.mount(
            <MemoryRouter>
                <BaseCheckbox 
                    dataId='test-checkbox' 
                    label='Test Checkbox' 
                    checked={false}
                    isSwitch={false} 
                    onChange={() => { }} />
            </MemoryRouter>
        );

        // Assert
        cy.get('[data-id="test-checkbox"]')
            .should('exist')
            .and('be.visible')
            .find('input[type="checkbox"]')
            .should('not.be.checked');

        cy.get('[data-id="test-checkbox"] label')
            .should('have.text', 'Test Checkbox');
    });

    it('should render as checked when the checked prop is true', () => {
        cy.mount(
            <MemoryRouter>
                <BaseCheckbox 
                    dataId='test-checkbox-checked' 
                    label='Checked Checkbox' 
                    checked={true}
                    isSwitch={false}
                    onChange={() => { }} />
            </MemoryRouter>
        );

        // Assert
        cy.get('[data-id="test-checkbox-checked"] input[type="checkbox"]')
            .should('be.checked');
    });

    it('should render as a switched checkbox when the checked prop is true', () => {
        cy.mount(
            <MemoryRouter>
                <BaseCheckbox 
                    dataId='test-switch-checkbox' 
                    label='Switched Checkbox' 
                    checked={false} 
                    isSwitch={true} 
                    onChange={() => { }} />
            </MemoryRouter>
        );

        // Assert
        cy.get('[data-id="test-switch-checkbox"]')
            .should('have.class', 'form-switch')
            .find('input[type="checkbox"]')
            .should('not.be.checked');

        cy.get('[data-id="test-switch-checkbox"] label')
            .should('have.text', 'Switched Checkbox');
    });
});