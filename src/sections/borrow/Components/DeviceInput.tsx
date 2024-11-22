import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Select, MenuItem, useTheme, Autocomplete, TextField } from '@mui/material';
import SubjectIcon from '@mui/icons-material/Subject';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextCaptionComponent from 'src/components/common/common-text-disable';

type Device = {
    id: number;
    name: string;
    quantity: number;
};

const DeviceInput = ({ onchange,deviceOptions }: any) => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const theme = useTheme();

    // Hàm để thêm một thiết bị mới
    const handleAddDevice = () => {
        const newDevice = { ...deviceOptions[0], quantity: 1 };
        setDevices([...devices, newDevice]);
    };

    // Hàm để thay đổi thiết bị được chọn
    const handleDeviceChange = (index: number, value: number) => {
        const newDevices = [...devices];
        newDevices[index].id = value;
        newDevices[index].name = deviceOptions.find((option:any) => option.id === value)?.name || '';
        setDevices(newDevices);
    };

    // Hàm để tăng số lượng thiết bị
    const handleIncreaseQuantity = (index: number) => {
        const newDevices = [...devices];
        newDevices[index].quantity += 1;
        setDevices(newDevices);
    };

    // Hàm để giảm số lượng thiết bị
    const handleDecreaseQuantity = (index: number) => {
        const newDevices = [...devices];
        if (newDevices[index].quantity === 1) {
            newDevices.splice(index, 1);
        } else {
            newDevices[index].quantity -= 1;
        }
        setDevices(newDevices);
    };

    useEffect(() => {
        onchange(devices)
    }, [devices])

    return (
        <Box>
            {/* Box thêm thiết bị */}
            <Box
                sx={{
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <TextCaptionComponent text="Thêm thiết bị" type="disable" />
                <IconButton color="primary" onClick={handleAddDevice}>
                    <AddIcon />
                </IconButton>
            </Box>

            {/* Render các ô chọn thiết bị đã thêm */}
            {devices.map((device, index) => (
                <Box
                    key={index}
                    sx={{
                        mt: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px',
                    }}
                >
                    <Autocomplete
                        value={deviceOptions.find((option:any) => option.id === device.id)}
                        onChange={(_, newValue) => {
                            if (newValue) {
                                handleDeviceChange(index, newValue.id);
                            }
                        }}
                        options={deviceOptions}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                placeholder="Chọn thiết bị"
                            />
                        )}
                        sx={{ flexGrow: 1 }}
                        disableClearable
                        filterOptions={(options, { inputValue }) =>
                            options.filter(option =>
                                option.name.toLowerCase().includes(inputValue.toLowerCase())
                            )
                        }
                        renderOption={(props, option) => (
                            <li {...props} key={option.id}>
                                <Typography variant="body2">{option.name}</Typography>
                            </li>
                        )}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton color="primary" onClick={() => handleDecreaseQuantity(index)}>
                            <RemoveIcon />
                        </IconButton>
                        <Typography variant="body2" sx={{ mx: 1 }}>
                            {device.quantity}
                        </Typography>
                        <IconButton color="primary" onClick={() => handleIncreaseQuantity(index)}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default DeviceInput;
