import { TIMEOUT_SEC } from './config.js';

const timeout = (s) => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`La solicitud tardó demasiado! (${s} segundos) ⏳`));
      }, s * 1000);
    });
  };

export const getJSON = async (url) => {
    try {
        const fetchPro = fetch(url)
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

        if (!res.ok) throw new Error(`No se proporcionó un ID válido (${res.status})`);

        const data = await res.json(); 
        return data
    } catch (error) {
        throw error;
    }
    
};