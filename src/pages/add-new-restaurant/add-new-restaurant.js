import axios from 'axios';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router';
import { LiveProgress } from '../../components';
import React, { isValidElement, useState } from 'react';

import './add-new-restaurant.css';

export const AddNewRestaurant = () => {
  const [name, setName] = useState(null);
  const [website, setWebsite] = useState(null);
  const [location, setLocation] = useState(null);
  const [progressNow, setProgressNow] = useState(0);
  const [priceRating, setPriceRating] = useState(null);
  const [navigateName, setNavigateName] = useState('');
  const [drag, setDrag] = useState(false);
  const [image, setImage] = useState(null);

  const onCreate = () => {
    if (name && priceRating && website && location && drag) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, added it!',
      }).then(result => {
        if (result.isConfirmed) {
          axios
            .post('https://restaurants-database.herokuapp.com/api/v1/restaurants/', {
              name,
              website,
              location,
              price_range: priceRating,
            })
            .then(() => {
              Swal.fire({
                title: 'Added!',
                text: 'Your restaurants has been added.',
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
              }).finally(() => {
                setNavigateName('/');
              });
            });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill in all the fields!',
      });
    }
  };
  const onInputPriceRating = event => {
    if (Number(event.currentTarget.value) && Number(event.currentTarget.value) < 6) {
      setPriceRating(event.currentTarget.value);
      if (event.currentTarget.value && !priceRating) {
        setProgressNow(progressNow + 1);
      }

      setPriceRating(event.currentTarget.value);
    } else {
      setPriceRating('');
      event.currentTarget.value = '';
    }

    if (!event.currentTarget.value && !!priceRating) {
      setProgressNow(progressNow - 1);
    }
  };

  if (navigateName) {
    return <Redirect to={navigateName} />;
  }

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
  }
  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
  }
  function onDropHandler(e) {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    console.log(files);
    setImage(files);
    /*files.map(file => <img srs={file} />);*/
    /*    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('file', files[0]);
    axios.post('url', formData);*/

    setDrag(false);
  }
  return (
    <>
      <LiveProgress now={progressNow} max={4} />
      <div className={'addRestaurantWrapper'}>
        <div className="form__group field">
          {drag ? (
            <div
              className="drop-area"
              onDragStart={e => dragStartHandler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragOver={e => dragStartHandler(e)}
              onDrop={e => onDropHandler(e)}>
              <input className="drop-zone" id="actual-btn" type="file" accept=".jpg,.png" />
              <label htmlFor="actual-btn">Drop the file</label>
            </div>
          ) : (
            <div
              className="drop-area"
              onDragStart={e => dragStartHandler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragOver={e => dragStartHandler(e)}>
              <input className="drop-zone" id="actual-btn" type="file" accept=".jpg,.png" />
              <label className="zone" htmlFor="actual-btn">
                Choose Image
              </label>
            </div>
          )}
          <label htmlFor="name" className="form__label">
            Image
          </label>
          <img src={image} />
        </div>

        <div className="form__group field">
          <input
            onInput={event => {
              if (event.currentTarget.value && !name) {
                setProgressNow(progressNow + 1);
              }

              if (!event.currentTarget.value) {
                setProgressNow(progressNow - 1);
              }

              setName(event.currentTarget.value);
            }}
            type="input"
            className="form__field"
            placeholder="Name"
            name="name"
            id="name"
            required
          />
          <label htmlFor="name" className="form__label">
            Name
          </label>
        </div>
        <div className="form__group field">
          <input
            onInput={event => {
              if (event.currentTarget.value && !location) {
                setProgressNow(progressNow + 1);
              }

              if (!event.currentTarget.value) {
                setProgressNow(progressNow - 1);
              }

              setLocation(event.currentTarget.value);
            }}
            type="input"
            className="form__field"
            placeholder="Location"
            name="location"
            id="location"
            required
          />
          <label htmlFor="location" className="form__label">
            Location
          </label>
        </div>
        <div className="form__group field">
          <input
            onInput={event => {
              if (event.currentTarget.value && !website) {
                setProgressNow(progressNow + 1);
              }

              if (!event.currentTarget.value) {
                setProgressNow(progressNow - 1);
              }

              setWebsite(event.currentTarget.value);
            }}
            type="input"
            className="form__field"
            placeholder="Web site"
            name="website"
            id="website"
            required
          />
          <label htmlFor="website" className="form__label">
            Web site
          </label>
        </div>
        <div className="form__group field">
          <input
            maxLength={'1'}
            onInput={onInputPriceRating}
            type="input"
            className="form__field"
            placeholder="Price rating"
            name="price"
            id="price"
            required
          />
          <label htmlFor="price" className="form__label">
            Price rating(1-5)
          </label>
        </div>
      </div>
      <button onClick={onCreate} type="button" className={'submit btn'}>
        Create
      </button>
    </>
  );
};
