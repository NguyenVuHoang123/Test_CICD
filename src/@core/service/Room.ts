import axios from "axios";
import { CONFIG } from "src/config-global";

export class RoomService {
     API_ENDPOINT = CONFIG.server.endpoints;
     getRoomsByFloorIdAndBlockId = async (floorId: string,blockId:string) => {
        return axios.get(`${this.API_ENDPOINT}/api/Rooms/By-Floor&Block?floorId=${floorId}&blockId=${blockId}`);
     }
     getFullInfoByRoomId = async (roomId: string) => {
        return axios.get(`${this.API_ENDPOINT}/api/Rooms?roomId=${roomId}`);
     }
     getAllRoom = async()=>{
        return axios.get(`${this.API_ENDPOINT}/api/Rooms/All`);
     }
     
}
export default new RoomService();