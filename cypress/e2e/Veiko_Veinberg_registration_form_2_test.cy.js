beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests, Veiko Veinberg',  () => {

    it('User can use only same both first and validation passwords', () => {
      cy.get('#username').type('Pajusalu')
      cy.get('#email').type('Veiko.Veinberg@gmail.com')
      cy.get('[data-cy="name"]').type('Veiko')
      cy.get('#lastName').type('Veinberg')
      cy.get('[data-testid="phoneNumberTestId"]').type('53541620')
      cy.get('input[name="password"]').type('Password666')
      cy.get('[name="confirm"]').type('Password999')
      cy.get('h2').contains('Password').click()
      cy.get('[name="confirm"]').type('{enter}')
      cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
      cy.get('#success_message').should('not.be.visible') 
      cy.get('.submit_button').should('not.be.enabled')
      cy.get('#confirm').clear()
      cy.get('[name="confirm"]').type('Password666')
      cy.get('h2').contains('Password').click()
      cy.get('.submit_button').should('be.enabled')
      cy.get('#password_error_message').should('not.be.visible')
      
    })
      
    it('User can submit form with all fields added', () => {
      // Add test steps for filling in ALL fields
      cy.get('#username').type('Pajusalu')
      cy.get('#email').type('Veiko.Veinberg@gmail.com')
      cy.get('[data-cy="name"]').type('Veiko')
      cy.get('#lastName').type('Veinberg')
      cy.get('[data-testid="phoneNumberTestId"]').type('53541620')
      cy.get('[value="JavaScript"]').click()
      cy.get('#vehicle3').click()
      cy.get('#cars').select('volvo')
      cy.get('#animal').select('dog')
      cy.get('input[name="password"]').type('Password666')
      cy.get('[name="confirm"]').type('Password666')
      cy.get('h2').contains('Password').click()
      // Assert that submit button is enabled
      cy.get('.submit_button').should('be.enabled').click()
      // Assert that after submitting the form system show successful message
      cy.get('#success_message').should('be.visible').should ('contain', "User successfully submitted registration")
      
    })
  
    it('User can submit form with valid data and only mandatory fields added', () => {
      inputValidData('Pajusalu') 
      cy.get('.submit_button').should('be.enabled').click()
      cy.get('#success_message').should('be.visible').should ('contain', "User successfully submitted registration")
             
    })
  
    it('User can not submit the form when mandatory User name field is empty', () => {
      inputValidData('Pajusalu') 
      cy.get('#username').clear()
      cy.get('h2').contains('Password').click()
      cy.get('.submit_button').should('be.disabled')
      cy.get('#input_error_message').should('be.visible').should('contain', "Mandatory input field is not valid or empty!")
  
    })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests, Veiko Veinberg', () => {
    it('Check that Cerebrum Hub logo is correct and has correct size', () => {
      cy.log('Will check logo source and size')
      cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
      // get element and check its parameter height
      // it should be less than 178 and greater than 100
      cy.get('img').invoke('height').should('be.lessThan', 178)
      .and('be.greaterThan', 100) 

    })

    it('Check that Cypress logo is correct and has correct size', () => {
      cy.log('Will check  Cypress logo source and size')
      cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
      // get element and check its parameter height
      // it should be less than 116 and greater than 80
      cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 116)
      .and('be.greaterThan', 80) 

    })

    it('Check navigation part, link for Registration form 1', () => {
      cy.get('nav').children().should('have.length', 2)
      // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
      cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
      // Get navigation element, find its first child, check the link content and click it
      cy.get('nav').children().eq(0).should('be.visible')
      .and('have.attr', 'href', 'registration_form_1.html')
      .click()
      // Check that currently opened URL is correct
      cy.url().should('contain', '/registration_form_1.html')
      // Go back to previous page
      cy.go('back')
      cy.log('Back again in registration form 2')

    })

    it('Check navigation part, link for Registration form 3', () => {
      cy.get('nav').children().should('have.length', 2)
      cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
      cy.get('nav').children().eq(1).should('be.visible').and('have.attr', 'href', 'registration_form_3.html').click()
      cy.url().should('contain', '/registration_form_3.html')
      cy.go('back')
      cy.log('Back again in registration form 2')

    })

    it('Check that radio button list is correct', () => {
      // Array of found elements with given selector has 4 elements in total
      cy.get('input[type="radio"]').should('have.length', 4)
      // Verify labels of the radio buttons
      cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
      cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
      cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
      cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')
      //Verify default state of radio buttons
      cy.get('input[type="radio"]').eq(0).should('not.be.checked')
      cy.get('input[type="radio"]').eq(1).should('not.be.checked')
      cy.get('input[type="radio"]').eq(2).should('not.be.checked')
      cy.get('input[type="radio"]').eq(3).should('not.be.checked')
      // Selecting one will remove selection from the other radio button
      cy.get('input[type="radio"]').eq(0).check().should('be.checked')
      cy.get('input[type="radio"]').eq(1).check().should('be.checked')
      cy.get('input[type="radio"]').eq(0).should('not.be.checked')

    })
     
    it('Check that checkbox button list is correct', () => {
      // Array of found elements with given selector has 3 elements in total
      cy.get('input[type="checkbox"]').should('have.length', 3)
      cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
      cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
      cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')
      cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
      cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
      cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
      cy.get('input[type="checkbox"]').eq(0).check()
      cy.get('input[type="checkbox"]').eq(1).check()
      cy.get('input[type="checkbox"]').eq(2).check()
      cy.get('input[type="checkbox"]').eq(0).should('be.checked')
      
    })

    it('Car dropdown is correct', () => {
      // Examples
      cy.screenshot('Full page screenshot')

      // Solution how to get the length of array of elements in Cars dropdown
      cy.get('#cars').find('option').should('have.length', 4)

      // Check  that first element in the dropdown has text Volvo
      cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')

      // Advanced level how to check the content of the Cars dropdown
      cy.get('#cars').find('option').then(options => {
      const actual = [...options].map(option => option.value)
      expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        
      }) 
    
    })

    it('Animal dropdown is correct', () => {
      cy.get('#animal').find('option').should('have.length', 6)
      cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
      cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
      cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
      cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
      cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
      cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
      // Advanced level how to check the content of the Animal dropdown
        cy.get('#animal').find('option').then(options => {
        const actual = [...options].map(option => option.value)
        expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        
       })

    })

})    

    function inputValidData(Pajusalu) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Pajusalu')
    cy.get('#email').type('Veiko.Veinberg@gmail.com')
    cy.get('[data-cy="name"]').type('Veiko')
    cy.get('#lastName').type('Veinberg')
    cy.get('[data-testid="phoneNumberTestId"]').type('53541620')
    cy.get('#password').type('Password666')
    cy.get('#confirm').type('Password666')
    cy.get('h2').contains('Password').click()
    
    
}
