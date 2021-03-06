import React from "react";
import {
  Chip,
  Avatar,
} from "@material-ui/core";

import { useQuery } from '@apollo/react-hooks';
import {
  COMMITTEE_QUERY,
  POSITION_QUERY,
  STAFF_QUERY,
} from 'gql';
// import { AdminChip } from 'components';

export default function MyPersonInCharge(props) {
  // const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  const { data: committeeData } = useQuery(COMMITTEE_QUERY, { variables: { _id: props.project_personInCharge.committee_id } });
  const { data: positionData } = useQuery(POSITION_QUERY, { variables: { _id: props.project_personInCharge.position_id } });
  const { data: staffData } = useQuery(STAFF_QUERY, { variables: { staff_id: props.project_personInCharge.staff_id } });
  // const { data: organizationData } = useQuery(ORGANIZATION_QUERY, { variables: { _id: decodedToken.organization_id } });
  // if (decodedToken.user_type !== "organization") {
  if (
    !staffData || staffData.staff === null ||
    !positionData || positionData.position === null ||
    !committeeData || committeeData.committee === null
  ) return (<></>)
  // } else {
  //   if (!organizationData) return <></>
  // }
  return (
    <div style={{ display: 'flex' }} >
      {/* <Typography variant="subtitle2">
      My Position
    </Typography> */}
      {/* <Box borderRadius={4} style={{backgroundColor:'#cecece',padding: '0px 9px'}}>
      <Typography variant="subtitle2">
        Head Division of Program Subcomittee
  </Typography>
    </Box> */}
      {parseInt(positionData.position.order) < 5 ?
        < Chip
          size="small"
          // color="primary"
          variant="outlined"
          avatar={<Avatar src={staffData.staff.picture} />}
          label={positionData.position.position_name}
        />
        :
        < Chip
          size="small"
          // color="primary"
          variant="outlined"
          avatar={<Avatar src={staffData.staff.picture} />}
          label={positionData.position.position_name + " Of " + committeeData.committee.committee_name}
        />
      }

    </div>
  );
}
