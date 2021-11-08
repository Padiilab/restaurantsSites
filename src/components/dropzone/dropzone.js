import Dropzone from 'react-dropzone';
import React, { useCallback, useState } from 'react';

import './dropzone.css';

export const DropZone = () => {
  const [myFiles, setMyFiles] = useState([]);

  const onDrop = useCallback(
    acceptedFiles => {
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles],
  );

  const removeFile = index => () => {
    const newFiles = [...myFiles];
    newFiles.splice(index, 1);
    setMyFiles(newFiles);
  };

  const removeAll = () => {
    setMyFiles([]);
  };

  return (
    <>
      <Dropzone onDrop={onDrop} accept={'image/*'}>
        {({ getRootProps, getInputProps }) => (
          <section className="drop-area">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <div>
              {myFiles.map((file, index) => (
                <div className="container">
                  <li key={file.path}>
                    <img className="previewImage" src={URL.createObjectURL(file)} alt="picture" />
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
