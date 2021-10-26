import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useState } from 'react';

export const EditPage = ({ editData, onBackToHome, updateListRestaurant }) => {
  const [name, setName] = useState(editData.name);
  const [webSite, setWebsite] = useState(editData.website);
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
            .post(`https://restaurants-database.herokuapp.com/api/v1/restaurants/${editData.id}`, {
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
    } else {
      setPriceRating('');
      event.currentTarget.value = '';
    }
  };

  {
    return (
      <div className={'contentHome'}>
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
                setName(event.currentTarget.value);
              }}
              type="input"
              className="form__field"
              placeholder="name"
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
                setLocation(event.currentTarget.value);
              }}
              defaultValue={location}
              type="input"
              className="form__field"
              placeholder="Location"
              name="name"
              id="name"
              required
            />
            <label htmlFor="name" className="form__label">
              Location
            </label>
          </div>
          <div className="form__group field">
            <input
              onInput={event => {
                setWebsite(event.currentTarget.value);
              }}
              defaultValue={webSite}
              type="input"
              className="form__field"
              placeholder="Web site"
              name="name"
              id="name"
              required
            />
            <label htmlFor="name" className="form__label">
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
              name="name"
              id="name"
              required
            />
            <label htmlFor="name" className="form__label">
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
    );
  }
};
