// src/utils/uploadImage.js
import Resizer from 'react-image-file-resizer';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export const uploadToImgBB = async (file) => {
    return new Promise((resolve, reject) => {
        if (!IMGBB_API_KEY) {
            reject(new Error("Falta la API KEY de ImgBB en el archivo .env"));
            return;
        }
        Resizer.imageFileResizer(
            file,
            1024,         
            1024,         
            'WEBP',      
            80,          
            0,           
            async (uri) => {
                try {
                    const base64 = uri.split(',')[1];
                    const formData = new FormData();
                    formData.append('image', base64);

                    const response = await fetch(
                        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                        { method: 'POST', body: formData }
                    );

                    const result = await response.json();

                    if (result.success) {
                        resolve({
                            url: result.data.url, 
                            preview: uri,         
                        });
                    } else {
                        reject(new Error("Error en ImgBB: " + (result.error?.message || "Desconocido")));
                    }
                } catch (err) {
                    reject(err);
                }
            },
            'base64'
        );
    });
};