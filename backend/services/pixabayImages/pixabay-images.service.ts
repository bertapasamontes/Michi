import cloudinary from '../../config/cloudinary/cloudinary.config';
import axios from 'axios';

export class PixabayImagesService {

  private pixabayEstructura: string;
  private pixabayAPIKey: string;
  private cloudinaryFolder: string;


  constructor(
  ) {
    this.pixabayEstructura = process.env.pixabayEstructura || "someURL";
    this.pixabayAPIKey = process.env.pixabayAPIKEY || "someKey";
    this.cloudinaryFolder = 'productos'; 
   }

   async getImageFromPixabay(nameProduct: string): Promise<string> {
    try {
        console.log("api key: ", this.pixabayAPIKey)
        //cogemos la imagen de pixabay segun el nombre del producto
        const response = await axios.get(`${this.pixabayEstructura}${this.pixabayAPIKey}&q=${nameProduct}&image_type=photo&pretty=true`);
        const imgURL= response.data.hits[0]?.webformatURL || ''; // Devuelve la URL de la primera imagen

        if(imgURL){
            //subimos la imagen encontrada a cloudinary:
            const uploadResponse = await cloudinary.uploader.upload(imgURL, {
                folder: this.cloudinaryFolder,
                public_id: nameProduct.replace(/\s+/g, '_'), // Nombre sin espacios
                transformation:[{
                    fetch_format: "auto"
                }]
            });

            console.log('Imagen subida a Cloudinary:', uploadResponse.secure_url);
            //devolvemos la url de cloudinary para guardarla en el json del producto
            return uploadResponse.secure_url; 
        }
        
        console.error('no se ha podido encontrar la imagen en pixabay');
        return 'Sin imagen';
        
        
    } catch (error) {
        console.error('Error obteniendo imagen de Pixabay:', error);
        throw new Error('No se pudo obtener la imagen de Pixabay');
    }
}

  
  
}
