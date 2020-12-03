import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  List,
  CircularProgress,
  Typography,
  Paper,
} from '@material-ui/core';
import { MyTasksBreadCrumbs, MyTasksHeader } from '.';

import {
  EDIT_TASK,
  TASK_QUERY,
  PERSON_IN_CHARGE_BY_STAFF_AND_PROJECT_QUERY,
  ROADMAP_QUERY,
  TASK_ASSIGNED_TOS_BY_STAFF_QUERY,
} from 'gql';

import { Task } from 'views/RoadmapTaskList/components';


function AssignedToMe(props) {
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
  console.log(props.taskAssignedTo.project_id)

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


  const [project_personInCharge, setProject_personInCharge] = useState([])
  const { data: personInChargeData, loading: personInChargeLoading, error: personInChargeError, refetch: personInChargeRefetch } =
    useQuery(PERSON_IN_CHARGE_BY_STAFF_AND_PROJECT_QUERY, {
      variables: { project_id: props.taskAssignedTo.project_id, staff_id: props.taskAssignedTo.staff_id },
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

  const { data: roadmapData, refetch: roadmapRefetch } = useQuery(ROADMAP_QUERY,
    {
      variables: { roadmap_id: props.taskAssignedTo.roadmap_id },
    });


  useEffect(() => {
    refresh();
  });
  const refresh = () => {
    taskRefetch();
    personInChargeRefetch();
    roadmapRefetch();
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
        {/* {project.project_name}{" > "}{event.event_name}{" > "}{roadmap.roadmap_name} */}
        <MyTasksBreadCrumbs
          project_id={props.taskAssignedTo.project_id}
          event_id={props.taskAssignedTo.event_id}
          roadmap_id={props.taskAssignedTo.roadmap_id}
        />
      </div>
      <Task
        task={task}
        project_personInCharge={project_personInCharge}
        decodedToken={props.decodedToken}
        user_access={user_access}
        project_id={project_personInCharge.project_id}
        event_id={props.taskAssignedTo.event_id}
        roadmap_id={props.taskAssignedTo.roadmap_id}
        roadmap={roadmapData.roadmap}
        handleCompletedChange={handleCompletedChange}
        handleDelete={props.handleDelete}
        handleDeleteTaskAssignedTo={props.handleDeleteTaskAssignedTo}
      />
      <div style={{ paddingBottom: 2 }}></div>
      {/* <div style={{ backgroundColor: "#d8dce3", height: 2 }} /> */}
    </div>
  );
};

export default function TasksAssignedToMe(props) {

  // const classes = useStyles();
  const [tasksAssignedTo, setTasksAssignedTo] = useState([]);

  const {
    data: tasksAssignedToData,
    loading: tasksAssignedToLoading,
    error: tasksAssignedToError,
    refetch: tasksAssignedToRefetch } =
    useQuery(
      TASK_ASSIGNED_TOS_BY_STAFF_QUERY, {
      variables: { staff_id: props.decodedToken.staff_id }
    }
    );

  useEffect(() => {
    refresh();
  });

  useEffect(() => {
    const onCompleted = (tasksAssignedToData) => {
      setTasksAssignedTo(
        tasksAssignedToData.task_assigned_tos
      )
    };
    const onError = (error) => { /* magic */ };
    if (onCompleted || onError) {
      if (onCompleted && !tasksAssignedToLoading && !tasksAssignedToError) {
        onCompleted(tasksAssignedToData);
      } else if (onError && !tasksAssignedToLoading && tasksAssignedToError) {
        onError(tasksAssignedToError);
      }
    }
  }, [tasksAssignedToLoading, tasksAssignedToData, tasksAssignedToError]);

  const refresh = () => {
    tasksAssignedToRefetch();
  };

  const handleDeleteTaskAssignedTo = (e, person_in_charge_id) => {
    if (person_in_charge_id === props.personInCharge._id) {
      const temp = [...tasksAssignedTo];
      const index = temp.map(function (item) {
        // console.log(item._id)
        return (item._id)
      }).indexOf(e);
      temp.splice(index, 1);
      setTasksAssignedTo(temp);
    }
  }

  const handleDelete = (e) => {
    const temp = [...tasksAssignedTo];
    const index = temp.map(function (item) {
      return (item.task_id)
    }).indexOf(e);
    temp.splice(index, 1);
    setTasksAssignedTo(temp);
  }

  const groupProjectObject = tasksAssignedTo.reduce((project, taskAssignedTo) => {
    const project_id = taskAssignedTo.project_id;
    if (!project[project_id]) {
      project[project_id] = [];
    }
    project[project_id].push(taskAssignedTo);
    return project;
  }, {});


  const groupProjects = Object.keys(groupProjectObject).map((project_id) => {
    return {
      project_id,
      tasksAssignedTo: groupProjectObject[project_id]
    };
  });

  if (tasksAssignedToLoading)
    return (
      <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', height: 400 }}>
        <CircularProgress size={100} />
      </div>
    )

  if (tasksAssignedTo.length === 0)
    return (
      <div style={{ height: 180, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="caption" style={{ textAlign: 'center' }} color='textSecondary'>
          there is no task assigned to me yet
        </Typography>
      </div>
    )

  const sortedTasksAssignedTo = (tasksAssignedTo.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));

  return (
    props.slice ?
      sortedTasksAssignedTo.slice(0, props.slice).map((taskAssignedTo, index) => {
        return (
          <AssignedToMe
            key={index}
            taskAssignedTo={taskAssignedTo}
            handleDelete={handleDelete}
            handleDeleteTaskAssignedTo={handleDeleteTaskAssignedTo}
            decodedToken={props.decodedToken}
          />
        )
      })
      :
      groupProjects.map((groupProject, index) => {
        return (
          
          <div style={{ paddingBottom: 10 }} key={index}>
            <MyTasksHeader
              project_id={groupProject.project_id}
              staff_id={props.decodedToken.staff_id}
              decodedToken={props.decodedToken}
            />
            {
              (groupProject.tasksAssignedTo).map((taskAssignedTo, index) => {
                return (
                  <List key={index} style={{ backgroundColor: "#d8dce3", padding: 0 }} component="nav" aria-label="main mailbox folders" >
                    <AssignedToMe
                      taskAssignedTo={taskAssignedTo}
                      handleDelete={handleDelete}
                      handleDeleteTaskAssignedTo={handleDeleteTaskAssignedTo}
                      decodedToken={props.decodedToken}
                    />
                  </List>
                )
              })
            }
          </div>
        )
      })
  );
}

