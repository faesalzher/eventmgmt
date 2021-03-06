import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
// import AdjustIcon from '@material-ui/icons/Adjust';
import FolderIcon from '@material-ui/icons/Folder';

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

export default function ProjectDoughnutChart(props) {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();
  const today = new Date()

  let countCompletedProject = [];
  props.projects.forEach((project) => {
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
  props.projects.forEach((project) => {
    if (today < new Date(project.project_start_date)) {
      countPreparingProject.push(project)
    }
  }
  );

  let countActiveProject = [];
  props.projects.forEach((project) => {
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

  const preparing = ((countPreparingProject.length / props.projects.length).toFixed(2) * 100);
  const active = (countActiveProject.length / props.projects.length).toFixed(2) * 100;
  const completed = (countCompletedProject.length / props.projects.length).toFixed(2) * 100;


  const data = {
    datasets: [
      {
        data: [preparing, active, completed],
        backgroundColor: [
          theme.palette.warning.main,
          theme.palette.info.main,
          theme.palette.success.main,
          theme.palette.error.main
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Preparing', 'Active', 'Completed']
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
      title: 'Preparing',
      value: countPreparingProject.length,
      percentage: preparing,
      icon: <FolderIcon />,
      color: theme.palette.warning.main
    },
    {
      title: 'Active',
      value: countActiveProject.length,
      percentage: active,
      icon: <FolderIcon />,
      color: theme.palette.info.main
    },
    {
      title: 'Completed',
      value: countCompletedProject.length,
      percentage: completed,
      icon: <FolderIcon />,
      color: theme.palette.success.main
    },
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title={props.title}
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
                  {props.projects.length === 0 ? "" : device.percentage + " %"}
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

