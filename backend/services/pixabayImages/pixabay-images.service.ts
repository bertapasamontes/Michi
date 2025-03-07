import { environment } from '../../env';
import axios from 'axios';

export class PixabayImagesService {

  private pixabayEstructura: string;
  private pixabayAPIKey: string;


  constructor(
  ) {
    this.pixabayEstructura = environment.pixabayEstructura;
    this.pixabayAPIKey = environment.pixabayAPIKEY;
   }

   async getImageFromPixabay(nameProduct: string): Promise<string> {
    try {
        const response = await axios.get(`${this.pixabayEstructura}?key=${this.pixabayAPIKey}&q=${nameProduct}&image_type=photo`);
        return response.data.hits[0]?.webformatURL || ''; // Devuelve la URL de la primera imagen
    } catch (error) {
        console.error('Error obteniendo imagen de Pixabay:', error);
        throw new Error('No se pudo obtener la imagen de Pixabay');
    }
}

  
  
}
