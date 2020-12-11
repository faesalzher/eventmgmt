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
    ProjectDoughnutChart,
    RecentlyAddedProject,
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
import { PROJECTS_QUERY } from 'gql';


export default function DashboardOrganization(props) {
    const today = new Date()

    const [projects, setProjects] = useState([]);

    const { loading, error, data, refetch } = useQuery(PROJECTS_QUERY, {
        variables: { organization_id: props.decodedToken.organization_id },
        // onCompleted: () => { setProjects(data.projects) }
    });

    useEffect(() => {
        refresh();
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


    const refresh = () => {
        refetch();
    };


    let countCompletedProject = [];
    projects.forEach((project) => {
        const start_date = new Date(project.project_start_date);
        const end_date = new Date(project.project_end_date);

        const isToday = (someDate) => {
            return someDate.getDate() === today.getDate() &&
                someDate.getMonth() === today.getMonth() &&
                someDate.getFullYear() === today.getFullYear()
        }

        const preparingDays = today < start_date;
        const activeDays = (today < end_date) || isToday(start_date) || isToday(end_date)
        if (!preparingDays && !activeDays) {
            countCompletedProject.push(project)
        }
    }
    )

    let countPreparingProject = [];
    projects.forEach((project) => {
        if (today < new Date(project.project_start_date)) {
            countPreparingProject.push(project)
        }
    }
    );

    let countActiveProject = [];
    projects.forEach((project) => {
        const start_date = new Date(project.project_start_date);
        const end_date = new Date(project.project_end_date);

        const isToday = (someDate) => {
            return someDate.getDate() === today.getDate() &&
                someDate.getMonth() === today.getMonth() &&
                someDate.getFullYear() === today.getFullYear()
        }

        const preparingDays = today < start_date;
        const activeDays = (today < end_date) || isToday(start_date) || isToday(end_date)
        if (!preparingDays && activeDays) {
            countActiveProject.push(project)
        }
    }
    )
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
                <ProjectDoughnutChart
                    countPreparingProject={countPreparingProject}
                    countActiveProject={countActiveProject}
                    countCompletedProject={countCompletedProject}
                    projects={projects}
                />
            </Grid>
            <Grid
                item
                lg={4}
                md={4}
                xl={12}
                xs={12}
            >
                <CreatedByMeDoughnutChart decodedToken={props.decodedToken}/>
            </Grid>
            <Grid
                item
                lg={4}
                md={4}
                xl={12}
                xs={12}
            >
                <AssignedToMeDoughnutChart  decodedToken={props.decodedToken} />
            </Grid>
            <Grid
                item
                lg={4}
                md={4}
                xl={12}
                xs={12}
            >
                <RecentlyAddedProject projects={projects} />
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

