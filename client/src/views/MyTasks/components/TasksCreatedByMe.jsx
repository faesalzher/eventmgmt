import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/styles';
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

const TASKS_QUERY = gql`
  query tasks_by_creator($created_by: String!){
    tasks_by_creator(created_by:$created_by) {
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
        project_id
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

const COMITEEBYSTAFFANDPROJECT_QUERY = gql`
  query comiteeByStaffAndProject($staff_id: String!,$project_id: String!){
    comiteeByStaffAndProject(staff_id:$staff_id,project_id:$project_id) {
      _id
      staff_id
      position_id
      division_id
      project_id
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

  const [project_comitee, setProject_comitee] = useState([])
  const { data: comiteeData, loading: comiteeLoading, error: comiteeError, refetch: comiteeRefetch } =
    useQuery(COMITEEBYSTAFFANDPROJECT_QUERY, {
      variables: { project_id: event.project_id, staff_id: props.decodedToken.staff_id },
    }
    );

  useEffect(() => {
    const onCompleted = (comiteeData) => {
      if (comiteeData !== undefined && comiteeData.comiteeByStaffAndProject.length !== 0) {
        setProject_comitee(comiteeData.comiteeByStaffAndProject[0])
      }
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !comiteeLoading && !comiteeError) {
        onCompleted(comiteeData);
      } else if (onError && !comiteeLoading && comiteeError) {
        onError(comiteeError);
      }
    }
  }, [comiteeLoading, comiteeData, comiteeError]);


  useEffect(() => {
    refresh();
  });
  const refresh = () => {
    roadmapRefetch();
    projectRefetch();
    eventRefetch();
    comiteeRefetch();
  };

  const breadcrumb_item = [
    { name: project.project_name, link: `/project/${project._id}` },
    { name: event.event_name, link: `/project/${project._id}/${event._id}` },
    { name: roadmap.roadmap_name, link: `/project/${project._id}/${event._id}/${roadmap._id}` }
  ]
  const handleDeleteTaskAssignedTo = (e, comitee_id) => {

  }
  return (
    <div>
      <div style={{ backgroundColor: 'white', display: 'flex', padding: '0px 5px' }}      >
        <MyTaskBreadCrumbs breadcrumb_item={breadcrumb_item} />
      </div>
      <Task
        task={props.task}
        project_id={project._id}
        roadmap={roadmap}
        project_comitee={project_comitee}
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
  const { data: tasksData, loading: tasksLoading, error: tasksError, refetch: tasksRefetch } = useQuery(TASKS_QUERY,
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
          tasksData.tasks_by_creator
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


  return (
    tasks.map((task, index) => {
      return (
        <CreatedByMe
          key={index}
          task={task}
          project_comitee={props.comitee}
          decodedToken={props.decodedToken}
          handleCompletedChange={handleCompletedChange}
          handleDelete={handleDelete}
          handleDeleteTaskAssignedTo={props.handleDeleteTaskAssignedTo}
        />
      )
    })
  );
};

