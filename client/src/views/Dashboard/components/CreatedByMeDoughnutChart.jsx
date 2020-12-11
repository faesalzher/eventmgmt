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
// import FolderIcon from '@material-ui/icons/Folder';
import { useQuery } from '@apollo/react-hooks';
import { TASKS_QUERY_BY_CREATOR } from 'gql';

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

export default function CreatedByMeDoughnutChart(props) {
  const { className,
    // countPreparingProject, 
    // countActiveProject,
    //  countCompletedProject,
    ...rest
  } = props;


  const classes = useStyles();
  const theme = useTheme();

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

  let countCompletedTask = [];
  tasks.forEach((task) => {
    if (task.completed === true) {
      countCompletedTask.push(task)
    }
  }
  )

  let countUncompletedTask = [];
  tasks.forEach((task) => {
    if (task.completed === false) {
      countUncompletedTask.push(task)
    }
  }
  )
  const uncompleted = ((countUncompletedTask.length / tasks.length).toFixed(2) * 100);
  const completed = (countCompletedTask.length / tasks.length).toFixed(2) * 100;

  const data = {
    datasets: [
      {
        data: [uncompleted, completed],
        backgroundColor: [
          // theme.palette.warning.main,
          theme.palette.grey.main,
          theme.palette.success.main,
          // theme.palette.error.main
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
        title={"Task Created By Me : " + tasks.length}
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
                  {device.percentage} %
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

