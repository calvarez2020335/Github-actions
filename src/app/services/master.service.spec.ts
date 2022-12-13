import { TestBed } from '@angular/core/testing'

import { MasterService } from './master.service';
import { ValuesService } from './values.service';
import { FakeValuesService } from './value-fake.service';

describe('MasterService', () => {

  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValuesService>

  beforeEach(() => {

    const spy = jasmine.createSpyObj('ValueService', ['getValue'])

    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValuesService, useValue: spy }
      ]
    })
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValuesService) as jasmine.SpyObj<ValuesService>;
  })

  it('should be create', () => {
    expect(masterService).toBeTruthy();
  })

  /* it('should return "my value" from real service', () => {

    const valueService = new ValuesService();
    const masterService = new MasterService(valueService);

    expect(masterService.getValue()).toBe('my value');
  });

  //Esta es una manera pero no muy buena, por que se tiene que mantener actualizado el "Cascaron"
  it('should return "other value" from the fake service', () => {

    const fakevalueService = new FakeValuesService();
    const masterService = new MasterService(fakevalueService as unknown as ValuesService);

    expect(masterService.getValue()).toBe('fake value');
  }); */
  /* 
    //Esto es mejor, pasarle un objeto, esto es de forma manual
    it('should return "other value" from the fake object', () => {
  
      const fake = { getValue: () => 'fake from obj' }
      const masterService = new MasterService(fake as ValuesService);
  
      expect(masterService.getValue()).toBe('fake from obj');
    }); */

  it('should call to getValue from Valueservice', () => {

    valueServiceSpy.getValue.and.returnValue('fake value')
    expect(masterService.getValue()).toBe('fake value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });

});
