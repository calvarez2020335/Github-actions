import { Calculator } from './calculator';

describe('Test for Calculator', () => {

    describe('Test for multiply', () => {
        it('should return a nine', () => {
            //AAA
            //Arrange -Preparar todos los utencilios para nuestras pruebas

            const calculator = new Calculator();

            //Act - Actuar o la fase del codigo que queremos ejecutar

            const rta = calculator.multiply(3, 3);

            //Assert -La respuesta es lo que yo espero

            expect(rta).toEqual(9);
        })

        it('should return a 4', () => {
            //AAA
            //Arrange -Preparar todos los utencilios para nuestras pruebas

            const calculator = new Calculator();

            //Act - Actuar o la fase del codigo que queremos ejecutar

            const rta = calculator.multiply(1, 4);

            //Assert -La respuesta es lo que yo espero

            expect(rta).toEqual(4);
        })
    })


    describe('Test for divide', () => {
        it('should return a some numbers', () => {
            //AAA
            //Arrange -Preparar todos los utencilios para nuestras pruebas

            const calculator = new Calculator();

            //Act y Assert- Actuar o la fase del codigo que queremos ejecutar y La respuesta es lo que yo espero

            expect(calculator.divide(6, 3)).toEqual(2);
            expect(calculator.divide(5, 2)).toEqual(2.5);

            //Assert 
        })

        it('for a zero', () => {
            //AAA
            //Arrange -Preparar todos los utencilios para nuestras pruebas

            const calculator = new Calculator();

            //Act y Assert- Actuar o la fase del codigo que queremos ejecutar y La respuesta es lo que yo espero

            expect(calculator.divide(6, 0)).toBeNull();
            expect(calculator.divide(5, 0)).toBeNull();
            expect(calculator.divide(78542154, 0)).toBeNull();

            //Assert 
        })

        it('tests matchers', () => {
            //AAA
            //Arrange -Preparar todos los utencilios para nuestras pruebas

            let name = 'nicolas';
            let name2;

            //Act y Assert- Actuar o la fase del codigo que queremos ejecutar y La respuesta es lo que yo espero

            expect(name).toBeDefined();
            expect(name2).toBeUndefined();

            //Assert 

            expect(1 + 3 === 4).toBeTruthy(); //Unica que se rompe
            expect(1 + 1 === 3).toBeFalsy();

            expect(5).toBeLessThan(10);
            expect(20).toBeGreaterThan(10);

            expect('123456').toMatch(/123/)
            expect(['apples', 'oranges', 'pears']).toContain('oranges');
        })
    })



})