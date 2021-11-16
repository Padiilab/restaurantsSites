import Dropzone from 'react-dropzone';
import React, { useCallback, useState } from 'react';

import './dropzone.css';

export const DropZone = () => {
  const [myFiles, setMyFiles] = useState([]);

  const onDrop = useCallback(
    acceptedFiles => {
      console.log(acceptedFiles);
      if (myFiles.length >= 0 && myFiles.length < 6) {
        setMyFiles([...myFiles, ...acceptedFiles]);
      }
      if (myFiles.length === 5) {
        alert('You cant upload more than ' + (myFiles.length + 1) + ' files');
      }
    },
    [myFiles],
  );

  const removeFile = file => () => {
    const newFiles = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  const removeAll = () => {
    setMyFiles([]);
  };

  return (
    <>
      <Dropzone onDrop={onDrop} maxSize={2000000} minSize={100} maxFiles={6} accept={'image/*'}>
        {({ getRootProps, getInputProps }) => (
          <section className={myFiles.length !== 0 ? 'activeDrop-area' : 'drop-area'}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                {myFiles.length !== 0 ? 'File has been uploaded!' : 'Drop files here, or click to select files. 6 max'}
              </p>
            </div>
            <div>
              {myFiles.map(file => (
                <div className="container">
                  <li key={file.path}>
                    <img className="previewImage" src={URL.createObjectURL(file)} />
                    <i className="fa fa-times-circle remove" onClick={removeFile(file)} />
                  </li>
                </div>
              ))}
            </div>
            {myFiles.length > 0 && (
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
