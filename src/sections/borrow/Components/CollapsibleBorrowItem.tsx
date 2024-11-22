import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Box, Switch, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Equipment } from 'src/utils/type';


interface CollapsibleBorrowItemProps {
    onSelectionChange?: (selectedEquipments: Array<{
        id: string;
        name: string;
        quantity: number;
        isSelected: boolean;
    }>) => void;
    id: string;
    data: Equipment[];
}


const CollapsibleBorrowItem = ({ onSelectionChange,id,data }: CollapsibleBorrowItemProps) => {
    const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>(() => {
        const initialState: { [key: string]: boolean } = {};
        data.forEach(item => {
            initialState[item.id] = false;
        });
        return initialState;
    });
    const handleSwitchChange = (equipmentId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedItems(prev => ({
            ...prev,
            [equipmentId]: event.target.checked
        }));
    };

    const getSelectedEquipments = () => {
        return Object.entries(selectedItems)
            .filter(([_, isSelected]) => isSelected)
            .map(([id]) => {
                const equipment = data.find(item => item.id === id);
                return {
                    id: id,
                    name: equipment?.equimentName || '',
                    quantity: equipment?.quantily || 0,
                    isSelected: true
                };
            });
    };

    useEffect(() => {
        const newSelectedItems: { [key: string]: boolean } = {};
        data.forEach(item => {
            newSelectedItems[item.id] = selectedItems[item.id] || false;
        });
        setSelectedItems(newSelectedItems);
    }, [data]);

    useEffect(() => {
        onSelectionChange?.(getSelectedEquipments());
    }, [selectedItems]);
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {data.map((equipment, index) => (
                <Box
                    key={equipment.id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">{index + 1}.</Typography>
                        <Typography variant="body2">{equipment.equimentName}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2">x{equipment.quantily}</Typography>
                        <Switch
                            checked={selectedItems[equipment.id]}
                            onChange={handleSwitchChange(equipment.id)}
                        />
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default CollapsibleBorrowItem