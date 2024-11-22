import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';

const IconTextComponent = ({ icon, text,type }: any) => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', gap: 0.5, color: type === 'warning' ? theme.palette.warning.main : theme.palette.error.main }}>
            {React.cloneElement(icon, { sx: { fontSize: '16px' } })}
            <Typography variant="caption">{text}</Typography>
        </Box>
    )
}

export default IconTextComponent;