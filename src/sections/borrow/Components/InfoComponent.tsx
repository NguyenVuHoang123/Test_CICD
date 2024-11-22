import { Box, Grid, Stack, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import InfoIcon from '@mui/icons-material/Info';
import ClassIcon from '@mui/icons-material/Class';
import { formatPhoneNumber } from "src/utils/format-phonenumber";
import { UserData } from "src/utils/type";


interface InfoComponentProps {
    type: string;
    userData: UserData;
    additionalPhone?: string | null;
}

const renderLeftContentInfo = ({ icon, title, content }: any) => {
    if (title === 'SĐT') {
        if (content) {
            content = formatPhoneNumber(content);
        }
    }
    return (<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Box sx={{ ml: 1, display: 'flex', gap: '5px' }}>
            <Typography variant="subtitle2">{title}: </Typography>
            <Typography variant="body2" color="text.secondary">
                {content}
            </Typography>
        </Box>
    </Box>)
}



export const InfoComponentWithIcon = ({ type, userData, additionalPhone }: InfoComponentProps) => {
    return (
        type === 'Student' ? (
            <Stack spacing={2}>
                <Stack spacing={1}>
                    {renderLeftContentInfo({
                        icon: <AccountCircleIcon />,
                        title: "Họ tên",
                        content: userData?.name
                    })}
                    {renderLeftContentInfo({
                        icon: <LocalPhoneIcon />,
                        title: "SĐT",
                        content: additionalPhone ? additionalPhone : userData?.phone
                    })}
                    {renderLeftContentInfo({
                        icon: <InfoIcon />,
                        title: "MSSV",
                        content: userData?.code
                    })}
                    {renderLeftContentInfo({
                        icon: <ClassIcon />,
                        title: "Khoa",
                        content: userData?.department
                    })}
                </Stack>
            </Stack>
        ) : (
            type === 'Staff' ? (
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        {renderLeftContentInfo({
                            icon: <AccountCircleIcon />,
                            title: "Họ tên",
                            content: userData?.name
                        })}
                        {renderLeftContentInfo({
                            icon: <LocalPhoneIcon />,
                            title: "SĐT",
                            content: additionalPhone ? additionalPhone : userData?.phone
                        })}
                        {renderLeftContentInfo({
                            icon: <InfoIcon />,
                            title: "MSGV",
                            content: userData?.code
                        })}
                        {renderLeftContentInfo({
                            icon: <ClassIcon />,
                            title: "Khoa",
                            content: userData?.department
                        })}
                    </Stack>
                </Stack>
            ) : (
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        {renderLeftContentInfo({
                            icon: <AccountCircleIcon />,
                            title: "Họ tên",
                            content: userData?.name
                        })}
                        {renderLeftContentInfo({
                            icon: <LocalPhoneIcon />,
                            title: "SĐT",
                            content: additionalPhone ? additionalPhone : userData?.phone
                        })}
                        {renderLeftContentInfo({
                            icon: <InfoIcon />,
                            title: "CCCD",
                            content: userData?.code
                        })}
                    </Stack>
                </Stack>
            )
        )
    );
}


export const InfoComponent = ({ type, userData, additionalPhone }: InfoComponentProps) => {
    const theme = useTheme();
    return (
        type === 'Student' ? (
            <Box sx={{ color: theme.palette.text.primary, marginTop: 2 }}>
                <Typography variant="subtitle1" color={theme.palette.primary.main} sx={{ mb: 1 }}>Người mượn</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Typography variant="body2" color={theme.palette.text.secondary}>Họ tên</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">{userData?.name}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="body2" color={theme.palette.text.secondary}>MSSV</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">{userData?.code}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="body2" color={theme.palette.text.secondary}>SĐT</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">{formatPhoneNumber(userData?.phone ? userData?.phone : '')}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="body2" color={theme.palette.text.secondary}>Lớp</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">{userData?.department}</Typography>
                    </Grid>
                </Grid>
            </Box>
        ) : (
            type === 'Staff' ? (
                <Box sx={{ color: theme.palette.text.primary, marginTop: 2 }}>
                    <Typography variant="subtitle1" color={theme.palette.primary.main} sx={{ mb: 1 }}>Người mượn</Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Typography variant="body2" color={theme.palette.text.secondary}>Họ tên</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">{userData?.name}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body2" color={theme.palette.text.secondary}>MSGV</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">{userData?.code}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body2" color={theme.palette.text.secondary}>SĐT</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">{formatPhoneNumber(userData?.phone ? userData?.phone : '')}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body2" color={theme.palette.text.secondary}>Lớp</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">{userData?.department}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <Box sx={{ color: theme.palette.text.primary, marginTop: 2 }}>
                    <Typography variant="subtitle1" color={theme.palette.primary.main} sx={{ mb: 1 }}>Người mượn</Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Typography variant="body2" color={theme.palette.text.secondary}>Họ tên</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">{userData?.name}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body2" color={theme.palette.text.secondary}>CCCD</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">{userData?.code}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="body2" color={theme.palette.text.secondary}>SĐT</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">{formatPhoneNumber(userData?.phone ? userData?.phone : '')}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            )
        )
    );
}
