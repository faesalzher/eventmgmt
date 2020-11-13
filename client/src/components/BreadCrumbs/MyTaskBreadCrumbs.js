import React, { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { NavLink as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

export default function MyTaskBreadCrumbs(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {props.breadcrumb_item.map((item, index) => {
          return (
            <Link
              color="inherit"
              component={CustomRouterLink}
              to={item.link === undefined ? "" : item.link}
              key={index}
            >
              {item.name === undefined ? "" : item.name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
