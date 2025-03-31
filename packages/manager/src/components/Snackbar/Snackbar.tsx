import { styled } from '@mui/material/styles';
import { MaterialDesignContent, closeSnackbar } from 'notistack';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';

import { CloseSnackbar } from './CloseSnackbar';

import {
  ErrorIcon,
  InfoFilledIcon,
  TipIcon,
  WarningIcon,
  SuccessIcon,
  SecondaryIcon,
} from '@linode/ui';
import type { Theme } from '@mui/material/styles';
import type { SnackbarProviderProps } from 'notistack';

declare module 'notistack' {
  interface VariantOverrides {
    tip: true;
    secondary: true;
  }
}

const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  ({ theme }: { theme: Theme }) => ({
    '&.notistack-MuiContent': {
      color: theme.notificationToast.default.color,
      flexWrap: 'unset',
      paddingLeft: '16px',
      paddingRight: '12px',
      borderRadius: 0,
      [theme.breakpoints.up('md')]: {
        maxWidth: '400px',
      },
    },
    '#notistack-snackbar svg': {
      marginRight: '8px',
    },
    '&.notistack-MuiContent-default': {
      backgroundColor: theme.notificationToast.default.backgroundColor,
      borderLeft: theme.notificationToast.default.borderLeft,
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: theme.notificationToast.error.backgroundColor,
      borderLeft: theme.notificationToast.error.borderLeft,
    },
    '&.notistack-MuiContent-info, &.notistack-MuiContent-tip': {
      backgroundColor: theme.notificationToast.info.backgroundColor,
      borderLeft: theme.notificationToast.info.borderLeft,
    },
    '&.notistack-MuiContent-success': {
      backgroundColor: theme.notificationToast.success.backgroundColor,
      borderLeft: theme.notificationToast.success.borderLeft,
    },
    '&.notistack-MuiContent-warning': {
      backgroundColor: theme.notificationToast.warning.backgroundColor,
      borderLeft: theme.notificationToast.warning.borderLeft,
    },
    '&.notistack-MuiContent-secondary': {
      // TODO Ask why these are not in the tokens
      // TODO Ask if max-width is supposed to change
      backgroundColor: '#E5E5EA',
      borderLeft: '#A3A3AB',
    },
  })
);

export const Snackbar = (props: SnackbarProviderProps) => {
  /**
   * This pattern is taken from the Notistack docs:
   * https://iamhosseindhv.com/notistack/demos#action-for-all-snackbars
   */

  const { children, ...rest } = props;

  return (
    <SnackbarProvider
      iconVariant={{
        default: <InfoFilledIcon />,
        info: <InfoFilledIcon />,
        tip: <TipIcon />, // TODO: Add styles
        warning: <WarningIcon />,
        success: <SuccessIcon />,
        error: <ErrorIcon />,
        secondary: <SecondaryIcon />,
      }}
      {...rest}
      Components={{
        default: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent,
        tip: StyledMaterialDesignContent,
        warning: StyledMaterialDesignContent,
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        secondary: StyledMaterialDesignContent,
      }}
      action={(snackbarId) => (
        <CloseSnackbar
          onClick={() => closeSnackbar(snackbarId)}
          text="Dismiss Notification"
        />
      )}
    >
      {children}
    </SnackbarProvider>
  );
};
