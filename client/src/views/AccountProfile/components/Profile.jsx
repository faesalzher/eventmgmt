import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  CardContent,
  Divider,
  Typography,
  useMediaQuery,
  Avatar,
  CardHeader,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {
  DEPARTEMENT_QUERY,
  DEPARTEMENT_POSITION_QUERY,
} from 'gql';
import { useQuery } from '@apollo/react-hooks';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {},
  centerHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  font: {
    fontWeight: 600
  },
  column: {
    width: '30%',
  },
  value: {
    width: '70%',
  },
  row: {
    display: 'flex',
    padding: '10px 0px',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },
  avatar: {
    height: 100,
    width: 100,
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    color: theme.palette.white
  },
  subheader: {
    color: theme.palette.divider
  },
  organization: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  [theme.breakpoints.down('xs')]: {
    header: {
      display: 'block'
    },
    avatarHeader: {
      display: 'flex',
      justifyContent: 'center',
      marginLeft: 16
    },
    title: {
      textAlign: 'center'
    }
  }
}));

const Profile = props => {

  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [profile, setProfile] = useState(props.profile);
  // const [organizationForm, setOrganizationForm] = useState(props.organization);
  // useEffect(() => {
  //   setOrganizationForm(props.organization)
  // }, [setOrganizationForm, props.organization]);
  useEffect(() => {
    setProfile(props.profile)
  }, [props.profile, setProfile]);

  const [departement, setDepartement] = useState({ departement_name: "" });
  const [departementPosition, setDepartementPosition] = useState({ departement_position_name: "" });
  const { data: departementData, refetch: departementRefetch } = useQuery(DEPARTEMENT_QUERY, {
    variables: { departement_id: profile.departement_id },
    onCompleted: () => {
      if (departementData !== undefined && departementData.departement !== null) {
        setDepartement(departementData.departement)
      }

    }
  }
  );

  const { data: departementPositionData, refetch: departementPositionRefetch } = useQuery(DEPARTEMENT_POSITION_QUERY, {
    variables: { _id: profile.departement_position_id },
    onCompleted: () => {
      if (departementPositionData && departementPositionData.departement_position !== null) {
        setDepartementPosition(departementPositionData.departement_position)
      }

    }
  }
  );


  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    departementRefetch();
    departementPositionRefetch();
  }

  console.log(departementPosition.departement_position_name)

  // useEffect(() => {
  //   setDepartement(props.departement)
  // }, [props.departement, setDepartement]);

  return (
    <form
      autoComplete="off"
      noValidate
    >
      <CardHeader
        className={classes.header}
        subheader={
          <div>
            <Typography variant="body2" className={[classes.subheader, classes.centerHeader].join(" ")} color="textSecondary" component="p">
              {profile.departement_position_id !== "" || profile.departement_id !== "" ?
                departementPosition.departement_position_name + " " + departement.departement_name
                :
                ""
              }
            </Typography>
            <Typography
              className={[classes.organization, classes.subheader, classes.centerHeader].join(" ")}
              color="textSecondary"
              variant="body1"
            >
              {props.organization.organization_name}
            </Typography>
          </div>
        }
        title={
          <div>
            <Typography gutterBottom variant="h5" component="h2" className={[classes.title, classes.centerHeader].join(" ")}>
              {profile.staff_name}
            </Typography>
            <Typography gutterBottom variant="body2" className={[classes.centerHeader].join(" ")} style={{ color: "cornflowerblue" }} component="p">
              {profile.email}
            </Typography>
          </div>
        }
        action={
          <div className={classes.title}>
            <Tooltip arrow title="Edit Profile" aria-label="confirm">
              <IconButton onClick={props.handleOpenEditPage}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </div>
        }
        avatar={
          <div style={{ padding: 10 }}>
            {
              // openEditPage ?
              //   <div className={classes.avatarHeader}>
              //     <EditAvatarForm
              //       uploadImage={uploadImage}
              //       picture={profile.picture}
              //       removeImage={removeImage}
              //       size={100}
              //     />
              //   </div>
              //   :
              <div className={classes.avatarHeader}>
                <Avatar
                  className={classes.avatar}
                  src={profile.picture}
                />
              </div>
            }
          </div>
        }
      >
      </CardHeader>
      <CardContent style={{ backgroundColor: 'white' }}>
        <Divider />
        <div className={classes.row}>
          <div
            className={[classes.center, classes.column].join(" ")}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Organization Name</Typography>
          </div>
          <div
            className={[classes.center, classes.value].join(" ")}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1">
              {
                props.organization.organization_name
              }
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.row}>
          <div
            className={[classes.center, classes.column].join(" ")}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Organization Description</Typography>
          </div>
          <div
            className={[classes.center, classes.value].join(" ")}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1">
              {
                props.organization.description
              }
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.row}>
          <div
            className={[classes.center, classes.column].join(" ")}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Name</Typography>
          </div>
          <div
            className={[classes.center, classes.value].join(" ")}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1" >{profile.staff_name}</Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.row}>
          <div
            className={[classes.center, classes.column].join(" ")}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Email</Typography>
          </div>
          <div
            className={[classes.center, classes.value].join(" ")}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1" style={{ color: 'blue' }}>{profile.email}</Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.row}>
          <div
            className={[classes.center, classes.column].join(" ")}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Phone Number</Typography>
          </div>
          <div
            className={[classes.center, classes.value].join(" ")}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1">{profile.phone_number}</Typography>

          </div>
        </div>
        <Divider />
        <div className={classes.row}>
          <div
            className={[classes.center, classes.column].join(" ")}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Position</Typography>
          </div>
          <div
            className={[classes.center, classes.value].join(" ")}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1">{departementPosition.departement_position_name}</Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.row}>
          <div
            className={[classes.center, classes.column].join(" ")}
            style={sm ? { paddingBottom: 0 } : {}}
          >
            <Typography variant="subtitle2" className={classes.font}>Departement</Typography>
          </div>
          <div
            className={[classes.center, classes.value].join(" ")}
            style={sm ? { paddingTop: 0 } : {}}
          >
            <Typography variant="body1">
              {
                departement.departement_name
              }
            </Typography>
          </div>
        </div>
        <Divider />
      </CardContent>
    </form >
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
