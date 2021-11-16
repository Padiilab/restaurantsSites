import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { LiveProgress } from '../../components';

export const EditPage = ({ editData, onBackToHome, updateListRestaurant }) => {
  const [name, setName] = useState(editData.name);

  const [webSite, setWebsite] = useState(editData.website);

  const [progressNow, setProgressNow] = useState(4);

  const [location, setLocation] = useState(editData.location);

  const [priceRating, setPriceRating] = useState(editData.price_range);

  const onUpdateRestaurant = () => {
    if (name && priceRating && webSite && location) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!',
      }).then(result => {
        if (result.isConfirmed) {
          axios
            .put(`https://restaurants-database.herokuapp.com/api/v1/restaurants/${editData.id}`, {
              name,
              priceRating,
              location,
              webSite,
            })
            .then(() => {
              Swal.fire({
                title: 'Update!',
                text: 'Your restaurants has been updated.',
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
              });
              updateListRestaurant();
              onBackToHome();
            })
            .catch(() => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
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

  const deleteCurrentRestaurant = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`https://restaurants-database.herokuapp.com/api/v1/restaurants/${editData.id}`)
          .then(() => {
            updateListRestaurant();
            onBackToHome();
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          });
      }
    });
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

  {
    return (
      <>
        <div className="contentHome">
          <LiveProgress now={progressNow} max={4} />

          <button onClick={onBackToHome} type="button" className={'updateList btn'}>
            Back
          </button>

          <div className={'addRestaurantWrapper'}>
            <img
              src="https://media-cdn.tripadvisor.com/media/photo-s/14/07/c6/eb/elissa-bar-restaurant.jpg"
              alt="Person"
              className="card_img"
            />
            <div className="form__group field">
              <input
                defaultValue={name}
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
                placeholder="name"
                name="name"
                id="name"
                maxLength={30}
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
                defaultValue={location}
                type="input"
                className="form__field"
                placeholder="Location"
                name="location"
                id="location"
                maxLength={30}
                required
              />
              <label htmlFor="location" className="form__label">
                Location
              </label>
            </div>
            <div className="form__group field">
              <input
                onInput={event => {
                  if (event.currentTarget.value && !webSite) {
                    setProgressNow(progressNow + 1);
                  }

                  if (!event.currentTarget.value) {
                    setProgressNow(progressNow - 1);
                  }

                  setWebsite(event.currentTarget.value);
                }}
                defaultValue={webSite}
                type="input"
                className="form__field"
                placeholder="Web site"
                name="website"
                id="website"
                maxLength={15}
                required
              />
              <label htmlFor="website" className="form__label">
                Web site
              </label>
            </div>
            <div className="form__group field">
              <input
                defaultValue={priceRating}
                onInput={onInputPriceRating}
                maxLength={'1'}
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
          <button onClick={onUpdateRestaurant} type="button" className={'submit btn'}>
            Update data
          </button>
          <button onClick={deleteCurrentRestaurant} type="button" className={'submit btn'}>
            Remove Restaurant
          </button>
        </div>
      </>
    );
  }
};
