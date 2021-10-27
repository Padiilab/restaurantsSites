import React from 'react';
import './live-progress.css';
import { ProgressBar } from 'react-bootstrap';

export const LiveProgress = ({ ...props }) => {
  return (
    <ProgressBar
      label={`${props.now}/${props.max}`}
      className={props.now !== props.max ? 'progressBar' : 'filledProgressBar'}
      animated
      {...props}
    />
  );
};
