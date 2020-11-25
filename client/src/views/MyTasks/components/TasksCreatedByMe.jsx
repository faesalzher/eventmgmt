import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
// import {
//   Button,
// } from '@material-ui/core';
import MyTaskBreadCrumbs from 'components/BreadCrumbs/MyTaskBreadCrumbs';

import { Task } from 'views/RoadmapTaskList/components';
// import { 
//   Paper,
//   Typography
//  } from '@material-ui/core';

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(4)
//   }
// }));

import {
  TASKS_QUERY_BY_CREATOR,
  PROJECT_QUERY,
  PERSON_IN_CHARGE_BY_STAFF_AND_PROJECT_QUERY,
  ROADMAP_QUERY,
  EVENT_QUERY,
  EDIT_TASK
} from 'gql';

const CreatedByMe = (props) => {
  // const classes = useStyles();

  const [roadmap, setRoadmap] = React.useState({ event_id: "" });
  const { data: roadmapData, refetch: roadmapRefetch } = useQuery(ROADMAP_QUERY,
    {
      variables: { roadmap_id: props.task.roadmap_id },
      onCompleted: () => {
        if (roadmapData !== undefined && roadmapData.roadmap !== null) {
          setRoadmap(roadmapData.roadmap)
        } else {
          setRoadmap({ event_id: "" })
        }
      }
    });


  const [event, setEvent] = React.useState({ event_name: "", project_id: "" });
  const { data: eventData, refetch: eventRefetch } = useQuery(EVENT_QUERY,
    {
      variables: { event_id: roadmap.event_id },
      onCompleted: () => {
        if (eventData !== undefined && eventData.event !== null) {
          setEvent(eventData.event)
        } else {
          setEvent({ project_id: "" })
        }
      }
    });

  const [project, setProject] = React.useState({ project_name: "" });
  const { data: projectData, refetch: projectRefetch } = useQuery(PROJECT_QUERY,
    {
      variables: { project_id: event.project_id },
      onCompleted: () => {
        if (projectData !== undefined && projectData.project !== null) {
          setProject(projectData.project)
        } else {
          setProject({ _id: "" })
        }
      }
    });

  const [project_personInCharge, setProject_personInCharge] = useState([])
  const { data: personInChargeData, loading: personInChargeLoading, error: personInChargeError, refetch: personInChargeRefetch } =
    useQuery(PERSON_IN_CHARGE_BY_STAFF_AND_PROJECT_QUERY, {
      variables: { project_id: event.project_id, staff_id: props.decodedToken.staff_id },
    }
    );

  useEffect(() => {
    const onCompleted = (personInChargeData) => {
      if (personInChargeData !== undefined && personInChargeData.person_in_charges_by_staff_and_project.length !== 0) {
        setProject_personInCharge(personInChargeData.person_in_charges_by_staff_and_project[0])
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
    projectRefetch();
    eventRefetch();
    personInChargeRefetch();
  };

  const breadcrumb_item = [
    { name: project.project_name, link: `/ project / ${project._id} ` },
    { name: event.event_name, link: `/ project / ${project._id} /${event._id}` },
    { name: roadmap.roadmap_name, link: `/project/${project._id}/${event._id}/${roadmap._id}` }
  ]

  const handleDeleteTaskAssignedTo = (e, person_in_charge_id) => {

  }

  const user_access = (roadmap.committee_id === project_personInCharge.committee_id) ?
    (project_personInCharge.position_id === '1' ||
      project_personInCharge.position_id === '2' ||
      project_personInCharge.position_id === '3' ||
      project_personInCharge.position_id === '5' ||
      project_personInCharge.position_id === '6') ?
      true
      :
      false
    :
    props.decodedToken.user_type === "organization" ? true : false

  return (
    <div>
      <div style={{ backgroundColor: 'white', display: 'flex', padding: '0px 5px' }}      >
        <MyTaskBreadCrumbs breadcrumb_item={breadcrumb_item} />
      </div>
      <Task
        task={props.task}
        project_id={project._id}
        event_id={event._id}
        roadmap_id={roadmap._id}
        roadmap={roadmap}
        user_access={user_access}
        project_personInCharge={project_personInCharge}
        decodedToken={props.decodedToken}
        handleCompletedChange={props.handleCompletedChange}
        handleDelete={props.handleDelete}
        handleDeleteTaskAssignedTo={handleDeleteTaskAssignedTo}
      />
      <div style={{ backgroundColor: "#d8dce3", height: 10 }} />
    </div>
  );
}

export default function TasksCreatedByMe(props) {
  const [tasks, setTasks] = useState([]);
  const { data: tasksData, loading: tasksLoading, error: tasksError, refetch: tasksRefetch } = useQuery(TASKS_QUERY_BY_CREATOR,
    props.decodedToken.user_type === "organization" ?
      {
        variables: { created_by: props.decodedToken.organization_id }
      }
      :
      {
        variables: { created_by: props.decodedToken.staff_id }
      }
  );

  useEffect(() => {
    const onCompleted = (tasksData) => {
      if (tasksData !== undefined) {
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

  const sortedTasks = (tasks.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
  // React.useEffect(() => {
  //   props.handleTasksLength(tasks.length)
  // })
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
        sortedTasks.map((task, index) => {
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
  );
};

