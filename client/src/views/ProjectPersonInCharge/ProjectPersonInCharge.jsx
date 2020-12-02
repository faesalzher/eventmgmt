import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  CircularProgress,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AddIcon from '@material-ui/icons/Add';

import { useQuery } from '@apollo/react-hooks';

import jwtDecode from "jwt-decode";

import {
  PersonInCharges,
  PersonInChargeAddForm
} from './components';
// import gql from 'graphql-tag';

import { STAFFS_QUERY, POSITIONS_QUERY, COMMITTEES_QUERY } from 'gql';
// export const COMMITTEE_QUERY = gql`
//   query committee($_id: String!){
//     committee(_id:$_id) {
//       _id
//       committee_name
//       organization_id
//     }
//   }
// `;
const useStyles = makeStyles((theme) => ({
  roadmapHeaderFooter: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: '9px 13px',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function ProjectPersonInCharge(props) {
  const classes = useStyles();
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  const [openAddModal, setOpenAddModal] = useState(false);
  const [positions, setPositions] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [committees, setCommittees] = useState([]);
  const [committee_id, setCommittee_id] = React.useState('all');
  const [personInCharges, setPersonInCharges] = useState(props.personInCharges);

  useEffect(() => {
    setPersonInCharges(props.personInCharges);
  }, [setPersonInCharges, props.personInCharges]);

  const { loading: staffsLoading, data: staffsData, refetch: staffsRefetch } = useQuery(STAFFS_QUERY, {
    variables: { organization_id: decodedToken.organization_id },
    onCompleted: () => {
      setStaffs(
        staffsData.staffs
      )
    }
  }
  );


  const { loading: positionsLoading, data: positionsData, refetch: positionsRefetch } = useQuery(POSITIONS_QUERY, {
    variables: { organization_id: decodedToken.organization_id },
    onCompleted: () => {
      setPositions(
        positionsData.positions
      )
    }
  }
  );

  const { data: committeesData, refetch: committeesRefetch } = useQuery(COMMITTEES_QUERY, {
    variables: { organization_id: decodedToken.organization_id },
    onCompleted: () => {
      setCommittees(
        committeesData.committees
      )
    }
  }
  );


  useEffect(() => {
    refresh();
  });

  const refresh = () => {
    staffsRefetch();
    positionsRefetch();
    committeesRefetch();
  };

  const handleChange = (event) => {
    setCommittee_id(event.target.value);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const groupCommitteesObject = personInCharges.reduce((committees, personInCharge) => {
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

  // const project_committees = [];
  const committee_name = (committees.filter(function (committee) {
    if (committee_id === "all") {
      return committee
    } else {
      return committee._id === committee_id;
    }
  }));


  const groupDepartementsObject = staffs.reduce((departements, staff) => {
    const departement_id = staff.departement_id;
    if (!departements[departement_id]) {
      departements[departement_id] = [];
    }
    departements[departement_id].push(staff);
    return departements;
  }, {});


  const groupDepartements = Object.keys(groupDepartementsObject).map((departement_id) => {
    return {
      departement_id,
      staffs: groupDepartementsObject[departement_id]
    };
  });
  return (
    <div>
      <Paper>
        <div className={classes.roadmapHeaderFooter} style={{ justifyContent: 'space-between', display: 'flex' }}>
          <AccessibilityIcon />
          <Typography variant="button"
            style={{ display: "flex", color: "white", flexDirection: "column", justifyContent: "center", textTransform: 'uppercase' }}>
            PERSON IN CHARGE
          </Typography>
          {
            1 < parseInt(props.project_personInCharge.order) < 8 || decodedToken.user_type === "organization" ?
              <Tooltip title="Add New Person In Charge" arrow>
                <IconButton style={{ padding: 0 }} onClick={handleOpenAddModal} >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              :
              <></>
          }
          <PersonInChargeAddForm
            staffs={staffs}
            project_id={props.project_id}
            committee_id={committee_id}
            committees={committees}
            project_personInCharge={props.project_personInCharge}
            positions={positions}
            decodedToken={decodedToken}
            committee_name={committee_name}
            personInCharges={personInCharges}
            groupDepartements={groupDepartements}
            open={openAddModal}
            handleSaveButton={props.handleSaveEditPersonInChargeButton}
            close={handleCloseAddModal}
          />
        </div>
        <Paper style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }} >
          {staffsLoading || positionsLoading|| props.personInChargesLoading ?
            <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', height: 400 }}>
              <CircularProgress size={100} />
            </div>
            :
            <PersonInCharges
              project_id={props.project_id}
              committees={committees}
              committee_id={committee_id}
              groupCommittees={groupCommittees}
              groupDepartements={groupDepartements}
              project_personInCharge={props.project_personInCharge}
              personInCharges={personInCharges}
              decodedToken={decodedToken}
              staffs={staffs}
              positions={positions}
              handleChange={handleChange}
              handleSaveButton={props.handleSavePersonInChargeButton}
              handleSaveEditButton={props.handleSaveEditPersonInChargeButton}
              handleDeletePersonInCharge={props.handleDeletePersonInCharge}
            />
          }
        </Paper>
      </Paper>
    </div >
  );
}