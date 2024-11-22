import axios from "axios";

import { CONFIG } from "src/config-global";

export class BorrowService {

     API_ENDPOINT = CONFIG.server.endpoints;

     getBorrowDetailByCode = async(code: string) => (axios.get(`${this.API_ENDPOINT}/api/BorrowLog?code=${code}`));

     createBorrow = async(data: any) => (axios.post(`${this.API_ENDPOINT}/api/BorrowLog`, data));
     
     getUserInfoByBorrowCode = async(code: string) => (axios.get(`${this.API_ENDPOINT}/api/BorrowLog/GetGuestInfoByBorrowLogCode?borrowLogCode=${code}`));

     updateUserPhoneNumber = async(borrowCode:string,borrowType:string,phoneNumber:string) => (axios.put(`${this.API_ENDPOINT}/api/BorrowLog/update-phone-number?borrowerCode=${borrowCode}&borrowerType=${borrowType}&newPhoneNumber=${phoneNumber}`));

     createBorrowLog = async(data:any) => (axios.post(`${this.API_ENDPOINT}/api/BorrowLog`, data));
}
export default new BorrowService();