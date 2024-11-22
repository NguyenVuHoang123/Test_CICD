import { Card, CardContent, Box, TextField, Container, Button, InputAdornment } from "@mui/material";
import QRScanner from "./QRScanner";
import { useState } from "react";
import SnackbarComponent from "src/components/common/common-snackbar";
import QRScannerService from "src/@core/service/QR";

interface Step1ContentProps {
    onSubmit: (userCode: string, borrowCode: string, data: any) => void;
}

export const Step1Content = ({ onSubmit }: Step1ContentProps) => {
    const [userCode, setUserCode] = useState('');
    const [borrowCode, setBorrowCode] = useState('');
    const [error, setError] = useState(false);
    const [borrowCodeError, setBorrowCodeError] = useState(false);
    const [helperText, setHelperText] = useState('');
    const [borrowCodeHelperText, setBorrowCodeHelperText] = useState('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarStatus, setSnackBarStatus] = useState<'success' | 'error' | 'info' | 'warning'>('success');
    const [snackBarMessage, setSnackBarMessage] = useState('');

    const validLengths = [0, 4, 10, 12, 16];
    const handleQRScanner = (data: any) => {
        if (data.length === 6) {
            setBorrowCode(data);
        }
        else {
            setUserCode(data);
            setError(false);
            setHelperText('');
        }
    }

    const validateUserCode = (code: string): boolean => {
        if (!validLengths.includes(code.length)) {
            setError(true);
            setHelperText('Vui lòng nhập đúng mã số người mượn');
            return false;
        }
        return true;
    };
    const validateBorrowCode = (code: string): boolean => {
        if (code.length !== 6) {
            setBorrowCodeError(true);
            setBorrowCodeHelperText('Vui lòng nhập đúng mã đơn mượn');
            return false;
        }
        return true;
    };


    const handleNextStep = async () => {
        if (borrowCode.length > 0) {
            const result = validateBorrowCode(borrowCode);
            if (result) {
                const response = await QRScannerService.getInfoByBorrowCode(borrowCode);
                if (response.data.length > 0) {
                    onSubmit(userCode, borrowCode, response.data);
                    return;
                }
                else {
                    setSnackBarOpen(true);
                    setSnackBarStatus('error');
                    setSnackBarMessage('Đơn này đã được trả hoặc không tồn tại');
                    setTimeout(() => {
                        setSnackBarOpen(false);
                    }, 3000);
                }
            }
            return;
        }
        if (userCode.length > 0) {
            const result = validateUserCode(userCode);
            if (result) {
                if (userCode.length === 4) {
                    const response = await QRScannerService.getStaffInfo(userCode);
                    if (response.status === 200) {
                        onSubmit(userCode, borrowCode, response.data);
                        return;
                    }
                    else {
                        setSnackBarOpen(true);
                        setSnackBarStatus('error');
                        setSnackBarMessage('Nhân viên không tồn tại');
                        setTimeout(() => {
                            setSnackBarOpen(false);
                        }, 3000);
                    }
                }
                else if (userCode.length === 10) {
                    const response = await QRScannerService.getStudentInfo(userCode);
                    if (response.status === 200) {
                        onSubmit(userCode, borrowCode, response.data);
                        return;
                    }
                    else {
                        setSnackBarOpen(true);
                        setSnackBarStatus('error');
                        setSnackBarMessage('Sinh viên không tồn tại');
                        setTimeout(() => {
                            setSnackBarOpen(false);
                        }, 3000);
                    }
                }
                else {
                    const response = await QRScannerService.getVisitorInfo(userCode);
                    if (response.status === 200) {
                        onSubmit(userCode, borrowCode, response.data);
                        return;
                    }
                    else {
                        setSnackBarOpen(true);
                        setSnackBarStatus('error');
                        setSnackBarMessage('Khách không tồn tại');
                        setTimeout(() => {
                            setSnackBarOpen(false);
                        }, 3000);
                    }
                }
            }
            return;
        }
        if (userCode.length === 0 && borrowCode.length === 0) {
            setSnackBarOpen(true);
            setSnackBarStatus('error');
            setSnackBarMessage('Vui lòng nhập 1 trong 2 thông tin để tiếp tục');
            setTimeout(() => {
                setSnackBarOpen(false);
            }, 3000);
        }

    }

    const handleUserCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserCode(value);
        if (value.trim()) {
            setError(false);
            setHelperText('');
        }
    }
    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', maxWidth: '500px' }}>
                <CardContent sx={{ borderBottom: '1px dashed #F0F0F0', display: 'flex', justifyContent: 'center' }}>
                    <QRScanner onchange={handleQRScanner}></QRScanner>
                </CardContent>
                <CardContent sx={{ borderBottom: '1px dashed #F0F0F0' }}>
                    <TextField
                        id="outlined-basic"
                        label="Nhập mã số người mượn"
                        defaultValue={userCode}
                        variant="outlined"
                        fullWidth
                        value={userCode}
                        onChange={handleUserCodeChange}
                        error={error}
                        helperText={helperText}
                    />
                </CardContent>
                <CardContent>
                    <TextField
                        id="outlined-basic"
                        label="Nhập thông tin mã đơn mượn"
                        variant="outlined"
                        defaultValue={borrowCode}
                        value={borrowCode}
                        error={borrowCodeError}
                        helperText={borrowCodeHelperText}
                        inputProps={{
                            maxLength: 6,
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">CTB-</InputAdornment>,
                        }}
                        fullWidth
                        onChange={(e) => setBorrowCode(e.target.value)} />
                </CardContent>
                <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={handleNextStep}>Tiếp tục</Button>
                </CardContent>
            </Card>
            <SnackbarComponent
                open={snackBarOpen}
                message={snackBarMessage}
                status={snackBarStatus}
            />
        </Container>
    )

};