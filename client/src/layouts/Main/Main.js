import React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
// import { useMediaQuery } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {
  Root,
  Header,
  Sidebar,
  Content,
  Footer,
  CollapseBtn,
  SidebarTrigger,
} from '@mui-treasury/layout';
import { Topbar, Footer as FooterContent, Sidebar as SidebarContent } from './components';

const useStyles = makeStyles(theme => ({
  // root: {
  //   paddingTop: 56,
  //   height: '100%',
  //   [theme.breakpoints.up('sm')]: {
  //     paddingTop: 64
  //   }
  // },
  // shiftContent: {
  //   paddingLeft: 240
  // },
  content: {
    minHeight: '90%',
    backgroundColor: "#d8dce3"
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  footer:{
    backgroundColor: "#d8dce3",
  }
}));

const config = {
  "collapsedBreakpoint": "xs",
  "heightAdjustmentDisabled": false,
  "xs": {
    "sidebar": {
      "anchor": "left",
      "hidden": false,
      "inset": false,
      "variant": "temporary",
      "width": 200,
      "collapsible": true,
      "collapsedWidth": 64
    },
    "header": {
      "position": "relative",
      "clipped": true,
      "offsetHeight": 56,
      "persistentBehavior": "fit",
    },
    "content": {
      "persistentBehavior": "fit"
    },
    "footer": {
      "persistentBehavior": "fit"
    }
  },
  "sm": {
    "sidebar": {
      "anchor": "left",
      "hidden": false,
      "inset": false,
      "variant": "persistent",
      "width": 200,
      "collapsible": true,
      "collapsedWidth": 64
    },
    "header": {
      "position": "relative",
      "clipped": false,
      "offsetHeight": 64,
      "persistentBehavior": "fit"
    },
    "content": {
      "persistentBehavior": "fit"
    },
    "footer": {
      "persistentBehavior": "fit"
    }
  },
  "md": {
    "sidebar": {
      "anchor": "left",
      "hidden": false,
      "inset": false,
      "variant": "permanent",
      "width": 200,
      "collapsible": true,
      "collapsedWidth": 64
    },
    "header": {
      "position": "sticky",
      "clipped": false,
      "offsetHeight": 64,
      "persistentBehavior": "flexible",
    },
    "content": {
      "persistentBehavior": "flexible",
      "height": "2000px",

    },
    "footer": {
      "persistentBehavior": "flexible"
    }
  }
};

const Main = props => {
  const { children} = props;
  const classes = useStyles();
 
  return (
    <Root config={config}>
      {({ headerStyles, sidebarStyles, collapsed, opened }) => (
        <>
          <CssBaseline />
          <Header className={classes.header}>
            <Toolbar>
              <SidebarTrigger className={headerStyles.leftTrigger} >
                {opened ? <ChevronLeftIcon /> : <MenuIcon />}
              </SidebarTrigger>
              <Topbar />
            </Toolbar>
          </Header>
          <Sidebar>
            <div className={sidebarStyles.container}>
              <SidebarContent />
            </div>
            <CollapseBtn className={sidebarStyles.collapseBtn}>
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </CollapseBtn>
          </Sidebar>
          <Content className={classes.content}>
            {children}
          </Content>
         <Footer className={classes.footer}>
         <FooterContent />
         </Footer>
        </>
      )}
    </Root>
  );
};

// Main.propTypes = {
//   children: PropTypes.node
// };

export default Main;
