import API from '../helper/axios';

export default async function fetch(id: string) {
    const { data } : any = await API.get(`/v1/users/${id}`);
    return data.data;
}