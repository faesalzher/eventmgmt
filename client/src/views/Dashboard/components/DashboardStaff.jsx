import React, { useState, useEffect } from 'react';
// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/styles.css';

// import { makeStyles } from '@material-ui/styles';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from '@material-ui/core';
import {
    // PreparingProjectCard,
    // ActiveProjectCard,
    // CompletedProjectCard,
    // CancelledProjectCard,
    RecentlyAddedProject,
    ProjectDoughnutChart,
    RecentlyAddedTask,
    RecentlyAssignedTask,
    AssignedToMeDoughnutChart,
    CreatedByMeDoughnutChart
} from '.';

// const useStyles = makeStyles(theme => ({
//     root: {
//         padding: theme.spacing(4)
//     },
// }));
import { PROJECTS_QUERY, PERSON_IN_CHARGES_BY_STAFF_QUERY } from 'gql';

export default function DashboardStaff(props) {
    const today = new Date()

    const [projects, setProjects] = useState([]);

    const { loading, error, data, refetch } = useQuery(PROJECTS_QUERY, {
        variables: { organization_id: props.decodedToken.organization_id },
        // onCompleted: () => { setProjects(data.projects) }
    });


    useEffect(() => {
        const onCompleted = (data) => { setProjects(data.projects) };
        const onError = (error) => { /* magic */ };
        if (onCompleted || onError) {
            if (onCompleted && !loading && !error) {
                onCompleted(data);
            } else if (onError && !loading && error) {
                onError(error);
            }
        }
    }, [loading, data, error]);

    const [personInCharges, setPersonInCharges] = useState([]);
    const {
        data: personInChargesData,
        loading: personInChargesLoading,
        error: personInChargesError,
        refetch: personInChargesRefetch } =
        useQuery(PERSON_IN_CHARGES_BY_STAFF_QUERY, {
            variables: { staff_id: props.decodedToken.staff_id }
        }
        );

    useEffect(() => {
        const onCompleted = (personInChargesData) => {
            setPersonInCharges(
                personInChargesData.person_in_charges
            )
        };
        const onError = (error) => { /* magic */ };
        if (onCompleted || onError) {
            if (onCompleted && !personInChargesLoading && !personInChargesError) {
                onCompleted(personInChargesData);
            } else if (onError && !personInChargesLoading && personInChargesError) {
                onError(personInChargesError);
            }
        }
    }, [personInChargesLoading, personInChargesData, personInChargesError]);

    useEffect(() => {
        refresh();
    });

    const refresh = () => {
        refetch();
        personInChargesRefetch();
    };

    let projectStaffs = []
    personInCharges.forEach((personInCharge) => {
        projects.forEach((project) => {
            if (project._id === personInCharge.project_id) {
                projectStaffs.push(project)
            }
        })
    })

    return (
        <Grid
            container
            spacing={1}
        >
            <Grid
                item
                lg={4}
                md={4}
                xl={12}
                xs={12}
            >
                <ProjectDoughnutChart title={"My Project : " + projectStaffs.length} projects={projectStaffs} />
            </Grid>
            <Grid
                item
                lg={4}
                md={4}
                xl={12}
                xs={12}
            >
                <CreatedByMeDoughnutChart decodedToken={props.decodedToken} />
            </Grid>
            <Grid
                item
                lg={4}
                md={4}
                xl={12}
                xs={12}
            >
                <AssignedToMeDoughnutChart decodedToken={props.decodedToken} />
            </Grid>
            <Grid
                item
                lg={4}
                md={4}
                xl={12}
                xs={12}
            >
                <RecentlyAddedProject title="My Recent Project" projects={projectStaffs} />
            </Grid >
            <Grid
                item
                lg={4}
                md={4}
                xl={12}
                xs={12}
            >

                <RecentlyAddedTask decodedToken={props.decodedToken} />
            </Grid>
            <Grid
                item
                lg={4}
                md={4}
                xl={12}
                xs={12}
            >

                <RecentlyAssignedTask decodedToken={props.decodedToken} />
            </Grid>
        </Grid>
    );
};

