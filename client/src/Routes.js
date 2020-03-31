import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import { Route } from 'react-router-dom';

import {
  Dashboard as DashboardView,
  Departement as DepartementView,
  // UserList as UserListView,
  // Typography as TypographyView,
  // Icons as IconsView,
  // Account as AccountView,
  // Settings as SettingsView,
  // SignUp as SignUpView,
  // SignIn as SignInView,
  ProjectDetail as ProjectDetailView,
  NotFound as NotFoundView,
  ProjectList as ProjectListView,
  EventDetail as EventDetailView,
  RoadmapTaskList as RoadmapTaskListView,
  LandingPage as LandingPageView,
} from './views';

const Routes = props => {
  console.log("disini" + props);

  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={DepartementView}
        exact
        layout={MainLayout}
        path="/departement"
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
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
