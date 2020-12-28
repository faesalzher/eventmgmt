import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import {
  makeStyles,
  useTheme
} from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useQuery } from '@apollo/react-hooks';
import {
  // TASK_QUERY,
  TASK_ASSIGNED_TOS_BY_STAFF_QUERY,
  TASKS_QUERY_BY_ORGANIZATION,
} from 'gql';
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

export default function AssignedToMeDoughnutChart(props) {
  const {
    className,
    //  countPreparingProject,
    //   countActiveProject,
    //    countCompletedProject,
    decodedToken,
    ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();


  const [tasksAssignedTo, setTasksAssignedTo] = useState([]);
  // const [tasks, setTasks] = useState([]);

  const { data: tasksAssignedToData, refetch: tasksAssignedToRefetch } = useQuery(
    TASK_ASSIGNED_TOS_BY_STAFF_QUERY, {
    variables: { staff_id: decodedToken.staff_id }
  }
  );

  const { data: tasksData, refetch: tasksRefetch } = useQuery(TASKS_QUERY_BY_ORGANIZATION,
    {
      variables: { organization_id: decodedToken.organization_id },
    });

  useEffect(() => {
    refresh();
  });



  const refresh = () => {
    tasksAssignedToRefetch();
    tasksRefetch();
  };
  if (!tasksAssignedToData || !tasksData) return <></>
  if (tasksAssignedToData.task_assigned_tos === null || tasksData.tasks === null) return <></>
  let tasksAssignedToMe = []
  tasksAssignedToData.task_assigned_tos.forEach((tasksAssignedTo) => {
    tasksData.tasks.forEach((task) => {
      if (task._id === tasksAssignedTo.task_id) {
        tasksAssignedToMe.push(task)
      }
    })
  })


  let countUncompletedTask = [];
  tasksAssignedToMe.forEach((task) => {
    if (task.completed === false) {
      countUncompletedTask.push(task)
    }
  }
  );

  let countCompletedTask = [];
  tasksAssignedToMe.forEach((task) => {
    if (task.completed === true) {
      countCompletedTask.push(task)
    }
  }
  );
  const uncompleted = ((countUncompletedTask.length / tasksAssignedToMe.length).toFixed(2) * 100);
  const completed = (countCompletedTask.length / tasksAssignedToMe.length).toFixed(2) * 100;

  const data = {
    datasets: [
      {
        data: [uncompleted, completed],
        backgroundColor: [
          theme.palette.grey.main,
          theme.palette.success.main,
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Uncompleted', 'Completed']
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };


  const devices = [
    {
      title: 'Uncompleted',
      value: countUncompletedTask.length,
      percentage: uncompleted,
      icon: <AssignmentIcon />,
      color: theme.palette.grey.main
    },
    {
      title: 'Completed',
      value: countCompletedTask.length,
      percentage: completed,
      icon: <AssignmentIcon />,
      color: theme.palette.success.main
    },
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title={"Task Assigned To Me : " + tasksAssignedToMe.length}
      />
      <Divider />
      <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <div>
          <div className={classes.chartContainer}>
            <Doughnut
              data={data}
              options={options}
            />
          </div>
          <div className={classes.stats}>
            {devices.map(device => (
              <div
                className={classes.device}
                key={device.title}
              >
                <Typography
                  style={{ color: device.color }}
                  variant="subtitle2"
                >
                  {tasksAssignedTo.length === 0 ? "" : device.percentage + " %"}
                </Typography>
                <span className={classes.deviceIcon} style={{ color: device.color }} >{device.icon}</span>
                <Typography variant="body1">{device.title}</Typography>
                <Typography
                  style={{ color: device.color }}
                  variant="h2"
                >
                  {device.value}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

