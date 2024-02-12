import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CountdownContainer = styled.div`
position: absolute;
top: 80%; 
left: 50%;
transform: translate(-50%, -50%);
z-index: 999; 
`;

const CountdownTimer: React.FC = () => {
    const [days, setDays] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    useEffect(() => {
        // Set the date to countdown to (current time + 12 days)
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 30);

        // Update the countdown every second
        const countdownTimer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate.getTime() - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update the countdown values
            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);

            // If the countdown is over, clearInterval
            if (distance < 0) {
                clearInterval(countdownTimer);
                // Optionally, display a message when the countdown is over
                console.log('Countdown expired');
            }
        }, 1000);

        // Clean up by clearing the interval when the component unmounts
        return () => clearInterval(countdownTimer);
    }, []);

    return (
        <CountdownContainer>
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div className="flex flex-col p-6 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">{days}</span>
                    days
                </div>
                <div className="flex flex-col p-6 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">{hours}</span>
                    hours
                </div>
                <div className="flex flex-col p-6 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">{minutes}</span>
                    min
                </div>
                <div className="flex flex-col p-6 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">{seconds}</span>
                    sec
                </div>
            </div>
        </CountdownContainer>
    );
};

export default CountdownTimer;
