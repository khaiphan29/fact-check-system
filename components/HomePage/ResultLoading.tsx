import React, { useEffect, useState } from "react";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const ResultLoading = () => {
  const [progress, setProgress] = useState<number>(0);
  const [msg, setMsg] = useState<string>("Đang gửi nhận định...");

  useEffect(() => {
    setTimeout(() => {
      setProgress(10);
      setMsg("Đang tìm kiếm minh chứng...");

      setTimeout(() => {
        setProgress(30);
        setMsg("Đang phân tích...");

        setTimeout(() => {
          setProgress(60);
          setMsg("Đang phân tích...");

          setTimeout(() => {
            setProgress(80);
            setMsg("Đang tổng hợp...");
          }, 10000);
        }, 10000);
      }, 4000);
    }, 1000);
  }, []);

  return (
    <div className="w-full mt-10">
      <p className="wb-5 text-lg text-center">{msg}</p>
      <LinearProgressWithLabel value={progress} />
    </div>
  );
};

export default ResultLoading;
