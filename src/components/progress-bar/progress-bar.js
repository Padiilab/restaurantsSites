import React from 'react';
import './progress-bar.css';
import { ProgressBar } from 'react-bootstrap';

export const LiveProgress = ({ ...props }) => {
  return (
    <ProgressBar
      label={`${props.now}/${props.max}`}
      className={`progressBar ${props.now === props.max && 'filledProgressBar'}`}
      animated
      {...props}
    />
  );
};
