
import { Stack, Typography } from '@mui/material';
// hooks
// layouts
import LoginLayout from '../../layouts/login';
// routes
//
import AuthLoginForm from './AuthLoginForm';

// ----------------------------------------------------------------------

export default function Login() {
  

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign in to Process Techonlitics</Typography>

        <Stack direction="row" spacing={0.5}>
          {/* <Typography variant="body2">New user?</Typography> */}
          {/* <NextLink href={PATH_AUTH.register} passHref>
            <Link variant="subtitle2">Login</Link>
          </NextLink> */}
        </Stack>

        {/* <Tooltip title={method} placement="left">
          <Box
            component="img"
            alt={method}
            src={`/assets/icons/auth/ic_${method}.png`}
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip> */}
      </Stack>

      {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert> */}

      <AuthLoginForm />

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}
