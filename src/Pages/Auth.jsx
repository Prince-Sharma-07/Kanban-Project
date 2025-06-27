// import * as React from 'react';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { SignInPage } from '@toolpad/core/SignInPage';
// import { createTheme } from '@mui/material/styles';
// import { getDesignTokens, inputsCustomizations } from './customTheme';

// const providers = [
//   { id: 'github', name: 'GitHub' },
//   { id: 'google', name: 'Google' },
//   { id: 'credentials', name: 'Email and Password' },
// ];

// const signIn = async (provider) => {
//   const promise = new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`Sign in with ${provider.id}`);
//       resolve({ error: 'This is a mock error message.' });
//     }, 500);
//   });
//   return promise;
// };

// export default function Login() {

//   const brandingDesignTokens = getDesignTokens('dark');
//   // preview-start
//   const THEME = createTheme({
//     ...brandingDesignTokens,
//     palette: {
//       ...brandingDesignTokens.palette,
//       mode: 'dark',
//     },
//     components: {
//       ...inputsCustomizations,
//     },
//   });
//   // preview-end

//   return (
//     // preview-start
//     <AppProvider theme={THEME}>
//       <SignInPage
//         signIn={signIn}
//         providers={providers}
//         slotProps={{
//           form: { noValidate: true },
//           submitButton: {
//             color: 'primary',
//             variant: 'contained',
//           },
//         }}
//         sx={{
//           '& form > .MuiStack-root': {
//             marginTop: '2rem',
//             rowGap: '0.5rem',
//           },
//         }}
//       />
//     </AppProvider>
//     // preview-end
//   );
// }

import { Outlet } from "react-router"

export default function Auth() {

  return (
    <div className="h-screen w-screen bg-black/80 flex items-center justify-center">
      <Outlet/>
    </div>
  )
}





