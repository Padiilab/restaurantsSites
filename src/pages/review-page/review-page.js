import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Tooltip from 'react-bootstrap/Tooltip';
import { LiveProgress } from '../../components';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import withStyles from '@material-ui/core/styles/withStyles';

const StyledRating = withStyles({})(Rating);

export const ReviewPage = ({ editData, onBackToHome, updateListRestaurant }) => {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [starRating, setStarRating] = useState(5);
  const [allReview, setAllReview] = useState(null);
  const [progressNow, setProgressNow] = useState(0);

  const renderAllReview = () => {
    if (!allReview) {
      axios
        .get(`https://restaurants-database.herokuapp.com/api/v1/restaurants/${editData.id}/reviews`)
        .then(response => {
          setAllReview(response.data.reviews);
        });
    }
    if (!allReview) {
      return (
        <>
          <div>
            <div className={'mainSpinner spinner-grow text-secondary'} />
          </div>
        </>
      );
    } else {
      let reviewBox = [];
      allReview.forEach((element, index) => {
        reviewBox.push(
          <div style={{ height: 'fit-content' }} className="cardRest">
            <img src="https://www.w3schools.com/bootstrap4/img_avatar1.png" alt="Person" className="card__image" />
            <p className="card__name">{element.name}</p>
            <div>
              <OverlayTrigger placement="top-start" overlay={<Tooltip className="errorTooltip">Number</Tooltip>}>
                <div className="grid-child-posts">Number {index + 1}</div>
              </OverlayTrigger>
            </div>
            <StyledRating
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              className={'ratingStar'}
              name="half-rating-read"
              defaultValue={element.stars}
              precision={0.1}
              readOnly
            />
            <div>{element.feedback_text}</div>
          </div>,
        );
      });
      return <div className={'contentRest'}>{reviewBox}</div>;
    }
  };

  const onEditRestaurant = () => {
    if (name && review) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, edit it!',
      }).then(result => {
        if (result.isConfirmed) {
          axios
            .post(`https://restaurants-database.herokuapp.com/api/v1/restaurants/${editData.id}`, {
              name,
              website: review,
            })
            .then(() => {
              debugger;
              Swal.fire({
                title: 'Update!',
                text: 'Your restaurants has been edited.',
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
              });
              updateListRestaurant();
              onBackToHome();
            })
            .catch(err => {
              console.log(err);
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

  return (
    <div className={'contentHome'}>
      <LiveProgress now={progressNow} max={2} />
      <button onClick={onBackToHome} type="button" className={'updateList btn'}>
        Back
      </button>
      <div className={'addRestaurantWrapper'}>
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
            placeholder="Your Name"
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
              if (event.currentTarget.value && !review) {
                setProgressNow(progressNow + 1);
              }

              if (!event.currentTarget.value) {
                setProgressNow(progressNow - 1);
              }

              setReview(event.currentTarget.value);
            }}
            type="input"
            className="form__field"
            placeholder="Your Review"
            name="review"
            id="review"
            required
          />
          <label htmlFor="review" className="form__label">
            Your Review
          </label>
        </div>
        <div className="grid-child-posts">Set your rating :</div>
        <StyledRating
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
          className={'ratingStar'}
          name="half-rating-read"
          defaultValue={5}
          onChange={event => setStarRating(event.currentTarget.value)}
          precision={1}
        />
      </div>
      <button onClick={onEditRestaurant} type="button" className={'submit btn'}>
        Add Review
      </button>
      {renderAllReview()}
    </div>
  );
};
