import axios from "axios";
import { CONFIG } from "src/config-global";

export class QRScannerService {
     API_ENDPOINT = CONFIG.server.endpoints;

     getInfoByBorrowCode = async(code:string) => {
        return axios.get(`${this.API_ENDPOINT}/api/QRScanner/validate/BorrowLog?code=${code}`);
     }

     getStudentInfo = async (code:string) => {
        return axios.get(`${this.API_ENDPOINT}/api/QRScanner/validate/Student?code=${code}`);
     }
     getStaffInfo = async (code:string) => {
        return axios.get(`${this.API_ENDPOINT}/api/QRScanner/validate/Staff?code=${code}`);
     }
     getVisitorInfo = async (code:string) => {
        return axios.get(`${this.API_ENDPOINT}/api/QRScanner/validate/Visitor?code=${code}`);
     }
}
export default new QRScannerService();