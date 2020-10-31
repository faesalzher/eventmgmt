import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Divider, Typography } from '@material-ui/core';
import { AvatarName } from 'components';


const useStyles = makeStyles(theme => ({
  content: {
    padding: "4px 0px"
  },
}));

const ExternalCard = props => {
  const { className, ...rest } = props;
  // const [externals, setExternals] = useState(props.externals);
  const externalsByType = (props.externals.filter(function (external) {
    if (external.external_type === props.type) {
      return external
    }
    return null;
  }));

  const classes = useStyles();
  console.log(props.externals)
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      style={{ height: '100%' }}
    >
      <CardContent
        {...rest}
        className={clsx(classes.root, className)}
        style={
          externalsByType.length === 0 ? { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } : { height: '100%' }
        }
      >
        <div>
          <div className={classes.content}>
            <Typography variant="subtitle2">
              {props.type}
            </Typography>
          </div>
          <Divider />
        </div>
        {externalsByType.length === 0 ?
          <div>
            <div style={{ height: 'fit-content', padding: '10px 1px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="caption" style={{ textAlign: 'center' }} color='textSecondary'>
                There is no {props.type} yet
          </Typography>
            </div>
          </div>
          :
          <div>
            {
              externalsByType.slice().map((external, index) => {
                return (
                  <div key={index}>
                    <div className={classes.content}>
                      <AvatarName
                        name={external.external_name}
                        picture={external.picture}
                      />
                    </div>
                    <Divider />
                  </div>
                )
              })
            }
          </div>
        }
        {externalsByType.length === 0 ? <Divider /> : <div></div>}
      </CardContent>
    </Card>
  );
};

ExternalCard.propTypes = {
  className: PropTypes.string
};

export default ExternalCard;
