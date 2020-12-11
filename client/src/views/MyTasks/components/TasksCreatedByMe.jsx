import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/styles';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { MyTasksBreadCrumbs, MyTasksHeader } from '.';
import { Task } from 'views/RoadmapTaskList/components';

import {
  TASKS_QUERY_BY_CREATOR,
  PERSON_IN_CHARGE_BY_STAFF_AND_PROJECT_QUERY,
  ROADMAP_QUERY,
  EDIT_TASK
} from 'gql';

import {
  CircularProgress,
  Typography,
} from '@material-ui/core';

const CreatedByMe = (props) => {
  // const classes = useStyles();
  const [project_personInCharge, setProject_personInCharge] = useState([])
  const { data: personInChargeData, loading: personInChargeLoading, error: personInChargeError, refetch: personInChargeRefetch } =
    useQuery(PERSON_IN_CHARGE_BY_STAFF_AND_PROJECT_QUERY, {
      variables: { project_id: props.task.project_id, staff_id: props.decodedToken.staff_id },
    }
    );

  useEffect(() => {
    const onCompleted = (personInChargeData) => {
      if (personInChargeData && personInChargeData.person_in_charges_by_staff_and_project !== null) {
        setProject_personInCharge(personInChargeData.person_in_charges_by_staff_and_project)
      }
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !personInChargeLoading && !personInChargeError) {
        onCompleted(personInChargeData);
      } else if (onError && !personInChargeLoading && personInChargeError) {
        onError(personInChargeError);
      }
    }
  }, [personInChargeLoading, personInChargeData, personInChargeError]);

  useEffect(() => {
    refresh();
  });
  const refresh = () => {
    roadmapRefetch();
    personInChargeRefetch();
  };


  const handleDeleteTaskAssignedTo = (e, person_in_charge_id) => {
  }

  const { data: roadmapData, refetch: roadmapRefetch } = useQuery(ROADMAP_QUERY,
    {
      variables: { roadmap_id: props.task.roadmap_id },
    });

  if (!roadmapData || roadmapData.roadmap === null) return <></>

  const user_access = (roadmapData.roadmap.committee_id === project_personInCharge.committee_id) ?
    (
      project_personInCharge.order === '6' ||
      project_personInCharge.order === '7' ||
      props.decodedToken.user_type === "organization" ||
      project_personInCharge.order === '1' ||
      project_personInCharge.order === '2' ||
      project_personInCharge.order === '3'
    ) ?
      true
      :
      false
    :
    props.decodedToken.user_type === "organization" ||
      project_personInCharge.order === '1' ||
      project_personInCharge.order === '2' ||
      project_personInCharge.order === '3' ? true : false


  return (
    <div>
      <div style={{ backgroundColor: 'white', display: 'flex', padding: '0px 10px' }}      >
        <MyTasksBreadCrumbs
          project_id={props.task.project_id}
          event_id={props.task.event_id}
          roadmap_id={props.task.roadmap_id}
        />
      </div>
      <Task
        task={props.task}
        project_id={props.task.project_id}
        event_id={props.task._id}
        roadmap_id={props.task.roadmap_id}
        roadmap={roadmapData.roadmap}
        user_access={user_access}
        project_personInCharge={project_personInCharge}
        decodedToken={props.decodedToken}
        handleCompletedChange={props.handleCompletedChange}
        handleDelete={props.handleDelete}
        handleDeleteTaskAssignedTo={handleDeleteTaskAssignedTo}
      />
      <div style={{ paddingBottom: 2 }}></div>
    </div>
  );
}

export default function TasksCreatedByMe(props) {

  // const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const { data: tasksData, loading: tasksLoading, error: tasksError, refetch: tasksRefetch } = useQuery(TASKS_QUERY_BY_CREATOR,
    {
      variables: { created_by: props.decodedToken.staff_id }
    }
  );

  useEffect(() => {
    const onCompleted = (tasksData) => {
      if (tasksData) {
        setTasks(
          tasksData.tasks
        )
      }
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !tasksLoading && !tasksError) {
        onCompleted(tasksData);
      } else if (onError && !tasksLoading && tasksError) {
        onError(tasksError);
      }
    }
  }, [tasksLoading, tasksData, tasksError]);

  useEffect(() => {
    refresh();
  });
  const refresh = () => {
    tasksRefetch();

  };
  const [editTask] = useMutation(EDIT_TASK);

  const handleCompletedChange = (e) => {
    const temp = [...tasks];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e._id);
    temp[index] = e;
    setTasks(temp)
    console.log(e)
    editTask({
      variables:
      {
        _id: e._id,
        task_name: e.task_name,
        priority: e.priority,
        completed: e.completed,
        task_description: e.task_description,
        due_date: e.due_date,
        completed_date: e.completed_date,
        created_at: e.created_at,
        created_by: e.created_by,
        roadmap_id: e.roadmap_id,
        event_id: e.event_id,
        project_id: e.project_id,
        organization_id: props.decodedToken.organization_id,
      }
    });
  };

  const handleDelete = (e) => {
    const temp = [...tasks];
    const index = temp.map(function (item) {
      return item._id
    }).indexOf(e);
    temp.splice(index, 1);
    setTasks(temp);
    // setTimeout(() => {
    //   handleOpenSnackbar();
    // }, 700);
  }

  const groupProjectObject = tasks.reduce((project, task) => {
    const project_id = task.project_id;
    if (!project[project_id]) {
      project[project_id] = [];
    }
    project[project_id].push(task);
    return project;
  }, {});


  const groupProjects = Object.keys(groupProjectObject).map((project_id) => {
    return {
      project_id,
      tasks: groupProjectObject[project_id]
    };
  });

  const sortedTasks = (tasks.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
  // React.useEffect(() => {
  //   props.handleTasksLength(tasks.length)
  // })
  if (tasksLoading)
    return (
      <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', height: 400 }}>
        <CircularProgress size={100} />
      </div>
    )


  if (tasks.length === 0)
    return (
      <div style={{ height: 180, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="caption" style={{ textAlign: 'center' }} color='textSecondary'>
          there is no task created by me yet
      </Typography>
      </div>
    )

  return (
    props.slice ?
      sortedTasks.slice(0, props.slice).map((task, index) => {
        return (
          <CreatedByMe
            key={index}
            task={task}
            project_personInCharge={props.personInCharge}
            decodedToken={props.decodedToken}
            handleCompletedChange={handleCompletedChange}
            handleDelete={handleDelete}
            handleDeleteTaskAssignedTo={props.handleDeleteTaskAssignedTo}
          />
        )
      })
      :
      groupProjects.map((groupProject, index) => {
        return <div style={{ paddingBottom: 10 }} key={index}>
          <MyTasksHeader
            project_id={groupProject.project_id}
            staff_id={props.decodedToken.staff_id}
            decodedToken={props.decodedToken}
          />
          {
            groupProject.tasks.map((task, index) => {

              return (
                <CreatedByMe
                  key={index}
                  task={task}
                  project_personInCharge={props.personInCharge}
                  decodedToken={props.decodedToken}
                  handleCompletedChange={handleCompletedChange}
                  handleDelete={handleDelete}
                  handleDeleteTaskAssignedTo={props.handleDeleteTaskAssignedTo}
                />
              )
            })
          }
        </div>
      })
  );
};
