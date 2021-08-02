import React, { Component } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default class AddNewRestaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onCreate = () => {
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
        confirmButtonText: 'Yes, added it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              'https://restaurants-database.herokuapp.com/api/v1/restaurants/',
              {
                name: this.state.name,
                price_range: this.state.priceRating,
                location: this.state.location,
                website: this.state.webSite
              }
            )
            .then((response) => {
              Swal.fire({
                title: 'Added!',
                text: 'Your restaurants has been added.',
                icon: 'success',
                timer: 3000,
                timerProgressBar: true
              });
              this.props.updateListRestaurant();
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
      <>
        <div className={'content'}>
          <Header />
          <div className={'wrapperHome'}>
            <div className={'containerHome'}>
              <div className={'contentHome'}>
                <div className={'addRestaurantWrapper'}>
                  <div className='form__group field'>
                    <input
                      onInput={(event) => {
                        this.setState({ name: event.currentTarget.value });
                      }}
                      type='input'
                      className='form__field'
                      placeholder='Name'
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
                      maxLength={'1'}
                      onInput={this.onInputPriceRating}
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
                  onClick={this.onCreate}
                  type='button'
                  className={'submit btn'}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
