import Dropzone from 'react-dropzone';
import React, { useCallback, useState } from 'react';

import './dropzone.css';

export const DropArea = () => {
  const [myFiles, setMyFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setMyFiles([...myFiles, ...acceptedFiles]);
  });

  const removeFile = file => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  const removeAll = () => {
    setMyFiles([]);
  };

  const Files = myFiles.map(file => (
    <div className="container">
      <li key={file.path}>
        <img className="previewImage" src={URL.createObjectURL(file)} />
        <i className="fa fa-times-circle remove" onClick={removeFile(file)}></i>
      </li>
    </div>
  ));

  return (
    <>
      <Dropzone onDrop={onDrop} /*onDrop={acceptedFiles => console.log(acceptedFiles)}*/>
        {({ getRootProps, getInputProps }) => (
          <section className="drop-area">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <div>{Files}</div>
            {Files.length > 0 && (
              <button className="removeButton" onClick={removeAll}>
                Remove All
              </button>
            )}
          </section>
        )}
      </Dropzone>
    </>
  );
};
