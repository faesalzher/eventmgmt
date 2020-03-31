import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { NavLink as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));


export default function BreadCrumbs(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
     
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {
          props.breadcrumb_item.map((item, index) => {
            return (
              ((props.breadcrumb_item.length-1) === index) ?
                <Typography key={index} color="textPrimary">{item.name}</Typography>
                :
                <Link
                  color="inherit"
                  component={CustomRouterLink}
                  to={item.link}
                  key={index} >
                  {item.name}
                </Link>
            )
          })
        }
      </Breadcrumbs>
        {console.log(props.breadcrumb_item)}
    </div>
  );
}