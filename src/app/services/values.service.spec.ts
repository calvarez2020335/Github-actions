import { ValuesService } from './values.service';

describe('ValuesService', () => {
  let service: ValuesService;

  beforeEach(() => {
    service = new ValuesService();
  })

  it('should be create', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
    })
  })


  describe('Test for setValue' , () => {
    it('should change the value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    })
  })

  describe('Test for getPromise' , () => {

    it('should return "promise value" from promise with then', (doneFn) => {
      service.getPromiseValue().then((value) => {
        //ASSERT
        expect(value).toBe('promise value')
        doneFn()
      })
    })

    it('should return "promise value" from promise using async', async () => {
      const rta = await service.getPromiseValue();
      expect(rta).toBe('promise value')
    })


  })

  describe('Test for Observable' , () => {

    it('should return "promise value" from promise with subscribe', (doneFn) => {
      
      service.getObservableValue().subscribe( (value) =>{
        expect(value).toBe('observable value')
        doneFn();
      } )
    
    })

  })


});
