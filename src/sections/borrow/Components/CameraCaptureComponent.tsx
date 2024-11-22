import { Box, Button } from "@mui/material";
import React, { useCallback, useImperativeHandle, useRef, forwardRef } from "react";
import Webcam from "react-webcam";

interface WebcamCaptureProps {
    onCapture: (imageSrc: string) => void;
    width?: number;
    height?: number;
};

const WebcamCapture = forwardRef((props:WebcamCaptureProps, ref) => {

    const webcamRef = useRef<any>(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            const base64 = imageSrc.split(';base64,')[1];
            props.onCapture(base64);
        }
    }, [props]);

    useImperativeHandle(ref, () => ({
        capture
    }));


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
            <Webcam
                audio={false}
                height={props.height || 200}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={props.width || 300}
            />
        </Box>
    );
});

export default WebcamCapture;