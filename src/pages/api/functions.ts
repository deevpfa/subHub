import { api_url } from "../../constants/enviroments";
const normalizeUrl = (url: string) => {
    if (url.startsWith('http')) return url;
    if (!url.startsWith('/')) {
        url = '/' + url;
    }


    return api_url + url;
}


/** Se envian peticiones por medio del metodo `GET` */
export const doGet = async (url: string): Promise<any> => {
    try {
        const response = await fetch(normalizeUrl(url));
        // if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}
/** Se envian peticiones por medio del metodo `POST` */
export const doPost = async (url: string, body: any) => {
    try {
        const response = await fetch(normalizeUrl(url), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        // if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}

/** Se envian peticiones por medio del metodo `PUT` */
export const doPut = async (url: string, body: any) => {
    try {
        const response = await fetch(normalizeUrl(url), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        // if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}
/** Se envian peticiones por medio del metodo `DELETE` */
export const doDelete = async (url: string) => {
    try {
        const response = await fetch(normalizeUrl(url), { method: 'DELETE', headers: {} });
        // if (!response.ok) throw new Error('Network response was not ok');
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}


