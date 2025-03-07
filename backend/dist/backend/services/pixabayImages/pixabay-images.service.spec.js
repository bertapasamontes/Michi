"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const pixabay_images_service_1 = require("./pixabay-images.service");
describe('PixabayImagesService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(pixabay_images_service_1.PixabayImagesService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
