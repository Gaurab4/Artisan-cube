

import React from 'react';
import styled from 'styled-components';
import CountdownTimer from '../countdown-timer';

// Styled component for the welcome text
const WelcomeText = styled.div`
  position: absolute;
  top: 75%; 
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.2rem; /* Reduce font size */
  color: #ffff; /* Set text color */
  max-width: 80%; /* Limit text width */
  line-height: 1.5; /* Set line height for readability */
`;

// Styled component for the diff container
// Styled component for the diff container
const DiffContainer = styled.div`
  height: 100vh;
`;


const LaunchPage = () => {
  return (
    <>
      <DiffContainer className="diff aspect-[16/9]">
          <div className="diff-item-1">
            <div className="bg-primary grid place-content-center" >
                <div className="bg-primary text-primary-content text-9xl font-black grid place-content-center ">
                    ARTISAN CLUB
                </div>
                <WelcomeText>
                <p>🚀 Exciting News! Artisan Club is Coming Soon! 🚀</p>
                <p>We&apos;re thrilled to announce that Artisan Club, the ultimate platform for creative professionals, is coming soon!</p>
                <p>Get ready to unlock new possibilities, collaborate with fellow artisans, and showcase your creativity to the world. Whether you&apos;re a designer, writer, developer, or artist, Artisan Club is here to support and inspire you on your creative journey.</p>
                <p>Stay tuned for updates and be the first to experience Artisan Club when we launch! Sign up for our newsletter to receive exclusive sneak peeks, early access, and exciting updates.</p>
                <p>Let&apos;s create something extraordinary together!</p>
                </WelcomeText>

            </div>
          </div>
          <div className="diff-item-2" style={{ marginLeft: '20px' }}> {/* Adjust the margin-left */}
            <div className="bg-base-200  font-black grid place-content-center">
              <div className="text-9xl">
                Coming Soon...
              </div>
              <div className="grid mt-24 place-content-center">
                <CountdownTimer/>
              </div>
            </div>
          </div>
          <div className="diff-resizer"></div>
      </DiffContainer>
    </>
  );
};

export default LaunchPage;
