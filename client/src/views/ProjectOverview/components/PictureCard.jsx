import React, { } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardMedia } from '@material-ui/core';
import image from 'assets/project.png'

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
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardMedia
        className={classes.media}
        image={props.project.picture === "null" ? image : props.project.picture}
        title={props.project.project_name}
      />
    </Card>
  );
};

PictureCard.propTypes = {
  className: PropTypes.string
};

export default PictureCard;
