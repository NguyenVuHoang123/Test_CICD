export type Floor = {
  id: string,
  floorCode: string,
  floorName: string,
  description: string,
  floorOrder: number,
  basementOrder: number,
  sortOrder: number,
  notes: string,
  createdAt: string,
  updatedAt: string
};

export type Room = {
  id: string,
  roomCode: string,
  roomName: string,
  description: string,
  roomNo: string,
  dvtcode: string,
  dvtname: string,
  assetTypeCode: string,
  assetTypeName: string,
  useDepartmentCode: string,
  useDepartmentName: string,
  manageDepartmentCode: string,
  manageDepartmentName: string,
  numberOfSeats: number,
  floorArea: number,
  contructionArea: number,
  valueSettlement: number,
  originalPrice: number,
  centralFunding: number,
  localFunding: number,
  otherFunding: number,
  statusCode: string,
  statusName: string,
  sortOrder: number,
  blockId: string,
  roomCategoryId: string,
  floorId: string,
  createdAt: string,
  updatedAt: string,
  roomCategory: null | any,
  lessons: any[]
};

export type Shift = {
  id: string,
  shiftName: string,
  startTime: string,
  endTime: string,
  roomCategoryId: string,
  createAt: string,
  updateAt: string
}

export type Device = {
  id: number;
  name: string;
  quantity: number;
};

export type UserData = {
  id: string,
  code: string,
  name: string,
  email: string,
  phone: string | null,
  department: string,
  position: string | null,
  rfid: string,
  borrowType: string
}

export type Equipment = {
  id: string;
  equimentName: string;
  equimentCode: string;
  quantily: number;
}