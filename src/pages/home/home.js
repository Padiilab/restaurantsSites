import 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Tooltip from 'react-bootstrap/Tooltip';
import React, { useEffect, useState } from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import withStyles from '@material-ui/core/styles/withStyles';

import './home.css';
import './home.scss';
import { EditPage } from '../edit-page';
import { ReviewPage } from '../review-page/review-page';

const StyledRating = withStyles({})(Rating);

export const Home = () => {
  const [editData, setEditData] = useState([]);

  const [isAddNew, setIsAddNew] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [reviewData, setReviewData] = useState(null);

  const [isAddReview, setIsAddReview] = useState(false);

  const [listRestaurants, setListRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get('https://restaurants-database.herokuapp.com/api/v1/restaurants/')
      .then(response => {
        if (listRestaurants !== response.data.restaurants) {
          setListRestaurants(response.data.restaurants);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const spinnerOrRestaurants = renderList => {
    if (isLoading) {
      return (
        <div>
          <div className={'mainSpinner spinner-grow text-secondary'} />
        </div>
      );
    }

    if (renderList.length) {
      return <div className={'contentRest'}>{renderList}</div>;
    }

    return (
      <div className={'contentRest'}>
        <div>
          <i className="flagForNotFound far fa-flag" />
          <h2>No restaurants found, please add first</h2>
        </div>
      </div>
    );
  };

  const updateListRestaurants = () => {
    setIsLoading(true);
    axios
      .get('https://restaurants-database.herokuapp.com/api/v1/restaurants/')
      .then(response => {
        setListRestaurants(response.data.restaurants);
      })
      .finally(() => setIsLoading(false));
  };

  if (!isAddNew && !editMode && !isAddReview) {
    let renderList = [];
    for (let index in listRestaurants) {
      renderList.push(
        <div className="cardRest">
          <img
            src="https://media-cdn.tripadvisor.com/media/photo-s/14/07/c6/eb/elissa-bar-restaurant.jpg"
            alt="Person"
            className="card__image"
          />
          <p className="card__name">{listRestaurants[index].name}</p>
          <div className="grid-container">
            <OverlayTrigger placement="top-start" overlay={<Tooltip className="errorTooltip">Location</Tooltip>}>
              <div className="grid-child-posts">{listRestaurants[index].location}</div>
            </OverlayTrigger>

            <div className="grid-child-followers">
              {listRestaurants[index].reviews_quantity ? listRestaurants[index].reviews_quantity : 0} review
            </div>
          </div>
          <StyledRating
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            className={'ratingStar'}
            name="half-rating-read"
            defaultValue={listRestaurants[index].rating}
            precision={0.1}
            readOnly
          />
          <ul className="social-icons">
            <OverlayTrigger placement="top-start" overlay={<Tooltip className="errorTooltip">price rating</Tooltip>}>
              <li>
                <a>
                  <p className={'priceRange'}>{listRestaurants[index].price_range}</p>
                </a>
              </li>
            </OverlayTrigger>
            <OverlayTrigger placement="top-start" overlay={<Tooltip className="errorTooltip">Web Site</Tooltip>}>
              <li>
                <a href={listRestaurants[index].website} target={'_blank'}>
                  <i className="fas fa-satellite" />
                </a>
              </li>
            </OverlayTrigger>
          </ul>
          <button
            onClick={() => {
              setIsAddReview(true);
              setReviewData(listRestaurants[index]);
            }}
            className="btnCard draw-border">
            Review
          </button>
          <button
            onClick={() => {
              setEditMode(true);
              setEditData(listRestaurants[index]);
            }}
            className="btnCard draw-border">
            Edit
          </button>
        </div>,
      );
    }
    return (
      <>
        <div className={'contentHome'}>
          <button onClick={updateListRestaurants} type="button" className={'updateList btn'}>
            Update list
          </button>
          <Link to={'/add'} className={'updateList btn'}>
            Add
          </Link>
          {spinnerOrRestaurants(renderList)}
        </div>
      </>
    );
  }

  if (isAddReview) {
    return (
      <ReviewPage
        editData={reviewData}
        updateListRestaurant={updateListRestaurants}
        onBackToHome={() => {
          setIsAddReview(false);
        }}
      />
    );
  }

  return (
    <EditPage
      editData={editData}
      updateListRestaurant={updateListRestaurants}
      onBackToHome={() => {
        setEditMode(false);
      }}
    />
  );
};
