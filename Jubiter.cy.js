

function TheChecOutProcess(FirstName,lastName,Eamil,Telephone,Address,TypeOfCard,CardNumber){
    cy.get('#forename').type(FirstName)
    cy.get('#surname').type(lastName)
    cy.get('#email').type(Eamil)
    cy.get('#telephone').type(Telephone)
    cy.get('#address').type(Address)
    cy.get('#cardType').select(TypeOfCard)
    cy.get('#card').type(CardNumber)
    cy.get('#checkout-submit-btn').click()
}

describe('Jubiter Tests', () => {
    beforeEach(() => {
        cy.visit('https://jupiter.cloud.planittesting.com/#/shop') 
    });
    it('Adding All The Items', () => {
        cy.get('.btn.btn-success').click({multiple: true })
        cy.get('#nav-cart > a').click()
        cy.get('.btn-checkout').click()
        TheChecOutProcess('abd','hind','asdcvf@gmail.com','07829292929','USA',2,'12345678909');
        cy.get('.alert').invoke('text').should('contain',' your order has been accepted')

    });

    it('The Highest Price Element', () => {
        let highestPrice = 0;
        let highestPriceIndex = 0;
    
        cy.get('.product-price.ng-binding').each(($element, index) => {
            const currentPrice = parseFloat($element.text().replace('$', ''));
            if (currentPrice > highestPrice) {
                highestPrice = currentPrice;
                highestPriceIndex = index;
            }
        }).then(() => {
            cy.get('.btn.btn-success').eq(highestPriceIndex).click();
        });
        cy.get('.cart-count').invoke('text').then((Price)=>{
            const count = parseInt(Price);
            expect(count).to.eq(1)
        })
    });
    
    it('TheSecond Row Item Only', () => {
        cy.get('.btn.btn-success').eq(3).click(); 
        cy.get('.btn.btn-success').eq(4).click(); 
        cy.get('.btn.btn-success').eq(5).click();
        cy.get('.cart-count').invoke('text').then((Price)=>{
            const count = parseInt(Price);
            expect(count).to.eq(3)
        })
    });
});


