"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixabayImagesService = void 0;
const cloudinary_config_1 = __importDefault(require("../../config/cloudinary/cloudinary.config"));
const axios_1 = __importDefault(require("axios"));
class PixabayImagesService {
    constructor() {
        this.pixabayEstructura = process.env.pixabayEstructura || "someURL";
        this.pixabayAPIKey = process.env.pixabayAPIKEY || "someKey";
        this.cloudinaryFolder = 'productos';
    }
    getImageFromPixabay(nameProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                console.log("api key: ", this.pixabayAPIKey);
                //cogemos la imagen de pixabay segun el nombre del producto
                const response = yield axios_1.default.get(`${this.pixabayEstructura}${this.pixabayAPIKey}&q=${nameProduct}&image_type=photo&pretty=true`);
                const imgURL = ((_a = response.data.hits[0]) === null || _a === void 0 ? void 0 : _a.webformatURL) || ''; // Devuelve la URL de la primera imagen
                if (imgURL) {
                    //subimos la imagen encontrada a cloudinary:
                    const uploadResponse = yield cloudinary_config_1.default.uploader.upload(imgURL, {
                        folder: this.cloudinaryFolder,
                        public_id: nameProduct.replace(/\s+/g, '_'), // Nombre sin espacios
                        transformation: [{
                                fetch_format: "auto"
                            }]
                    });
                    console.log('Imagen subida a Cloudinary:', uploadResponse.secure_url);
                    //devolvemos la url de cloudinary para guardarla en el json del producto
                    return uploadResponse.secure_url;
                }
                console.error('no se ha podido encontrar la imagen en pixabay');
                return 'Sin imagen';
            }
            catch (error) {
                console.error('Error obteniendo imagen de Pixabay:', error);
                throw new Error('No se pudo obtener la imagen de Pixabay');
            }
        });
    }
}
exports.PixabayImagesService = PixabayImagesService;
