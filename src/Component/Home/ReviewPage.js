import React, { Component } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import withStyles from '@material-ui/core/styles/withStyles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const StyledRating = withStyles({})(Rating);

export default class ReviewAdding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.editData.name,
      review: '',
      starRating: 5
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

  onEditRestaurant = () => {
    if (this.state.name && this.state.review) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, edit it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              `https://restaurants-database.herokuapp.com/api/v1/restaurants/${this.props.editData.id}`,
              {
                name: this.state.name,
                website: this.state.review
              }
            )
            .then((response) => {
              Swal.fire({
                title: 'Update!',
                text: 'Your restaurants has been edited.',
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
          <div className='form__group field'>
            <input
              onInput={(event) => {
                this.setState({ name: event.currentTarget.value });
              }}
              type='input'
              className='form__field'
              placeholder='Your Name'
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
              onBlur={(event) => {
                this.setState({ review: event.currentTarget.value });
              }}
              type='input'
              className='form__field'
              placeholder='Your Review'
              name='review'
              id='review'
              required
            />
            <label htmlFor='review' className='form__label'>
              Your Review
            </label>
          </div>
          <div className='grid-child-posts'>Set your rating :</div>
          <StyledRating
            emptyIcon={<StarBorderIcon fontSize='inherit' />}
            className={'ratingStar'}
            name='half-rating-read'
            defaultValue={5}
            onChange={(event) =>
              this.setState({ starRating: event.currentTarget.value })
            }
            precision={1}
          />
        </div>
        <button
          onClick={this.onEditRestaurant}
          type='button'
          className={'submit btn'}
        >
          Add Review
        </button>
        {this.renderAllReview()}
      </div>
    );
  }

  addReview = () => {
    if (this.state.name) {
      axios
        .post(
          `https://restaurants-database.herokuapp.com/api/v1/restaurants/${this.props.editData.id}/reviews`,
          {
            name: this.state.name,
            feedback_text: this.state.review,
            stars: parseInt(this.state.starRating)
          }
        )
        .then((response) => {
          Swal.fire({
            title: 'Create!',
            text: 'Your review has been created.',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true
          });
          this.props.updateListRestaurant();
          this.props.onBackToHome();
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill "Name" field!'
      });
    }
  };

  renderAllReview = () => {
    if (!this.state.allReview) {
      axios
        .get(
          `https://restaurants-database.herokuapp.com/api/v1/restaurants/${this.props.editData.id}/reviews`
        )
        .then((response) => {
          this.setState({ allReview: response.data.reviews });
        });
    }
    if (!this.state.allReview) {
      return (
        <>
          <div>
            <div className={'mainSpinner spinner-grow text-secondary'} />
          </div>
        </>
      );
    } else {
      let reviewBox = [];
      this.state.allReview.forEach((element, index) => {
        reviewBox.push(
          <div style={{ height: 'fit-content' }} className='cardRest'>
            <img
              src='https://www.w3schools.com/bootstrap4/img_avatar1.png'
              alt='Person'
              className='card__image'
            />
            <p className='card__name'>{element.name}</p>
            <div>
              <OverlayTrigger
                placement='top-start'
                overlay={<Tooltip className='errorTooltip'>Number</Tooltip>}
              >
                <div className='grid-child-posts'>Number {index + 1}</div>
              </OverlayTrigger>
            </div>
            <StyledRating
              emptyIcon={<StarBorderIcon fontSize='inherit' />}
              className={'ratingStar'}
              name='half-rating-read'
              defaultValue={element.stars}
              precision={0.1}
              readOnly
            />
            <div>{element.feedback_text}</div>
          </div>
        );
      });
      return <div className={'contentRest'}>{reviewBox}</div>;
    }
  };
}
