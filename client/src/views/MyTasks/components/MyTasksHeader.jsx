import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
    PROJECT_QUERY,
    PERSON_IN_CHARGE_BY_STAFF_AND_PROJECT_QUERY,
} from 'gql';
import FolderIcon from '@material-ui/icons/Folder';

import { MyPersonInCharge, AdminChip } from 'components';

const useStyles = makeStyles(theme => ({
    projectName: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        }
    }
}));


export default function MyTasksHeader(props) {

    const classes = useStyles();
    return (
        <div className={classes.projectName} style={{ backgroundColor: 'white', justifyContent: 'space-between', padding: "5px 10px", margin: '0px 0px 2px 0px' }}>
            <div className={classes.projectName} >
                <div style={{ paddingRight: 5 }}>
                    <PersonInCharge
                        project_id={props.project_id}
                        staff_id={props.staff_id}
                    />
                </div>
                {props.decodedToken.user_type === "organization" ?
                    <div style={{ justifyContent: 'center', flexDirection: 'column', paddingRight: 5 }}>
                        <AdminChip style={{ fontSize: 20 }} />
                    </div>
                    : <></>
                }
            </div>
            <div style={{ display: 'flex' }}>
                <Typography variant="body1" style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', paddingRight: 5 }}>
                    <FolderIcon style={{ fontSize: 20 }} />
                </Typography>
                <Typography variant="body1" style={{ fontWeight: 500, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                    <ProjectName project_id={props.project_id} />
                </Typography>
            </div>
        </div>

    );
};

const ProjectName = (props) => {
    const { data: projectData, refetch: projectRefetch } = useQuery(PROJECT_QUERY,
        {
            variables: { project_id: props.project_id },
        }
    );

    useEffect(() => {
        refresh();
    });
    const refresh = () => {
        projectRefetch();
    };

    if (!projectData || projectData.project === null) return <></>

    return (
        <>{projectData.project.project_name}</>
    );
};


const PersonInCharge = (props) => {
    const { data: personInChargeData, refetch: personInChargeRefetch } =
        useQuery(PERSON_IN_CHARGE_BY_STAFF_AND_PROJECT_QUERY, {
            variables: { project_id: props.project_id, staff_id: props.staff_id },
        }
        );

    useEffect(() => {
        refresh();
    });
    const refresh = () => {
        personInChargeRefetch();
    };

    if (!personInChargeData || personInChargeData.person_in_charges_by_staff_and_project === null) return <></>

    return (
        <MyPersonInCharge project_personInCharge={personInChargeData.person_in_charges_by_staff_and_project} />
    );
};