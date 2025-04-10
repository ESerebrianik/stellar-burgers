import { BASE_URL, testUrl } from '../../src/utils/urlTest';

const modalselector = `[data-cy=modal]`;
const closeselector = `[data-cy=modal-close]`;
const fluorbun = 'Флюоресцентная булка R2-D3';
const kratbun = 'Краторная булка N-200i';
const molluskmeat = 'Мясо бессмертных моллюсков Protostomia';
const fillet = 'Филе Люминесцентного тетраодонтимформа';
const toPlaceOrder = 'Оформить заказ';

describe('Перехват запроса на эндпоинт ingredients', () => {
  beforeEach(() => {
    cy.intercept('GET', `${BASE_URL}/ingredients`, {
      fixture: 'ingredients'
    });
    cy.visit(`${testUrl}`);
  });
  describe('Проверка сборки бургера', () => {
    it('Проверка отсутствия ингридиента', () => {
        cy.contains('span', fluorbun).should('not.exist');
    });
    it('Проверка добавления одного игредиента', () => {
        cy.contains('li', fluorbun).find('button').click();
        cy.contains('span', fluorbun).should('exist');
      });
    
  
      it('Проверка добавления нескольких ингредиентов', () => {
        cy.contains('li', fluorbun).find('button').click();
  
        cy.contains('div', 'Начинки').click();
        cy.contains('li', fillet)
          .find('button')
          .click();
        cy.contains('li', 'Хрустящие минеральные кольца').find('button').click();
        cy.contains('li', 'Сыр с астероидной плесенью').find('button').click();
      });
  
      it('Проверка смена булки', () => {
        cy.contains('li', kratbun).find('button').click();
        cy.contains('li', fluorbun).find('button').click();
  
        cy.contains('span', fluorbun);
        cy.contains('span', kratbun).should('not.exist');
      });
    });
  
    describe('Проверка работы модальных окон', () => {
      it('Проверка открытия модального окна ингредиента', () => {
        cy.contains('li', molluskmeat).click();
        cy.wait(1000);
  
        const modal = cy.get(modalselector);
        modal.should('exist');
  
        const close = cy.get(closeselector);
        close.should('exist');
  
        modal.contains('h3', 'Детали ингредиента');
        cy.contains('h3', molluskmeat);
      });
  
      it('Проверка закрытия модального окна ингредиентов по клику', () => {
        cy.contains('li', molluskmeat).click();
  
        const modal = cy.get(modalselector);
        modal.should('exist');
  
        const close = cy.get(closeselector );
        close.should('exist');
  
        modal.contains('h3', 'Детали ингредиента');
  
        close.click();
        modal.should('not.exist');
      });
  
      it('Проверка закрытия модального окна ингредиентов по клавише esc', () => {
        cy.contains('li', molluskmeat).click();
  
        cy.get(modalselector).should('exist');
  
        cy.get('body').type('{esc}');
  
        cy.get(modalselector).should('not.exist');
      });
    });
  
    describe('Проверка создания заказа', () => {
      beforeEach(() => {
        cy.intercept('GET', `${BASE_URL}/auth/user`, {
          fixture: 'user.json'
        });
  
        cy.intercept('POST', `${BASE_URL}/orders`, {
          fixture: 'order.json'
        }).as('createOrder');
  
        cy.setCookie('token', 'token');
        window.localStorage.setItem('token', 'token');
      });
  
      it('Проверка создания заказа', () => {
        cy.contains('button', toPlaceOrder ).should('be.disabled');
        cy.contains('li', kratbun).find('button').click();
        

        cy.contains('span', 'Начинки').click();
        cy.contains('li', fillet)
            .find('button')
            .click();
        cy.contains('span', 'Соусы').click();
        cy.contains('li', 'Соус фирменный Space Sauce').find('button').click();

        cy.contains('li', fillet).find('button').click();
        cy.contains('button', toPlaceOrder ).should('not.be.disabled');

        cy.contains('button', toPlaceOrder ).click();
        cy.wait('@createOrder');

        const modal = cy.get(modalselector);
        modal.should('exist');
        const close = cy.get(closeselector);
        close.should('exist');

        cy.contains('p', 'идентификатор заказа');
        cy.contains('p', 'Ваш заказ начали готовить');
        cy.contains('h2', '66666').should('exist');
        cy.contains('p', 'Дождитесь готовности на орбитальной станции');

        close.click();
        cy.contains('p', 'идентификатор заказа').should('not.exist');
        cy.contains('p', 'Ваш заказ начали готовить').should('not.exist');
        cy.contains('h2', '66666').should('not.exist');
        cy.contains('p', 'Дождитесь готовности на орбитальной станции').should(
            'not.exist'
      );
    });

    afterEach(() => {
      cy.clearCookie('token');
      window.localStorage.removeItem('token');
    });
  });
});