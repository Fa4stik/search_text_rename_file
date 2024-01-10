import React, {useEffect} from 'react';
import './snowfall.css'

type SnowfallProps = {}

export const Snowfall: React.FC<SnowfallProps> = ({}) => {
    useEffect(() => {
        function createSnowflake() {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.style.left = Math.random() * window.innerWidth + 'px';
            document.body.appendChild(snowflake);

            const animationDuration = Math.random() * (9 - 3) + 3;
            snowflake.style.animationDuration = `${animationDuration}s`;

            setTimeout(() => {
                document.body.removeChild(snowflake);
            }, animationDuration * 1000);
        }

        const snowfallInterval = setInterval(createSnowflake, 500);

        return () => clearInterval(snowfallInterval);
    }, []);

    return null;
};