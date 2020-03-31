import React from 'react';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  // IconButton
} from '@material-ui/core';

import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: "4px 0px"
  },
  image: {
    height: 48,
    width: 48
  },
  icon: {
    fontSize: 20,
    marginRight: 5
  },
  actions: {
    justifyContent: 'flex-end'
  },
  verticalAlign: {
    display: 'flex', flexDirection: 'column', justifyContent: 'center'
  }
}));

export default function ProjectOverview() {
  const classes = useStyles();

  return (
    <Card
      // {...rest}
      className={(classes.root)}
    >
      <div style={{ padding: "0px 14px" }}>

      </div>
      {/* <Divider /> */}
      <CardContent>
        <div className={classes.content}>
          <Typography variant="h6">
            Fun Bike
        </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
        </Typography>
        </div>
        <div className={classes.content}>
          <Typography variant="subtitle2">
            Date
          </Typography>
          <div style={{ display: 'flex' }}>
            <EventIcon className={classes.icon} />
            <div className={classes.verticalAlign} >
              <Typography variant="body2">
                Sun 25 December 2020 10:40 - Mon 26 December 2020 14:30
             </Typography>
            </div>
          </div>
        </div>
        <div className={classes.content}>
          <Typography variant="subtitle2">
            Location
          </Typography>
          <div style={{ display: 'flex' }}>
            <LocationOnIcon className={classes.icon} />
            <div className={classes.verticalAlign}>
              <Typography variant="body2">
                Universitas Brawijaya Malang
             </Typography>
            </div>
          </div>
        </div>
        {/* <List>
          {products.map((product, i) => (
            <ListItem
              divider={i < products.length - 1}
              key={product.id}
            >
              <ListItemAvatar>
                <img
                  alt="Product"
                  className={classes.image}
                  src={product.imageUrl}
                />
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                secondary={`Updated ${product.updatedAt.fromNow()}`}
              />
              <IconButton
                edge="end"
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          ))}
        </List> */}
      </CardContent>
      {/* <CardActions className={classes.actions}>
         <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button> 
      </CardActions> */}
    </Card>
  );
}
