// // Some folks find value in a centralized route config.
// // A route config is just data. React is great at mapping
// // data into components, and <Route> is a component.

// import LoginContainer from './components/LoginContainer';
// import SignUpContainer from './components/SignUpContainer';
// import UserProfile from './components/UserProfile';
// import WorkflowRunList from './components/WorkflowRunList';
// import UserProfileForm from './Forms/UserProfileForm';
// import ProjectPage from './Pages/ProjectPage';
// import ProjectsPage from './Pages/ProjectsPage';
// import WorkflowPage from './Pages/WorkflowPage';

// // Our route config is just an array of logical "routes"
// // with `path` and `component` props, ordered the same
// // way you'd do inside a `<Switch>`.

// // Each logical "route" has two components, one for
// // the sidebar and one for the main area. We want to
// // render both of them in different places when the
// // path matches the current URL.

// // We are going to use this route config in 2
// // spots: once for the sidebar and once in the main
// // content section. All routes are in the same
// // order they would appear in a <Switch>.

// const routes = [
//   // Login Page //
//   {
//     path: '/login',
//     component: LoginContainer,
//   },

//   // Sign Up Page //
//   {
//     path: '/signUp',
//     component: SignUpContainer,
//   },

//   // Account Form //
//   {
//     path: '/accountForm',
//     component: UserProfileForm,
//   },

//   // Account Page //
//   {
//     path: '/account',
//     component: UserProfile,
//   },

//   // Project Page
//   {
//     path: '/projects/:id',
//     component: ProjectPage,
//   },

//   // Projects Page
//   {
//     path: '/projects',
//     component: ProjectsPage,
//   },

//   // Workflow Page
//   {
//     path: '/workflow_runs/:id',
//     component: WorkflowPage,
//   },

//   // Workflows Page
//   {
//     path: '/workflow_runs',
//     component: WorkflowRunList,
//   },

//   // A Page
//   {
//     path: '/projects',
//     component: ProjectsPage,
//   },

//   {
//     path: '/tacos',
//     component: Tacos,
//     routes: [
//       {
//         path: '/tacos/bus',
//         component: Bus,
//       },
//       {
//         path: '/tacos/cart',
//         component: Cart,
//       },
//     ],
//   },
// ];
