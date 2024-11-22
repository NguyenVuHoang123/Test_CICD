import { Box, Button, Card, CardContent, Container, Typography, useTheme } from '@mui/material'
import React from 'react'
import IconTextComponent from 'src/components/common/common-icon-text';
import ReportIcon from '@mui/icons-material/Report';
import { useRouter } from 'next/navigation';



const CompleteCard = ({ data }: any) => {
    const router = useRouter();
    const theme = useTheme();
    return (
        <Container sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Card sx={{ maxWidth: '600px' }}>
                <CardContent sx={{ borderBottom: '1px dashed #F0F0F0', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                        <Typography variant='h6' color={theme.palette.text.primary}>Đơn mượn #CTB-{data?.borrowLogCode} đã được ghi nhận</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 1, color: theme.palette.text.disabled }}>
                            <Typography variant='caption'>Người mượn: {data?.userName}</Typography>
                            <Typography variant='caption'>Địa điểm: {data?.roomCode}</Typography>
                            <Typography variant='caption'>Thời điểm: {data?.borrowTime}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <img
                                src={`data:image/png;base64,${data?.qrCodeBase64}`}
                                alt="signature"
                                style={{ borderRadius: '8px' }}
                                width={150}
                                height={150} />
                        </Box>
                    </Box>
                    <Button variant='contained' onClick={() => router.push('/')} fullWidth>
                        Quay về trang chủ
                    </Button>
                    <IconTextComponent icon={<ReportIcon />} text="Thiết bị mượn phải được xác nhận trả sau buổi học. Người mượn vi phạm sẽ bị nhắc nhở!" type="error" />
                </CardContent>
            </Card>
        </Container>

    )
}

export default CompleteCard