import React, { } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardMedia } from '@material-ui/core';
import image from "assets/default-placeholder.png";


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    padding: 10,
    [theme.breakpoints.down('sm')]: {
      height: 200
    }
  },
  media: {
    height: '100%',
    position: 'relative'
  },
}));

const PictureCard = props => {
  const { className, event,...rest } = props;

  const classes = useStyles();
  console.log(props.event.picture)
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardMedia
        className={classes.media}
        image={props.event.picture === " " ? image : props.event.picture}
        title={props.event.event_name}
      />
    </Card>
  );
};

PictureCard.propTypes = {
  className: PropTypes.string
};

export default PictureCard;
