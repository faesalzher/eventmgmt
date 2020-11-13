import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
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
const TASK_QUERY = gql`
  query task($task_id: String!){
    task(_id:$task_id) {
        _id,
        task_name,
        priority,
        completed,
        task_description,
        due_date,
        completed_date,
        created_at,
        created_by,
        roadmap_id
    }
  }
`;

const PROJECT_QUERY = gql`
  query project($project_id: String!){
    project(_id:$project_id) {
        _id,
        project_name,
    }
  }
`;

const EVENT_QUERY = gql`
  query event($event_id: String!){
    event(_id:$event_id) {
        _id,
        event_name,
    }
  }
`;

const ROADMAP_QUERY = gql`
  query roadmap($roadmap_id: String!){
    roadmap(_id:$roadmap_id) {
      _id
      roadmap_name
      start_date
      end_date
      color
      event_id
    }
  }
`;

const EDIT_TASK = gql`
  mutation editTask(
    $_id: String!,
    $task_name: String!,
    $priority: String!,
    $completed: Boolean!,
    $task_description: String!,
    $due_date: String!,
    $completed_date: String!,
    $created_at: String!,
    $created_by: String!,
    $roadmap_id: String!,
    ){
    editTask(
      _id: $_id,
      task_name: $task_name,
      priority: $priority,
      completed:$completed,
      task_description:$task_description,
      due_date:$due_date,
      completed_date:$completed_date,
      created_at:$created_at,
      created_by:$created_by,
      roadmap_id:$roadmap_id,
    ){
      _id
      task_name
      priority
      completed
      task_description
      due_date
      completed_date
      created_at
      created_by
      roadmap_id
    }
  }
`;


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
  };
  const [task, setTask] = useState(initialFormState);
  const { data: taskData, loading: taskLoading, error: taskError, refetch: taskRefetch } = useQuery(TASK_QUERY, {
    variables: { task_id: props.taskAssignedTo.task_id }
  }
  );

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

  // useEffect(() => {
  //   const onCompleted = (roadmapData) => {
  //     setRoadmap(
  //       roadmapData.roadmap
  //     )
  //   };
  //   const onError = (error) => { /* magic */ };
  //   if (onCompleted || onError) {
  //     if (onCompleted && !roadmapLoading && !roadmapError) {
  //       onCompleted(roadmapData);
  //     } else if (onError && !roadmapLoading && roadmapError) {
  //       onError(roadmapError);
  //     }
  //   }
  // }, [roadmapLoading, roadmapData, roadmapError]);


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
      variables: { project_id: props.comitee.project_id },
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
    // const temp = [...task];
    // const index = temp.map(function (item) {
    //   return item._id
    // }).indexOf(e._id);
    // temp[index] = e;
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
      }
    });
  };

  // const handleDelete = (e) => {
  //   setTasks(e);
  // }

  // const handleDeleteTaskAssignedTo = (e) => {

  //   setTasks(e);
  // }

  const breadcrumb_item = [
    { name: project.project_name, link: `/project/${props.comitee.project_id}` },
    { name: event.event_name, link: `/project/${props.comitee.project_id}/${roadmap.event_id}` },
    { name: roadmap.roadmap_name, link: `/project/${props.comitee.project_id}/${roadmap.event_id}/${task.roadmap_id}` }
  ]

  return (
    <div>
      <div style={{ backgroundColor: 'white', display: 'flex' ,padding: '0px 5px'}}      >
        {/* {project.project_name}{" > "}{event.event_name}{" > "}{roadmap.roadmap_name} */}
        <MyTaskBreadCrumbs breadcrumb_item={breadcrumb_item} />
      </div>
      <Task
        task={task}
        project_id={props.comitee.project_id}
        roadmap={roadmap}
        handleCompletedChange={handleCompletedChange}
        handleDelete={props.handleDelete}
        handleDeleteTaskAssignedTo={props.handleDeleteTaskAssignedTo}
      />
      <div style={{ backgroundColor: "#d8dce3", height: 10 }} />
    </div>
  );
};

