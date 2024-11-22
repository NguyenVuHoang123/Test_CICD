import { Autocomplete, createFilterOptions, Stack, TextField } from '@mui/material'
import { Room,Floor } from 'src/utils/type';
import React, { useState, useEffect } from 'react'
import  BlockService  from 'src/@core/service/Block';
import  CampusService  from 'src/@core/service/Campus';
import  FloorService  from 'src/@core/service/FLoor';
import  RoomService  from 'src/@core/service/Room';

interface LevelSelectProps {
    onChange: (value: any) => void;
}
const LevelSelect = ({ onChange }: LevelSelectProps) => {
    const [selectedBlocks, setSelectedBlocks] = useState<any>(null);
    const [selectedCampus, setSelectedCampus] = useState<any>(null);
    const [selectedFloor, setSelectedFloor] = useState<any>(null);
    const [selectedRoom, setSelectedRoom] = useState<any>(null);
    const [campus, setCampus] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [floors, setFloors] = useState<Floor[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);


    const filterOptions = createFilterOptions({
        ignoreCase: true,
        limit: 10,
        stringify: (option: any) => option.roomCode
      });

      
    const fetchData = async()=>{
        const [campusResponse, roomResponse] = await Promise.all([CampusService.getAllCampus(), RoomService.getAllRoom()]);
        setCampus(campusResponse.data);
        setRooms(roomResponse.data);
    }

    useEffect(()=>{
        fetchData();
    },[])

    useEffect(()=>{
        if(selectedFloor ===null){
            fetchData();
            return;
        }
        if(selectedBlocks === null){
            fetchData();
            return;
        }
        if(selectedCampus === null){
            fetchData();
            return;
        }
    },[selectedCampus,selectedBlocks,selectedFloor,selectedRoom])

    const handleCampusSelect = async (CampusId: string) => {
        setSelectedCampus(CampusId);
        try {
            const response = await BlockService.getBlockByCampusId(CampusId);
            setBlocks(response.data);
            setFloors([]);
            setRooms([]);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách tầng:', error);
        }
    };
    const handleBlockSelect = async (blockId: string) => {
        setSelectedBlocks(blockId);
        try {
            const response = await FloorService.getFloorByBlockId(blockId);
            if (response.data.length > 0) {
                setFloors(response.data);
                setSelectedFloor(null)
                setRooms([]);
                setSelectedRoom(null)
            }
            else {
                setFloors([]);
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách tầng:', error);
        }
    };

    const handleFloorSelect = async (floorId: string,blockId?:string) => {
        setSelectedFloor(floorId);
        try {
            const response = await RoomService.getRoomsByFloorIdAndBlockId(floorId, blockId?blockId:selectedBlocks);
            if (response.data.length > 0) {
                setRooms(response.data);
            }

        } catch (error) {
            console.error('Lỗi khi lấy danh sách tầng:', error);
        }
    };

    const handleRoomSelect = async (roomId: string) => {
        if(selectedCampus === null || selectedBlocks === null || selectedFloor === null){
            const response = await RoomService.getFullInfoByRoomId(roomId);
            await handleCampusSelect(response.data.campusId);
            await handleBlockSelect(response.data.blockId);
            await handleFloorSelect(response.data.floorId,response.data.blockId);
            await setSelectedRoom(roomId);
            onChange(rooms.find(room => room.id === roomId));
        }
        else{
            setSelectedRoom(roomId);
            onChange(rooms.find(room => room.id === roomId));
        }
    };



    return (
        <Stack direction="row" spacing={1}>
            <Autocomplete
                fullWidth
                sx={{ flex: 1 }}
                options={campus}
                getOptionLabel={(option: any) => option.campusName || ''}
                value={campus.find((c: any) => c.id === selectedCampus) || null}
                onChange={(event, newValue) => {
                    if (newValue) {
                        handleCampusSelect(newValue ? newValue.id : '');
                    }
                    else {
                        setSelectedCampus(null);
                        setBlocks([]);
                        setSelectedBlocks(null);
                        setFloors([]);
                        setSelectedFloor(null);
                        setRooms([]);
                        setSelectedRoom(null);
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Chọn cơ sở"
                        variant="outlined"
                    />
                )}
                noOptionsText="Không có dữ liệu cơ sở"
                isOptionEqualToValue={(option, value) => option.id === value.id}
            />
            <Autocomplete
                fullWidth
                sx={{ flex: 1 }}
                options={blocks}
                getOptionLabel={(option: any) => option.blockName || ''}
                value={blocks.find((b: any) => b.id === selectedBlocks) || null}
                onChange={(event, newValue) => {
                    if (newValue) {
                        handleBlockSelect(newValue ? newValue.id : '');
                    }
                    else {
                        setSelectedBlocks(null);
                        setFloors([]);
                        setSelectedFloor(null);
                        setRooms([]);
                        setSelectedRoom(null);
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Chọn tòa nhà"
                        variant="outlined"
                    />
                )}
                noOptionsText="Không có dữ liệu tòa nhà"
                isOptionEqualToValue={(option, value) => option.id === value.id}
            />
            <Autocomplete
                fullWidth
                sx={{ flex: 1 }}
                options={floors}
                getOptionLabel={(option: Floor) => option.floorName || ''}
                value={floors.find(floor => floor.id === selectedFloor) || null}
                onChange={(event, newValue) => {
                    if (newValue) {
                        handleFloorSelect(newValue ? newValue.id : '');
                    }
                    else {
                        setSelectedFloor(null);
                        setRooms([]);
                        setSelectedRoom(null);
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Chọn tầng"
                        variant="outlined"
                    />
                )}
                noOptionsText="Không có dữ liệu tầng"
                isOptionEqualToValue={(option, value) => option.id === value.id}
            />
            <Autocomplete
                fullWidth
                sx={{ flex: 1 }}
                options={rooms}
                filterOptions={filterOptions}
                getOptionLabel={(option: any) => option.roomCode || ''}
                value={rooms.find(room => room.id === selectedRoom) || null}
                onChange={(event, newValue) => {
                    if (newValue) {
                        handleRoomSelect(newValue ? newValue.id : '');
                    }
                    else {
                        setSelectedRoom(null);
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Chọn phòng"
                        variant="outlined"
                    />
                )}
                noOptionsText="Không có dữ liệu phòng"
                isOptionEqualToValue={(option, value) => option.id === (value?.id || value)}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        {option.roomCode}
                    </li>
                )}
            />
        </Stack>
    )
}

export default LevelSelect