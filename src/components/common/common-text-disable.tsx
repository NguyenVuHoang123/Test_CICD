import { Typography, useTheme } from '@mui/material'
import React from 'react'

const TextCaptionComponent = ({ text, type }: any) => {
    const theme = useTheme();
    return (
        type === 'disable' ? (
            <Typography variant="caption" color={theme.palette.text.disabled}>{text}</Typography>
        ) : (
            <Typography variant="caption" color={theme.palette.primary.main}>{text}</Typography>
        )
    )
}

export default TextCaptionComponent