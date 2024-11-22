import { Box, Typography, Card, CardContent, Stack, Button, Grid, Checkbox, Chip, IconButton, Collapse, Container, useTheme, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ReportIcon from '@mui/icons-material/Report';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { equipment } from "src/_mock/_equipment";
import DeviceInput from "./DeviceInput";
import LevelSelect from "src/components/common/common-level-select";
import CollapsibleBorrowItem from "./CollapsibleBorrowItem";
import IconTextComponent from "src/components/common/common-icon-text";
import TextCaptionComponent from "src/components/common/common-text-disable";
import SignatureComponent from "./Signature";
import PhoneCheck from "./PhoneCheck";
import QRScannerService from "src/@core/service/QR";
import BorrowService from "src/@core/service/Borrow";
import { InfoComponentWithIcon } from "./InfoComponent";
import SnackbarComponent from "src/components/common/common-snackbar";




//Step2Component
const RenderLeftContent = ({ onChange, userData, onPhoneChange }: any) => {

    const [openPhoneCheck, setOpenPhoneCheck] = useState(userData?.phone ? false : true);
    const [additionalPhone, setAdditionalPhone] = useState<string | null>(null);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarStatus, setSnackBarStatus] = useState<'success' | 'error' | 'info' | 'warning'>('success');
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const handlePhoneSubmit = async (phone: string) => {
        const response = await BorrowService.updateUserPhoneNumber(userData?.code, userData?.borrowType, phone);
        if (response.status === 200) {
            setAdditionalPhone(phone);
            setSnackBarOpen(true);
            setSnackBarStatus('success');
            setSnackBarMessage('Số điện thoại đã được cập nhật');
            onPhoneChange(phone);
            setTimeout(() => {
                setSnackBarOpen(false);
            }, 3000);
        }

    };

    const handlePhoneAction = (status: boolean) => {
        if (status === false) {
            onChange(status);
        }
    }
    return (<Card>
        <PhoneCheck
            openPopUp={openPhoneCheck}
            onSubmitPhone={handlePhoneSubmit}
            onAction={handlePhoneAction}
        />
        <CardContent sx={{ borderBottom: '1px dashed #F0F0F0' }}>
            <Box>
                <Typography variant='subtitle1'>Thông tin đăng ký</Typography>
            </Box>
        </CardContent>
        <CardContent>
            {userData && <InfoComponentWithIcon type={userData?.borrowType} userData={userData} additionalPhone={additionalPhone} />}
        </CardContent>
        <SnackbarComponent
            open={snackBarOpen}
            message={snackBarMessage}
            status={snackBarStatus}
        />
    </Card>
    )
}

//Step2Component
const renderBorrowItem = ({ data, isSelected, onSelect }: any) => {
    const theme = useTheme();

    return (
        <Button
            fullWidth
            variant="outlined"
            onClick={() => onSelect(data)}
            sx={{
                display: 'flex',
                gap: 1,
                padding: '10px',
                justifyContent: 'flex-start',
                border: isSelected
                    ? `2px solid ${theme.palette.grey[900]}`
                    : `1px solid ${theme.palette.grey["500Channel"]}`
            }}
        >
            <data.Icon />
            <Typography variant="body2">{data.name}</Typography>
        </Button>
    );
};

//Step2Component
const RenderRightContent = ({ onChange, userData, onSubmit }: any) => {
    const [selectedItemsDefault, setSelectedItemsDefault] = useState<any[]>([]);
    const [selectedItemsFromList, setSelectedItemsFromList] = useState<any[]>([]);
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<any>(null);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarStatus, setSnackBarStatus] = useState<'success' | 'error' | 'info' | 'warning'>('success');
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const theme = useTheme();
    const deviceOptions = equipment.slice(3,).map(item => ({
        id: item.id,
        name: item.name
    }));
    const handleClick = (type: string) => () => {
        if (type === 'cancel') {
            onChange(false);
        }
        else {
            if (selectedRoom === null || selectedItems.length === 0) {
                setSnackBarOpen(true);
                setSnackBarStatus('error');
                setSnackBarMessage('Vui lòng chọn đầy đủ thông tin');
                setTimeout(() => {
                    setSnackBarOpen(false);
                }, 3000);
            }
            else {
                onSubmit(selectedRoom, selectedItems, userData);
            }
        }
    }

    const handleItemChange = (selectedItemsFromList: any) => {
        setSelectedItemsFromList(selectedItemsFromList)
    }

    const handleItemSelect = (data: any) => {
        setSelectedItemsDefault(prev => {
            const isSelected = prev.some(item => item.id === data.id);
            if (isSelected) {
                return prev.filter(item => item.id !== data.id);
            } else {
                return [...prev, {
                    id: data.id,
                    name: data.name,
                    quantity: 1
                }];
            }
        });
    };
    const handleLevelChange = (value: any) => {
        setSelectedRoom(value);
    }
    useEffect(() => {
        setSelectedItems([...selectedItemsDefault, ...selectedItemsFromList])
    }, [selectedItemsDefault, selectedItemsFromList])

    useEffect(() => { console.log("selectedItems", selectedItems) }, [selectedItems])
    return (
        <Card>
            <CardContent sx={{
                borderBottom: '1px dashed',
                borderColor: '#F0F0F0',
            }}>
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        <Typography variant="subtitle1">Thông tin đề xuất mượn thiết bị</Typography>
                        <TextCaptionComponent text="Lưu ý: chọn đúng phòng sử dụng thiết bị" type="disable" />
                    </Stack>
                    <Stack spacing={1.5}>
                        <TextCaptionComponent text="Vị trí tiếp nhận" type="primary" />
                        <LevelSelect onChange={handleLevelChange} />
                    </Stack>
                </Stack>
            </CardContent>
            <CardContent sx={{
                borderBottom: '1px dashed',
                borderColor: '#F0F0F0',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5
            }}>
                <TextCaptionComponent text="Danh mục thiết bị cần mượn" type="disable" />
                <IconTextComponent icon={<ReportIcon />} text="Kiểm tra thiết bị trước khi tiếp nhận" type="warning" />
                <Grid container spacing={2}>
                    {equipment.slice(0, 3).map((item, index) => (
                        <Grid item xs={4} key={index}>
                            {renderBorrowItem({
                                data: item,
                                isSelected: selectedItemsDefault.some(selected => selected.id === item.id),
                                onSelect: handleItemSelect
                            })}
                        </Grid>
                    ))}
                </Grid>
                <DeviceInput onchange={handleItemChange} deviceOptions={deviceOptions} />
            </CardContent>
            <CardContent sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ flex: 1 }} />
                <Box sx={{ display: 'flex', flex: 1, gap: 2 }}>
                    <Button variant="text" sx={{ flex: 1, backgroundColor: theme.palette.grey[100], padding: 0 }} onClick={handleClick('cancel')}>Hủy</Button>
                    <Button variant="text" sx={{ flex: 4, color: theme.palette.primary.main, backgroundColor: theme.palette.divider }} onClick={handleClick('confirm')}>Đồng ý</Button>
                </Box>
            </CardContent>
            <SnackbarComponent
                open={snackBarOpen}
                message={snackBarMessage}
                status={snackBarStatus}
            />
        </Card>
    )
}

const RightContentReturn = ({ onChange, data }: any) => {
    const theme = useTheme();
    const [returnItems, setReturnItems] = useState<any[]>([]);
    const [openRow, setOpenRow] = useState<string | null>(null);
    const [signature, setSignature] = useState('');
    const [note, setNote] = useState('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarStatus, setSnackBarStatus] = useState<'success' | 'error' | 'info' | 'warning'>('success');
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const handleExpandClick = (borrowId: string) => {
        setOpenRow(openRow === borrowId ? null : borrowId);
    };
    const handleSignatureChange = (signature: string) => {
        setSignature(signature);
    }
    const handleClear = () => {
        setNote('');
    }
    const handleReturnItemsChange = (returnItems: any) => {
        setReturnItems(returnItems);
    }

    const handleSubmit =() =>{
        if(returnItems.length ===0){
            setSnackBarOpen(true);
            setSnackBarStatus('error');
            setSnackBarMessage('Vui lòng trả ít nhất 1 thiết bị');
            setTimeout(() => {
                setSnackBarOpen(false);
            }, 3000);
        }
        else if(signature===''){
            setSnackBarOpen(true);
            setSnackBarStatus('error');
            setSnackBarMessage('Vui lòng ký tên');
            setTimeout(() => {
                setSnackBarOpen(false);
            }, 3000);
        }
        else{
            const returnData ={
                borrowLogCode:data.borrowLogCode,
                signReturn:signature,
                note:note,
                returnedEquipmentIds:returnItems
            }
            console.log("returnData",returnData);
        }
    }

    return (
        <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Stack spacing={1}>
                    <Typography variant="subtitle1">Thông tin đơn mượn thiết bị</Typography>
                    <Typography variant="caption" color={theme.palette.text.disabled}>Lưu ý: Chọn đúng phòng</Typography>
                </Stack>
                <Typography variant="caption" color={theme.palette.primary.main}>Danh sách đơn mượn</Typography>
                <Box sx={{ border: '1px solid #F0F0F0', padding: '10px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flex: 2, justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Checkbox />
                                <Typography variant="body2">#CTB-{data.borrowLogCode}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 8, marginRight: '30px' }}>
                                <Typography variant="body2">Phòng {data.roomCode}</Typography>
                                <Typography variant="body2">{data.totalEquipment}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, justifyContent: 'flex-end', }}>
                            <Chip label="Đang mượn" color="warning" sx={{ backgroundColor: '#d4b28c', color: '#6d4c41' }} />
                            <IconButton onClick={() => handleExpandClick(data.borrowLogCode)}>
                                <ExpandMoreIcon sx={{ transform: openRow === data.borrowLogCode ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Collapse in={openRow === data.borrowLogCode} timeout="auto" unmountOnExit sx={{ mt: 2 }}>
                        <CollapsibleBorrowItem onSelectionChange={handleReturnItemsChange} id={data.borrowLogCode} data={data.returnedEquipmentIds}/>
                    </Collapse>
                </Box>
            </CardContent>

            <CardContent sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <SignatureComponent onChange={handleSignatureChange} />
                </Box>
                <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }}>
                        <Box display='flex' justifyContent='space-between' alignItems='center'>
                            <Typography variant="subtitle1">Ghi chú</Typography>
                            <Button variant='outlined' onClick={handleClear}>Xóa</Button>
                        </Box>
                        <Box sx={{height:'8pt'}}/>
                        <TextField
                            label="Nhập ghi chú"
                            variant="outlined"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            fullWidth
                            multiline
                            rows={4}
                            sx={{ height: '100%' }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button variant="text" sx={{ backgroundColor: theme.palette.grey[100] }} onClick={() => onChange(false)}>Hủy</Button>
                        <Button variant="text" sx={{ color: theme.palette.primary.main, backgroundColor: theme.palette.divider }} onClick={handleSubmit}>Xác nhận trả đủ</Button>
                    </Box>
                </Box>
            </CardContent>

        </Card>
    )

}

// Step2Content.js
export const Step2Content = ({ onStatusChange, borrowCode, onFormSubmit,data }: any) => {
    console.log("data from step 1",data);
    const [isBorrow, setIsBorrow] = useState(borrowCode.length > 0 ? false : true);
    const [userData, setUserData] = useState<any>();
    const [borrowData, setBorrowData] = useState<any>();

    const fetchData = async () => {
        if (borrowCode.length > 0) {
            setBorrowData(data[0]);
            setUserData(data[0].borrowerInfo);
        }
        else {
            setUserData(data);
        }
    }

    const handleButtonClick = (type: string) => () => {
        setIsBorrow(type === 'mượn' ? true : false);
    }

    const handleStatusChange = (status: boolean) => {
        onStatusChange(status);
    }

    const handleSubmit = (selectedRoom: any, selectedItems: any, userData: any) => {
        onFormSubmit(selectedRoom, selectedItems, userData);
    }

    const handlePhoneChange = (phone: string) => {
        setUserData((prevUserData: any) => ({
            ...prevUserData,
            phone: phone
        }));
    }

    useEffect(() => { fetchData() }, [])
    return (
        <Container>
            <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                <Grid item xs={3}>
                    {userData && <RenderLeftContent onChange={handleStatusChange} userData={userData} onPhoneChange={handlePhoneChange} />}
                </Grid>
                <Grid item xs={9}>
                    <Button onClick={handleButtonClick("mượn")}>Mượn</Button>
                    <Button onClick={handleButtonClick("trả")}>Trả</Button>
                    {isBorrow ? (userData && <RenderRightContent onChange={handleStatusChange} userData={userData} onSubmit={handleSubmit} />) : (userData && <RightContentReturn onChange={handleStatusChange} data={borrowData} />)}
                </Grid>
            </Grid>

        </Container>
    )
}