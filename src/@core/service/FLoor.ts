import axios from "axios";

import { CONFIG } from "src/config-global";

export class FloorService {

   API_ENDPOINT = CONFIG.server.endpoints;

   getFloorByBlockId = async (blockId: string) => (
      axios.get(`${this.API_ENDPOINT}/api/Floors/Block?BlockId=${blockId}`)
   );

}
export default new FloorService();