import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/Money';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const COMITEESBYPROJECT_QUERY = gql`
  query comiteesByProject($project_id: String!){
     comiteesByProject(project_id:$project_id) {
      _id
      staff_id
      position_id
      division_id
      project_id
    }
  }
`;


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const NumberOfComiteeCard = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [comitees, setComitees] = useState([]);

  const { data: comiteesData, refetch: comiteesRefetch } = useQuery(COMITEESBYPROJECT_QUERY, {
    variables: { project_id: props.project._id },
    onCompleted: () => {
      setComitees(
        comiteesData.comiteesByProject
      )
    }
  }
  );

  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    comiteesRefetch();
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Number of Comitee
            </Typography>
            <Typography variant="h3">{comitees.length}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

NumberOfComiteeCard.propTypes = {
  className: PropTypes.string
};

export default NumberOfComiteeCard;