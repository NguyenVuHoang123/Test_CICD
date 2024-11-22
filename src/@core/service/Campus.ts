import axios from "axios";

import { CONFIG } from "src/config-global";

export class CampusService {

    API_ENDPOINT = CONFIG.server.endpoints;

    getCampusById = async (CampusId: string) => (axios.get(`${this.API_ENDPOINT}/api/Campus?id=${CampusId}`));
    
    getAllCampus = async () => (axios.get(`${this.API_ENDPOINT}/api/Campus`));
    
}
export default new CampusService();