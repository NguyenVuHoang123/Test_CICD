import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react'
import  BorrowService  from 'src/@core/service/Borrow';
import { PHONE_MESSAGES } from 'src/_mock/_phone';

interface PhoneCheckProps {
    openPopUp: boolean;
    onSubmitPhone: (phone: string) => void;
    onAction: (status: boolean) => void;
}

const PhoneCheck = ({ openPopUp, onSubmitPhone, onAction }: PhoneCheckProps) => {
    const [open, setOpen] = useState(openPopUp);
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    // Regex cho số điện thoại Việt Nam
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

    const validatePhone = (phoneNumber: string) => {
        if (!phoneNumber) {
            setError(PHONE_MESSAGES.REQUIRED);
            return false;
        }
        if (!phoneRegex.test(phoneNumber)) {
            setError(PHONE_MESSAGES.INVALID);
            return false;
        }
        setError('');
        return true;
    };

    const handleClose = () => {
        onSubmitPhone(phone);
        onAction(false);
        setOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validatePhone(phone)) {
            onSubmitPhone(phone);
            onAction(true);
            setOpen(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => { }}
            disableEscapeKeyDown
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
                noValidate: true,
            }}
        >
            <DialogTitle>Xác thực số điện thoại</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Vui lòng nhập số điện thoại của bạn để tiếp tục
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="phone"
                    name="phone"
                    label="Số điện thoại"
                    type="tel"
                    fullWidth
                    variant="standard"
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value);
                        if (error) validatePhone(e.target.value);
                    }}
                    error={!!error}
                    helperText={error}
                    inputProps={{
                        pattern: "[0-9]*",
                        maxLength: 10,
                        title: 'Vui lòng nhập số điện thoại hợp lệ'
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    Hủy
                </Button>
                <Button type="submit">Xác nhận</Button>
            </DialogActions>
        </Dialog>
    )
}

export default PhoneCheck