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
  const { className,countPreparingProject,countActiveProject,countCompletedProject,countCancelledProject, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();
  const preparing = ((props.countPreparingProject.length / props.projects.length).toFixed(2) * 100);
  const active = (props.countActiveProject.length / props.projects.length).toFixed(2) * 100;
  const completed = (props.countCompletedProject.length / props.projects.length).toFixed(2) * 100;
  const cancelled = (props.countCancelledProject.length / props.projects.length).toFixed(2) * 100;


  const data = {
    datasets: [
      {
        data: [preparing, active, completed, cancelled],
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
    labels: ['Preparing', 'Active', 'Completed', 'Cancelled']
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
      value: props.countPreparingProject.length,
      icon: <FolderIcon />,
      color: theme.palette.warning.main
    },
    {
      title: 'Active',
      value: props.countActiveProject.length,
      icon: <FolderIcon />,
      color: theme.palette.info.main
    },
    {
      title: 'Completed',
      value: props.countCompletedProject.length,
      icon: <FolderIcon />,
      color: theme.palette.success.main
    },
    {
      title: 'Cancelled',
      value: props.countCancelledProject.length,
      icon: <FolderIcon />,
      color: theme.palette.error.main
    }
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title={"Total Projects : "+props.projects.length}
      />
      <Divider />
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

