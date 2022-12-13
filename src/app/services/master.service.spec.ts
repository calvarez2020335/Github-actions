import { MasterService } from './master.service';
import { ValuesService } from './values.service';
import { FakeValuesService } from './value-fake.service';

describe('MasterService', () => {

  it('should return "my value" from real service', () => {
    
    const valueService = new ValuesService();
    const masterService = new MasterService(valueService);
    
    expect(masterService.getValue()).toBe('my value');
  });

  //Esta es una manera pero no muy buena, por que se tiene que mantener actualizado el "Cascaron"
  it('should return "other value" from the fake service', () => {
    
    const fakevalueService = new FakeValuesService();
    const masterService = new MasterService(fakevalueService as unknown as ValuesService);
    
    expect(masterService.getValue()).toBe('fake value');
  });

  //Esto es mejor, pasarle un objeto, esto es de forma manual
  it('should return "other value" from the fake object', () => {
    
    const fake = { getValue: () => 'fake from obj' }
    const masterService = new MasterService(fake as ValuesService);
    
    expect(masterService.getValue()).toBe('fake from obj');
  });

  it('should call to getValue from Valueservice', () => {
  
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    valueServiceSpy.getValue.and.returnValue('fake value')
 
    const masterService = new MasterService(valueServiceSpy);
    
    expect(masterService.getValue()).toBe('fake value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });

});
