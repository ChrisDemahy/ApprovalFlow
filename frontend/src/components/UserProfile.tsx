// import React, { useContext } from 'react';

// // Imports for fetching data
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from 'react-query';
// import axios from 'axios';

// const UserProfile = () => {
//   async function getUser() {
//     try {
//       const response = await axios.get('/user');
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   // Access the client
//   const queryClient = useQueryClient();

//   // Queries
//   const query = useQuery('user', getUser);

//   // Mutations
//   // const mutation = useMutation(loginUser, {
//   //   onSuccess: () => {
//   //     // Invalidate and refetch
//   //     queryClient.invalidateQueries('todos');
//   //   },
//   // });

// const Login = (request: any) => {
//   const {
//     status,
//     data,
//     error,
//     isFetching,
//   }: { status: any; data: User; error: AxiosError, isFetching: any } = request;

//   return (
//     <div>
//       {status === 'loading' ? (
//         'Loading...'
//       ) : status === 'error' ? (
//         <span>Error: {error.message}</span>
//       ) : (
//         <>
//           <div>
//             {data.map((post) => (
//               <p key={post.id}>
//                 <a
//                   onClick={() => setPostId(post.id)}
//                   href="#"
//                   style={
//                     // We can access the query data here to show bold links for
//                     // ones that are cached
//                     queryClient.getQueryData(['post', post.id])
//                       ? {
//                           fontWeight: 'bold',
//                           color: 'green',
//                         }
//                       : {}
//                   }
//                 >
//                   {post.title}
//                 </a>
//               </p>
//             ))}
//           </div>
//           <div>{isFetching ? 'Background Updating...' : ' '}</div>
//         </>
//       )}
//     </div>
//   );
// };
