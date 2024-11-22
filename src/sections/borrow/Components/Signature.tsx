import React, { useRef, useState, useEffect } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';

interface SignatureComponentProps {
    onChange: (signature: string) => void;
}

const SignatureComponent = ({ onChange}: SignatureComponentProps) => {
    const signatureCanvasRef = useRef<any>(null);
    const theme = useTheme();
    const handleClear = (evn: any) => {
        signatureCanvasRef.current?.clear();
        onChange('');
    }

    const isSignatureEmpty = () => {
        return signatureCanvasRef.current?.isEmpty();
    };

    const getSignatureBase64 = () => {
        if (signatureCanvasRef.current) {
            const url = signatureCanvasRef.current.toDataURL();
            const base64 = url.split(';base64,')[1];
            return base64;
        }
        return '';
    };

    const handleEndStroke = () => {
        if (isSignatureEmpty()) {
            onChange('');
        } else {
            onChange(getSignatureBase64());
        }
    };
    return (
        <Box sx={{width:'fit-content'}}>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant="subtitle1">Ký tên</Typography>
                <Button variant='outlined' onClick={handleClear}>Xóa</Button>
            </Box>
            <Box sx={{height:'8pt'}}/>
            <SignatureCanvas
                ref={signatureCanvasRef}
                penColor={theme.palette.primary.main}
                canvasProps={{width:350,height: 200, className: 'signature-canvas'}}
                backgroundColor={theme.palette.grey[200]}
                onEnd={handleEndStroke}
            />
        </Box>

    );
}

export default SignatureComponent