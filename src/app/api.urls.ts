import { AttendanceService } from "./services/attendance.service";

export const BASE_URL = 'https://psalm-23-web-app-backend.onrender.com/api/';

export const apiUrls = {
  authServiceApi: `${BASE_URL}auth/`,
  productServiceApi: `${BASE_URL}products/`,
  orderServiceApi: `${BASE_URL}orders/`,
  usedSuppliesServiceApi: `${BASE_URL}usedSupplies/`,
  scrappingServiceApi: `${BASE_URL}scrapping/`,
  userServiceApi: `${BASE_URL}user/`,
  attendanceServiceApi: `${BASE_URL}attendance/`,
  produceHistoryServiceApi: `${BASE_URL}produceHistory/`,
  accountManagementServiceApi: `${BASE_URL}approveUser/`,
  productPerformanceServiceApi: `${BASE_URL}productPerformance/`,
  suppliesServiceApi: `${BASE_URL}supplies/`,
  stockHistoryServiceApi: `${BASE_URL}stockhistory/`
};
