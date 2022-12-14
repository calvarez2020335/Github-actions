import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './product.service'
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';
import { environment } from 'src/environments/environment';
import { HttpStatusCode } from '@angular/common/http';

//Le ponemos una f antes de la prueba para que se enfoque en solo esta
fdescribe('ProductsService', () => {

  //Esto es como la inyección de dependecias

  let productService: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService
      ]
    })
    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  })

  //Prueba basica para ver si el servivicio se creo con exito
  it('should be create Product Service', () => {
    expect(productService).toBeTruthy();
  })

  //Test para una simple llamada Https, de un get, super basica
  describe('Tests for getAllSimple products', () => {
    it('should return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(2);

      //Act
      productService.getAllSimple().subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length)
        expect(data).toEqual(mockData)
        doneFn();
      })

      //http Config
      const url = `${environment.API_URL}/api/v1/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);


    })
  })

  //Test mas complejo de un metodo get
  describe('tests for getAll', () => {
    it('should return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      //Act
      productService.getAll()
        .subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);
          doneFn();
        });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);

    });

    ////////////////////////////////////////////////////////////////////

    it('should return product list with taxes', (doneFn) => {
      // Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * .19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 * .19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, // 0 * .19 = 0
        },
        {
          ...generateOneProduct(),
          price: -100, // = 0
        }
      ];
      //Act
      productService.getAll()
        .subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);
          expect(data[0].taxes).toEqual(19);
          expect(data[1].taxes).toEqual(38);
          expect(data[2].taxes).toEqual(0);
          expect(data[3].taxes).toEqual(0);
          doneFn();
        });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);

    });

    ///////////////////////////////

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;
      //Act
      productService.getAll(limit, offset)
        .subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);
          doneFn();
        });

      // http config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
    });
  });

  describe('test for create', () => {
    it('should return a new product', (doneFn) => {

      //Arrange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new Product',
        price: 100,
        images: ['img'],
        description: 'new Product description',
        categoryId: 12
      }
      //Act
      productService.create({ ...dto }).subscribe(data => {
        expect(data).toEqual(mockData);
        //Asert
        doneFn();
      })
      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    })
  })

  describe('Test for update', () => {
    it('should update a product', (doneFn) => {
      //Data falsa o mockeada
      const mockData: Product = generateOneProduct();
      //Data con datos a actualizar
      const dto: UpdateProductDTO = {
        title: 'new Product'
      }
      //ID del producto
      const productId = '1';

      productService.update(productId, { ...dto }).subscribe((data) => {
        expect(data).toEqual(mockData)
        doneFn();
      })

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');
    })
  })

  describe('Test for delete', () => {

    it('should delete a product', (doneFn) => {

      const mockData: boolean = true;
      const productId: string = '1';

      //Act

      productService.delete(productId).subscribe((data) => {
        //Asert
        expect(data).toEqual(mockData);
        doneFn();
      })

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.url).toEqual(`${environment.API_URL}/api/v1/products/1`)
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockData);

    })

  })

  describe('Test for getOne', () => {
    it('should return a product', (doneFn) => {
      //Data falsa o mockeada
      const mockData: Product = generateOneProduct();
      //ID del producto
      const productId = '1';

      productService.getOne(productId).subscribe((data) => {
        expect(data).toEqual(mockData)
        doneFn();
      })

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');
    })

    it('should return a product with 404', (doneFn) => {
      //ID del producto
      const productId = '1';
      const messageError = 'aaaaaaaa'
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: messageError
      }

      productService.getOne(productId).subscribe({
        error: (error) => {
          //ASSERT
          expect(error).toEqual('El producto no existe')
          doneFn();
        },
      })

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(messageError, mockError);
      expect(req.request.method).toEqual('GET');
    })

    it('should return error 409 (Conflict)', (doneFn) => {

      const idProduct: string = '1';
      const messageError = 'Conflict';
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: 'Conflict'
      }

      productService.getOne(idProduct).subscribe({
        error: (error) => {
          expect(error).toEqual('Algo esta fallando en el server')
          doneFn()
        },
      })

      // http config
      const url = `${environment.API_URL}/api/v1/products/${idProduct}`;
      const req = httpController.expectOne(url);
      req.flush(messageError, mockError);
      expect(req.request.method).toEqual('GET');

    })

    it('should return a error Unauthorized', (doneFn) => {

      const productId: string = '1';
      const messageError = 'Unauthorized'
      const mockData = {
        status: HttpStatusCode.Unauthorized,
        statusText: 'Unauthorized'
      }

      productService.getOne(productId).subscribe({
        error: (err) => {
          expect(err).toEqual('No estas permitido'),
            doneFn()
        },
      })

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      req.flush(messageError, mockData);
      expect(req.request.method).toEqual('GET');
    })

    it('should return right msg when code is undefined', (doneFn) => {
      //Arrage
      const productId = '4';
      const msgError = 'Error message';
      const mockError = {
        status: HttpStatusCode?.BadRequest,
        statusText: msgError
      }
      //Act
      productService.getOne(productId)
        .subscribe({
          error: (error) => {
            expect(error).toEqual('Ups algo salio mal');
            doneFn()
          }
        });
      //Assert
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError, mockError);
    });



  })
})