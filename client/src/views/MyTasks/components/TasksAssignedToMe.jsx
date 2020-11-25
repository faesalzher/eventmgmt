import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
// import {
//   Button,
// } from '@material-ui/core';
import MyTaskBreadCrumbs from 'components/BreadCrumbs/MyTaskBreadCrumbs';

import { Task } from 'views/RoadmapTaskList/components';
// import { Grid } from '@material-ui/core';

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(4)
//   }
// }));
import { TASK_QUERY, EVENT_QUERY } from 'gql';
import { ROADMAP_QUERY, PROJECT_QUERY, EDIT_TASK } from 'gql';

export default function TasksAssignedToMe(props) {
  // const classes = useStyles();
  // const styles = AwsSliderStyles();
  // const [openDialogDetail, setOpenDialogDetail] = React.useState(false);
  const initialFormState =
  {
    _id: "",
    task_name: "",
    priority: "",
    roadmap_id: "",
    completed: false,
    task_description: "",
    due_date: "",
    completed_date: "",
    created_at: "",
    created_by: "",
    event_id: "",
    project_id: "",
  };

  const [task, setTask] = useState(initialFormState);
  const { data: taskData, loading: taskLoading, error: taskError, refetch: taskRefetch } = useQuery(TASK_QUERY, {
    variables: { task_id: props.taskAssignedTo.task_id }
  }
  );
  // if(!taskData) return <></>
  useEffect(() => {
    const onCompleted = (taskData) => {
      if (taskData !== undefined) {
        setTask(
          taskData.task
        )
      }
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !taskLoading && !taskError) {
        onCompleted(taskData);
      } else if (onError && !taskLoading && taskError) {
        onError(taskError);
      }
    }
  }, [taskLoading, taskData, taskError]);

  const [roadmap, setRoadmap] = React.useState({ event_id: "" });
  const { data: roadmapData, refetch: roadmapRefetch } = useQuery(ROADMAP_QUERY,
    {
      variables: { roadmap_id: task.roadmap_id },
      onCompleted: () => {
        if (roadmapData !== undefined && roadmapData.roadmap !== null) {
          setRoadmap(roadmapData.roadmap)
        } else {
          setRoadmap({ event_id: "" })
        }
      }
    });

  const [project, setProject] = React.useState({ project_name: "" });
  const { data: projectData, refetch: projectRefetch } = useQuery(PROJECT_QUERY,
    {
      variables: { project_id: props.personInCharge.project_id },
      onCompleted: () => {
        if (projectData !== undefined && projectData.project !== null) {
          setProject(projectData.project)
        } else {
          setProject({ event_id: "" })
        }
      }
    });

  const [event, setEvent] = React.useState({ event_name: "" });
  const { data: eventData, refetch: eventRefetch } = useQuery(EVENT_QUERY,
    {
      variables: { event_id: roadmap.event_id },
      onCompleted: () => {
        if (eventData !== undefined && eventData.event !== null) {
          setEvent(eventData.event)
        } else {
          setEvent({ event_id: "" })
        }
      }
    });

  useEffect(() => {
    refresh();
  });
  const refresh = () => {
    taskRefetch();
    roadmapRefetch();
    projectRefetch();
    eventRefetch();
  };

  const [editTask] = useMutation(EDIT_TASK);

  const handleCompletedChange = (e) => {
    setTask(e)
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

  // const handleDelete = (e) => {
  //   setTasks(e);
  // }

  const breadcrumb_item = [
    { name: project.project_name, link: `/project/${props.personInCharge.project_id}` },
    { name: event.event_name, link: `/project/${props.personInCharge.project_id}/${roadmap.event_id}` },
    { name: roadmap.roadmap_name, link: `/project/${props.personInCharge.project_id}/${roadmap.event_id}/${task.roadmap_id}` }
  ]

  const user_access = (roadmap.committee_id === props.personInCharge.committee_id) ?
    (props.personInCharge.position_id === '1' ||
      props.personInCharge.position_id === '2' ||
      props.personInCharge.position_id === '3' ||
      props.personInCharge.position_id === '5' ||
      props.personInCharge.position_id === '6') ?
      true
      :
      false
    :
    props.decodedToken.user_type === "organization" ? true : false

  return (
    <div>
      <div style={{ backgroundColor: 'white', display: 'flex', padding: '0px 5px' }}      >
        {/* {project.project_name}{" > "}{event.event_name}{" > "}{roadmap.roadmap_name} */}
        <MyTaskBreadCrumbs breadcrumb_item={breadcrumb_item} />
      </div>
      <Task
        task={task}
        project_personInCharge={props.personInCharge}
        decodedToken={props.decodedToken}
        user_access={user_access}
        project_id={props.personInCharge.project_id}
        event_id={event._id}
        roadmap_id={roadmap._id}
        roadmap={roadmap}
        handleCompletedChange={handleCompletedChange}
        handleDelete={props.handleDelete}
        handleDeleteTaskAssignedTo={props.handleDeleteTaskAssignedTo}
      />
      <div style={{ backgroundColor: "#d8dce3", height: 10 }} />
    </div>
  );
};

