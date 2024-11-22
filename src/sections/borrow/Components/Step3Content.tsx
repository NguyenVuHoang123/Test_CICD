import { Card, CardContent, Box, Typography, Stack, Button, Container, Grid, useTheme, IconButton } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import ReportIcon from '@mui/icons-material/Report';
import QRScanner from "./QRScanner";
import IconTextComponent from "src/components/common/common-icon-text";
import SignatureComponent from "./Signature";
import { useEffect, useRef, useState } from "react";
import SnackbarComponent from "src/components/common/common-snackbar";
import WebcamCapture from "./CameraCaptureComponent";
import { InfoComponent } from "./InfoComponent";
import CompleteCard from "./CompleteCard";
import  BorrowService  from "src/@core/service/Borrow";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




export const Step3Content = ({ selectedRoom, selectedItems, userData,onChange }: any) => {
    const theme = useTheme();
    const [now, setNow] = useState(new Date().toLocaleString());
    const webcamRef = useRef<any>(null);
    const [status, setStatus] = useState<number>(0);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarStatus, setSnackBarStatus] = useState<'success' | 'error' | 'info' | 'warning'>('success');
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [signature, setSignature] = useState('');
    const [successData, setSuccessData] = useState<any>(null);
    const handleCapture = (imageSrc: string) => {
        setCapturedImage(imageSrc);
        handleSubmitToAPI(imageSrc); 
    }

    const handleSignatureChange = (signature: string) => {

        setSignature(signature);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date().toLocaleString());
        }, 1000); // Cập nhật mỗi giây

        return () => clearInterval(interval); // Dọn dẹp khi component unmount
    }, []);

    const handleSubmitToAPI = async (imageSrc: string) => {
        try {
            const data = {
                borrowId: userData.code,
                borrowerType: userData.borrowType,
                roomId: selectedRoom.id,
                signReceive: signature,
                imageReceive: imageSrc,
                equiments: selectedItems.map((item: any) => ({
                    id: item.id,
                    equimentName: item.name,
                    quantily: item.quantity
                }))
            };
            const response = await BorrowService.createBorrowLog(data);
            if(response.status === 200){
                setSnackBarOpen(true);
                setSnackBarStatus('success');
                setSnackBarMessage('Đã gửi yêu cầu mượn thành công!');
                setStatus(1);
                setSuccessData({
                    ...response.data,
                    borrowTime: now,
                    roomCode: selectedRoom.roomCode,
                    userName: userData.name
                });
            }
        } catch (error) {
            setSnackBarOpen(true);
            setSnackBarStatus('error');
            setSnackBarMessage('Có lỗi xảy ra khi gửi yêu cầu!');
            setTimeout(() => {
                setSnackBarOpen(false);
            }, 3000);
        }
    };


    const handleSubmit = () => {
        if (signature === '') {
            setSnackBarOpen(true);
            setSnackBarStatus('error');
            setSnackBarMessage('Vui lòng ký tên!');
            setTimeout(() => {
                setSnackBarOpen(false);
            }, 3000);
        }
        else {
            webcamRef.current.capture();
        }

    }
    if (status === 0) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                <Card sx={{ width: '100%', maxWidth: '600px' }}>
                    <CardContent sx={{ borderBottom: '1px dashed #F0F0F0', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{display:'flex',alignItems:'center'}}>
                            <IconButton onClick={() => onChange(false)}>
                                <ArrowBackIcon/>
                            </IconButton>
                            <Typography variant='h6' color={theme.palette.text.primary}>Xác nhận thông tin đơn</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, color: theme.palette.text.disabled }}>
                                <Typography variant='subtitle1' color={theme.palette.text.primary}>Địa điểm: {selectedRoom?.roomCode}</Typography>
                                <Typography variant='caption'>Thời điểm: {now}</Typography>
                                <InfoComponent type={userData?.borrowType} userData={userData} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <WebcamCapture onCapture={handleCapture} ref={webcamRef} />
                            </Box>
                        </Box>
                    </CardContent>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Typography variant='subtitle1' color={theme.palette.primary.main}>Thiết bị mượn</Typography>
                        <Stack spacing={1.5}>
                            {selectedItems?.map((item: any, index: number) => (
                                <Grid container spacing={1}>
                                    <Grid item xs={0.5}>
                                        <Typography variant="body2" color={theme.palette.text.secondary}>{index + 1}.</Typography>
                                    </Grid>
                                    <Grid item xs={5.5} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="body2">{item.name}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color={theme.palette.text.secondary}>x{item.quantity}</Typography>
                                    </Grid>
                                </Grid>
                            ))}
                        </Stack>
                    </CardContent>
    
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Button fullWidth variant='contained' onClick={handleSubmit}>Xác nhận mượn</Button>
                        <Box>
                            <IconTextComponent icon={<ReportIcon />} text="Thiết bị mượn phải được xác nhận trả sau buổi học. Người mượn vi phạm sẽ bị nhắc nhở!" type="warning" />
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{ width: 'fit-content', height: 'fit-content' }}>
                    <CardContent sx={{ borderBottom: '1px dashed #F0F0F0' }}>
                        <SignatureComponent onChange={handleSignatureChange} />
                    </CardContent>
                </Card>
                <SnackbarComponent
                    open={snackBarOpen}
                    message={snackBarMessage}
                    status={snackBarStatus}
                />
            </Container>
    
        )
    }
    else{
        return <CompleteCard data = {successData}></CompleteCard>
    }

    
}