import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';

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

export default function NumberOfCommitteeCard(props) {
  const { className, ...rest } = props;

  const classes = useStyles();

  const groupCommitteesObject = props.personInCharges.reduce((committees, personInCharge) => {
    const committee_id = personInCharge.committee_id;
    if (!committees[committee_id]) {
      committees[committee_id] = [];
    }
    committees[committee_id].push(personInCharge);
    return committees;
  }, {});


  const groupCommittees = Object.keys(groupCommitteesObject).map((committee_id) => {
    return {
      committee_id,
      personInCharges: groupCommitteesObject[committee_id]
    };
  });

  return (
    <Card
      className={clsx(classes.root)}
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
              Number of Committees
            </Typography>
            <Typography variant="h3">{groupCommittees.length}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <BusinessIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

