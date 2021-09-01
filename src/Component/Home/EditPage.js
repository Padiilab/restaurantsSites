import React, { Component } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export default class AddNewRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.editData.name,
      priceRating: this.props.editData.price_range,
      location: this.props.editData.location,
      webSite: this.props.editData.website
    };
  }
  onUpdateRestaurant = () => {
    if (
      this.state.name &&
      this.state.priceRating &&
      this.state.webSite &&
      this.state.location
    ) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              `https://restaurants-database.herokuapp.com/api/v1/restaurants/${this.props.editData.id}`,
              {
                name: this.state.name,
                price_range: this.state.priceRating,
                location: this.state.location,
                website: this.state.webSite
              }
            )
            .then((response) => {
              Swal.fire({
                title: 'Update!',
                text: 'Your restaurants has been updated.',
                icon: 'success',
                timer: 3000,
                timerProgressBar: true
              });
              this.props.updateListRestaurant();
              this.props.onBackToHome();
            });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill in all the fields!'
      });
    }
  };

  onInputPriceRating = (event) => {
    if (
      Number(event.currentTarget.value) &&
      Number(event.currentTarget.value) < 6
    ) {
      this.setState({ priceRating: event.currentTarget.value });
    } else {
      this.setState({ priceRating: '' });
      event.currentTarget.value = '';
    }
  };

  render() {
    return (
      <div className={'contentHome'}>
        <button
          onClick={this.props.onBackToHome}
          type='button'
          className={'updateList btn'}
        >
          Back
        </button>
        <div className={'addRestaurantWrapper'}>
          <img
            src='https://media-cdn.tripadvisor.com/media/photo-s/14/07/c6/eb/elissa-bar-restaurant.jpg'
            alt='Person'
            className='card_img'
          />
          <div className='form__group field'>
            <input
              defaultValue={this.props.editData.name}
              onInput={(event) => {
                this.setState({ name: event.currentTarget.value });
              }}
              type='input'
              className='form__field'
              placeholder='name'
              name='name'
              id='name'
              required
            />
            <label htmlFor='name' className='form__label'>
              Name
            </label>
          </div>
          <div className='form__group field'>
            <input
              onInput={(event) => {
                this.setState({ location: event.currentTarget.value });
              }}
              defaultValue={this.props.editData.location}
              type='input'
              className='form__field'
              placeholder='Location'
              name='name'
              id='name'
              required
            />
            <label htmlFor='name' className='form__label'>
              Location
            </label>
          </div>
          <div className='form__group field'>
            <input
              onInput={(event) => {
                this.setState({ webSite: event.currentTarget.value });
              }}
              defaultValue={this.props.editData.website}
              type='input'
              className='form__field'
              placeholder='Web site'
              name='name'
              id='name'
              required
            />
            <label htmlFor='name' className='form__label'>
              Web site
            </label>
          </div>
          <div className='form__group field'>
            <input
              defaultValue={this.props.editData.price_range}
              maxLength={'1'}
              type='input'
              className='form__field'
              placeholder='Price rating'
              name='name'
              id='name'
              required
            />
            <label htmlFor='name' className='form__label'>
              Price rating(1-5)
            </label>
          </div>
        </div>
        <button
          onClick={this.onUpdateRestaurant}
          type='button'
          className={'submit btn'}
        >
          Update data
        </button>
        <button
          onClick={this.deleteCurrentRestaurant}
          type='button'
          className={'submit btn'}
        >
          Remove Restaurant
        </button>
      </div>
    );
  }
  deleteCurrentRestaurant = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://restaurants-database.herokuapp.com/api/v1/restaurants/${this.props.editData.id}`
          )
          .then((response) => {
            this.props.updateListRestaurant();
            this.props.onBackToHome();
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            });
          });
      }
    });
  };
}
