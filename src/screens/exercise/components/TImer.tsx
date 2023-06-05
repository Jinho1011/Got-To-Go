import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import styled from "styled-components";
import RNBounceable from "@freakycoder/react-native-bounceable";

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval: number;

    if (isRunning) {
      timerInterval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          } else {
            return prevSeconds + 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const formatTime = (time: string | number) => {
    return time < 10 ? "0" + time : time;
  };

  return (
    <TimerContainer onPress={toggleTimer}>
      <TimerText>
        {formatTime(minutes)}:{formatTime(seconds)}
      </TimerText>
    </TimerContainer>
  );
};

export default Timer;

const TimerContainer = styled(RNBounceable)`
  padding: 6px 10px;
  border-radius: 6px;
  background-color: #252525;
`;

const TimerText = styled(Text)`
  color: #ffffff;
  font-size: 14px;
`;
