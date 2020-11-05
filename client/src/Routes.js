import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";
import { Route } from "react-router-dom";
// import { useAuth } from "context/auth.jsx";


import {
  Dashboard as DashboardView,
  Organization as OrganizationView,
  // UserList as UserListView,
  // Typography as TypographyView,
  // Icons as IconsView,
  AccountProfile as AccountView,
  // Settings as SettingsView,
  // Register as RegisterView,
  // LogIn as LogInView,
  ProjectDetail as ProjectDetailView,
  NotFound as NotFoundView,
  ProjectList as ProjectListView,
  EventDetail as EventDetailView,
  RoadmapTaskList as RoadmapTaskListView,
  LandingPage as LandingPageView,
} from "./views";

const Routes = (props) => {
  // const { authTokens } = useAuth();

  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      {/* {console.log(authTokens)} */}
      <RouteWithLayout
        component={OrganizationView}
        exact
        layout={MainLayout}
        path="/user_management"
      />
      <RouteWithLayout
        component={ProjectListView}
        exact
        layout={MainLayout}
        path="/project"
      />
      <RouteWithLayout
        component={ProjectDetailView}
        exact
        layout={MainLayout}
        path="/project/:project_id"
      />
      <RouteWithLayout
        component={EventDetailView}
        exact
        layout={MainLayout}
        path="/project/:project_id/:event_id"
      />
      <RouteWithLayout
        component={RoadmapTaskListView}
        exact
        layout={MainLayout}
        path="/project/:project_id/:event_id/:roadmap_id"
      />
      <Route
        component={LandingPageView}
        exact
        // layout={MinimalLayout}
        path="/landingpage"
      />
      {/* <RouteWithLayout
        component={EventDetailView}
        exact
        layout={MainLayout}
        path="/event/:_id"
      /> */}
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      {/* <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/login"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/register"
      /> */}
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      {/* <Redirect to="/not-found" /> */}
    </Switch>
  // ) 
  // : (
  //     <Redirect to="/login" />
  );
};

export default Routes;
