import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import { useQuery } from '@apollo/react-hooks';

import { PERSON_IN_CHARGES_BY_PROJECT_QUERY } from 'gql';

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
    backgroundColor: theme.palette.primary.main,
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

const NumberOfPersonInChargeCard = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [personInCharges, setPersonInCharges] = useState([]);

  const { data: personInChargesData, refetch: personInChargesRefetch } = useQuery(PERSON_IN_CHARGES_BY_PROJECT_QUERY, {
    variables: { project_id: props.project._id },
    onCompleted: () => {
      setPersonInCharges(
        personInChargesData.person_in_charges
      )
    }
  }
  );

  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    personInChargesRefetch();
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
              Number of Person In Charge
            </Typography>
            <Typography variant="h3">{personInCharges.length}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <SupervisorAccountIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

NumberOfPersonInChargeCard.propTypes = {
  className: PropTypes.string
};

export default NumberOfPersonInChargeCard;
