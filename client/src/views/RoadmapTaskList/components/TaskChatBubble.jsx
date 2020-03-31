import React, { useState } from 'react';
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { 
  IconButton, 
  // Divider, 
  // TextField, 
  // TextareaAutosize, 
  // ButtonGroup, 
  // Chip, 
  Avatar, 
  Grid, 
  Box 
} from '@material-ui/core';
// import { useTheme } from '@material-ui/core/styles';
// import AddIcon from '@material-ui/icons/Add';
// import PeopleIcon from '@material-ui/icons/People';
import DeleteIcon from '@material-ui/icons/Delete';

export default function TaskTaskChatBubble(props) {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <div>
      {(props.chat.user_id === 3) ?
        <div onMouseEnter={() => setShowDelete(true)} onMouseLeave={() => setShowDelete(false)}
          key={props.index} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
            {showDelete ?
              <IconButton style={{ padding: 0 }}>
                <DeleteIcon style={{ fontSize: 20 }} />
              </IconButton>
              :
              <div>
                <Typography style={{ fontSize: 9, fontWeight: 500 }}>
                  {props.chat.chat_date.slice(4, 11)}
                </Typography>
                <Typography style={{ fontSize: 9, fontWeight: 500 }}>
                  {props.chat.chat_date.slice(16, 21)}
                </Typography>
              </div>
            }

          </div>
          <Box borderRadius={16} style={{ backgroundColor: 'orange', color: 'white' }}>
            <Typography style={{ fontSize: 13, padding: "5px 13px" }}>
              {props.chat.content}
            </Typography>
          </Box>
        </div>
        :
        <div key={props.index} style={{ display: 'flex' }}>
          <Avatar src="/static/images/avatar/1.jpg" style={{ marginRight: 10, height: 35, width: 35 }} />
          <div>
            <Typography style={{ fontSize: 11, fontWeight: 500 }}>Faesal Herlambang</Typography>
            <div style={{ display: 'flex' }}>
              <Grid>
                <Box borderRadius={16} style={{ backgroundColor: '#3f51b5', color: 'white' }}>
                  <Typography style={{ fontSize: 13, padding: "5px 13px" }}>
                    {props.chat.content}
                  </Typography>
                </Box>
              </Grid>
              <div style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}>
                <Typography style={{ fontSize: 9, fontWeight: 500 }}>
                  {props.chat.chat_date.slice(4, 11)}
                </Typography>
                <Typography style={{ fontSize: 9, fontWeight: 500 }}>
                  {props.chat.chat_date.slice(16, 21)}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      }
    </div >
  );
}