import React from 'react';

import './about.css';

const devInformation = [
  { response: 'FrontEnd:', name: 'Mykola Padii', info: 'Molodec' },
  { response: 'BackEnd:', name: 'Bohdan Leskovets', info: 'Molodec' },
  { response: 'Trainee:', name: 'Illya Pystovgar', info: 'Molodec' },
  { response: 'Trainee:', name: 'Anton Liediaiev', info: 'Molodec' },
  { response: 'QA:', name: 'Eugene Yacobchuk', info: 'Molodec' },
];

export const About = () => {
  return (
    <>
      <div className={'contentHome column'}>
        {devInformation.map(({ name, response, info }) => (
          <div className={'about'}>
            <i className="fas fa-user-circle" />
            <h2>
              {response} <br /> {name}
            </h2>
            {info}
          </div>
        ))}
      </div>
    </>
  );
};
