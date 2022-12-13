import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './product.service'
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';

fdescribe('ProductsService', () => {

    let productService: ProductsService;
    let httpController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                ProductsService
            ]
        })
        productService = TestBed.inject(ProductsService);
        httpController = TestBed.inject(HttpTestingController);
    });

    it('should be create Product Service', () => {
        expect(productService).toBeTruthy();
    })


    describe('Tests for getAllSimple products', () => {

        it('should return a product list', (doneFn) => {
            //Arrange
            const mockData:Product[] = [
                {
                    id: '123',
                    title: 'title',
                    category: {
                        id: 112,
                        name: 'as'
                    },
                    description: 'blas',
                    images: ['img', 'img'],
                    price: 12
                }
            ];

            //Act
            productService.getAllSimple().subscribe( (data) => {
                //Assert
                expect(data.length).toEqual(mockData.length)
                expect(data).toEqual(mockData)
                doneFn();
            })

            //http Config
            const url = `${environment.API_URL}/api/v1/products`
            const req = httpController.expectOne(url);
            req.flush(mockData);
            httpController.verify();

        })


    })


    
})