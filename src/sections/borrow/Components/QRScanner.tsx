// components/QRCodeScanner.tsx
import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import {
    Button,
    Modal,
    Box,
    IconButton,
    Typography,
    styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import  QRScannerService  from 'src/@core/service/QR';


interface QRCodeScannerProps {
    onchange : (data:any)=>void;
}

const QRScanner: React.FC<QRCodeScannerProps> = ({ onchange }) => {
    const qrReaderRef = useRef<HTMLDivElement | null>(null);
    const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);

    const requestCameraPermission = async () => {
        if (navigator.mediaDevices.getUserMedia) {
            try {
                await navigator.mediaDevices.getUserMedia({ video: true });
                startScanner();
            } catch (error) {
                console.error("Camera permission denied:", error);
                alert("Vui lòng cấp quyền truy cập camera để sử dụng tính năng quét QR.");
                setIsScanning(false);
            }
        } else {
            console.error("Camera API không được hỗ trợ trên trình duyệt này.");
            alert("Trình duyệt của bạn không hỗ trợ quyền truy cập camera.");
            setIsScanning(false);
        }
    };

    const fetchDataByQRCode = async (code: string) => {
        try {
            onchange(code);
            setResult(null);
            handleCloseScanner();
            setIsScanning(false);
        }
        catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (result) {
            fetchDataByQRCode(result);
        }
    }, [result]);

    const startScanner = () => {
        if (qrReaderRef.current) {
            const html5QrCode = new Html5Qrcode(qrReaderRef.current.id);
            html5QrCodeRef.current = html5QrCode;

            html5QrCode.start(
                { facingMode: 'environment' },
                { fps: 1, qrbox: 500, aspectRatio: 1, disableFlip: false},
                (decodedText) => {
                    setResult(decodedText);
                },
                (errorMessage) => {
                    if (!errorMessage.includes('Camera setup error')) {
                        console.log('Lỗi quét:', errorMessage);
                    }
                }
            ).catch((err) => {
                console.error('Lỗi khởi động camera:', err);
            });
        }
    };

    const stopScanner = () => {
        const html5QrCode = html5QrCodeRef.current;
        if (html5QrCode) {
            html5QrCode.stop().then(() => {
                html5QrCode.clear();
                setIsScanning(false);
            }).catch((err) => {
                console.error('Lỗi khi dừng quét: ', err);
            });
        }
    };

    const handleStartButtonClick = () => {
        setIsScanning(true);
        requestCameraPermission();
    };

    const handleCloseScanner = () => {
        stopScanner();
    };


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Button
                onClick={handleStartButtonClick}
                disabled={isScanning}
                variant='contained'
            >
                Quét Mã QR
            </Button>

            {isScanning && (
                <Box
                    sx={{
                        position: 'relative',
                        mt: 2,
                        width: '500px',
                        height: 'auto',
                        backgroundColor: '#f0f0f0',
                        padding: 2,
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}
                >
                    <IconButton
                        onClick={handleCloseScanner}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" color='#000'>
                        Quét Mã QR thẻ sinh viên
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        <div
                            id="qr-reader"
                            ref={qrReaderRef}
                            style={{ width: '100%', margin: '0 auto' }}
                        />
                    </Box>

                    {result && (
                        <Typography sx={{ mt: 2 }}>
                            Kết quả: {result}
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default QRScanner;
