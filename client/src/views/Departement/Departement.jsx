import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { 
  makeStyles, 
  // useTheme 
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import IconButton from '@material-ui/core/IconButton';
// import Button from '@material-ui/core/Button';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import SettingsIcon from '@material-ui/icons/Settings';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  DepartementTable, AddDepartementForm,
  // AddDepartementForm,

} from './components';

const DEPARTEMENS_QUERY = gql`
{
  departements{
    _id
    departement_name
  }
}
`;
const DELETE_DEPARTEMENT = gql`
mutation deleteDepartement ($_id: String!) {
  deleteDepartement(_id:$_id){
    _id
  }
}
`;
// const DELETE_STAFF_BY_DEPARTEMENT = gql`
// mutation deleteStaffByDepartement ($departement_id: String!) {
//   deleteStaffByDepartement(departement_id:$departement_id){
//     departement_id
//   }
// }
// `;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  iconbutton: {
    "&:hover": {
      color: 'black'
    },
  },
  table: {
    paddingTop: 0,
    padding: theme.spacing(1)
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Departement() {
  const classes = useStyles();
  // const theme = useTheme();
  const [value, setValue] = React.useState(0);
  // const [save, setSave] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleChangeIndex = index => {
  //   setValue(index);
  // };
  const [open, setOpen] = React.useState(false);

  const handleSucces = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [departements, setDepartements] = useState([]);

  const { loading, error, data, refetch } = useQuery(DEPARTEMENS_QUERY);
  useEffect(() => {
    refresh();
  });
  useEffect(() => {
    const onCompleted = (data) => { setDepartements(data.departements) };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data);
      } else if (onError && !loading && error) {
        onError(error);
      }
    }
  }, [loading, data, error]);


  const refresh = () => {
    refetch();
  };
  const addDepartement = useCallback(
    (e) => {
      setDepartements([...departements, e]);
      setTimeout(() => {
        handleSucces();
      }, 700);
    }, [departements]
  );
  const [deleteDepartement] = useMutation(DELETE_DEPARTEMENT);
  // const [deleteStaffByDepartement] = useMutation(DELETE_STAFF_BY_DEPARTEMENT);

  const handleDelete = e => {
    // deleteStaffByDepartement({ variables: { departement_id: e, } });
    // departements.splice(e,1);
    // setDepartements([...departements]);
    deleteDepartement({ variables: { _id: e, } });
    // departements.splice(e,1);
    setTimeout(() => {
      handleSucces();
    }, 700);
  }

  console.log(departements);
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Succes!
               </Alert>
      </Snackbar>
      <AppBar position="static" color="default" style={{ display: 'flex', flexDirection: "row" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {/* <Tab key={0} {...a11yProps(0)} /> */}
          {
            departements.map((departement, index) => (
              <Tab key={departement._id} label={departement.departement_name} {...a11yProps(index + 1)} />
            ))
          }
        </Tabs>
        <AddDepartementForm addDepartement={addDepartement} />
      </AppBar>

      {
        departements.map((departement, index) => {
          // if (departements.length === index) {
          //   return (
          //     <TabPanel key={0} value={value} index={departements.length-1}>
          //       <div>Departement is empty</div>
          //     </TabPanel>
          //   )
          // } else {
            return (
              < TabPanel key={departement._id} value={value} index={index}>
                <div className={classes.table}>
                  <DepartementTable
                    departement_name={departement.departement_name}
                    _id={departement._id}
                    handleDelete={handleDelete} />
                </div>
                {/* {console.log(departements.length + "===" + index)} */}
              </TabPanel>
            )
          // }
        }
        )
      }
    </div >
  );
}