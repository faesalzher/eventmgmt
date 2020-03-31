import React, {
  //  useEffect
   } from 'react';
// import { useQuery, useMutation } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
// import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Paper,
  // Button, 
  Divider, 
  Avatar, 
  // Card, 
  // Tabs, 
  // Tab, 
  // Box, 
  Typography 
} from '@material-ui/core';
// import { Tree, TreeNode } from 'react-organizational-chart'


const useStyles = makeStyles(theme => ({
  root: {
    // minWidth: 275,
    display: 'flex',
    justifyContent: 'center',
    // padding: theme.spacing(4),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  titleContent: {
    fontSize: 20,
    fontWeight: 450
  },
  paper: {
    display: 'inline-block',
    padding: 10,
    width: 200,
  },
  division: {
    width: 200,
  }
}));

export default function ProjectComitee() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Tree lineWidth={"1px"} label={
        <Paper className={classes.paper}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ display: 'flex', textAlign: 'left', flexDirection: 'column', justifyContent: 'center' }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </div>
            <div style={{ display: 'flex', textAlign: 'left', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h6" style={{ fontSize: 14 }}>Faesal Herlambang</Typography>
              <Divider style={{ background: 'black' }} />
              <Typography variant='subtitle1' style={{ fontSize: 11 }}>Head Of Project</Typography>
            </div>
          </div>
        </Paper>
      }>
        <TreeNode label={<Paper className={classes.paper}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ display: 'flex', textAlign: 'left', flexDirection: 'column', justifyContent: 'center' }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </div>
            <div style={{ display: 'flex', textAlign: 'left', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h6" style={{ fontSize: 14 }}>Bambang</Typography>
              <Divider style={{ background: 'black' }} />
              <Typography variant='subtitle1' style={{ fontSize: 11 }}>Kadiv Konsmusi</Typography>
            </div>
          </div>
        </Paper>}>
          <TreeNode label={<Paper className={classes.paper} elevation={0} style={{padding:0}}>
            <Typography variant="h6" style={{ fontSize: 14 }}>Staff Konsumsi</Typography>
            <div style={{ height: 6, backgroundColor: '#d8dce3' }}></div>
            <Typography variant='subtitle1' style={{ fontSize: 11 }}>Andi setyo</Typography>
            <div style={{ height: 6, backgroundColor: '#d8dce3' }}></div>
            <Typography variant='subtitle1' style={{ fontSize: 11 }}>Andi setyo</Typography>
            <div style={{ height: 6, backgroundColor: '#d8dce3' }}></div>
            <Typography variant='subtitle1' style={{ fontSize: 11 }}>Andi setyo</Typography>
            <div style={{ height: 6, backgroundColor: '#d8dce3' }}></div>
            <Typography variant='subtitle1' style={{ fontSize: 11 }}>Andi setyo</Typography>
            <div style={{ height: 6, backgroundColor: '#d8dce3' }}></div>
            <Typography variant='subtitle1' style={{ fontSize: 11 }}>Andi setyo</Typography>
          </Paper>}></TreeNode>
        </TreeNode>
        <TreeNode label={<Paper className={classes.paper}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ display: 'flex', textAlign: 'left', flexDirection: 'column', justifyContent: 'center' }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </div>
            <div style={{ display: 'flex', textAlign: 'left', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h6" style={{ fontSize: 14 }}>Arif</Typography>
              <Divider style={{ background: 'black' }} />
              <Typography variant='subtitle1' style={{ fontSize: 11 }}>Kadiv Perlengkapan</Typography>
            </div>
          </div>
        </Paper>}>
          <TreeNode label={<Paper className={classes.paper} elevation={0} style={{padding:0}}>
            <Typography variant="h6" style={{ fontSize: 14 }}>Staff Perlengkapan</Typography>
            <div style={{ height: 6, backgroundColor: '#d8dce3' }}></div>
            <Typography variant='subtitle1' style={{ fontSize: 11 }}>Andi setyo</Typography>
            <div style={{ height: 6, backgroundColor: '#d8dce3' }}></div>
            <Typography variant='subtitle1' style={{ fontSize: 11 }}>Andi setyo</Typography>
            <div style={{ height: 6, backgroundColor: '#d8dce3' }}></div>
            <Typography variant='subtitle1' style={{ fontSize: 11 }}>Andi setyo</Typography>
            <div style={{ height: 6, backgroundColor: '#d8dce3' }}></div>
            <Typography variant='subtitle1' style={{ fontSize: 11 }}>Andi setyo</Typography>
            <div style={{ height: 6, backgroundColor: '#d8dce3' }}></div>
            <Typography variant='subtitle1' style={{ fontSize: 11 }}>Andi setyo</Typography>
          </Paper>}></TreeNode>
        </TreeNode>
      </Tree> */}
    </div>
  );
}