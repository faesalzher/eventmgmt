import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';


// const COMITEESBYPROJECT_QUERY = gql`
//   query comiteesByProject($project_id: String!){
//      comiteesByProject(project_id:$project_id) {
//       _id
//       staff_id
//       position_id
//       division_id
//       project_id
//     }
//   }
// `;


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

export default function CancelledComiteeCard(props) {
  const { countCancelledProject,className, ...rest } = props;

  const classes = useStyles();
  // const [comitees, setComitees] = useState([]);

  // const { data: comiteesData, refetch: comiteesRefetch } = useQuery(COMITEESBYPROJECT_QUERY, {
  //   variables: { project_id: props.project._id },
  //   onCancelled: () => {
  //     setComitees(
  //       comiteesData.comiteesByProject
  //     )
  //   }
  // }
  // );

  // useEffect(() => {
  //   refresh();
  // });

  // const refresh = () => {
  //   comiteesRefetch();
  // };
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Cancelled Projects
            </Typography>
            <Typography variant="h3">{props.countCancelledProject.length}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <FolderIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
