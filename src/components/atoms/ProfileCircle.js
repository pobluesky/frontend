import React from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ bgColor }) => bgColor || '#eeeeee'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #6c6c6c;
  font-size: 16px;
  border: 2px solid #ccc;
`;

const getRandomPastelColor = (name) => {
    const pastelColors = [
        '#71d8ff',
        '#ffd4c3',
        '#58a8ff',
        '#c8beff',
        '#f1b9ff',
        '#fff4d6',
        '#e2ffc6',
    ];

    const hashValue = name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return pastelColors[hashValue % pastelColors.length];
};

const ProfileCircle = ({ name, backgroundColor }) => {
    const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

    const bgColor = name === '-' ? '#eeeeee' : (backgroundColor || getRandomPastelColor(name));

    return <Circle bgColor={bgColor}>{initials}</Circle>;
};

export default ProfileCircle;