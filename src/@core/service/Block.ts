import axios from "axios";

import { CONFIG } from "src/config-global";

export class BlockService {

     API_ENDPOINT = CONFIG.server.endpoints;

     getBlockByCampusId = async(CampusId: string) => (axios.get(`${this.API_ENDPOINT}/api/Blocks/ByCampus?campusId=${CampusId}`));

     getAllBlocks = async() => ( axios.get(`${this.API_ENDPOINT}/api/Blocks`))
     
    
}
export default new BlockService();