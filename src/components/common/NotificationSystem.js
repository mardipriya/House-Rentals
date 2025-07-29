import React from 'react';
import { 
  Snackbar, 
  Alert, 
  Box, 
  IconButton, 
  Badge, 
  Menu, 
  MenuItem, 
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useNotifications } from '../../hooks/useNotifications';

const NotificationSystem = () => {
  const { 
    notifications, 
    addNotification, 
    removeNotification, 
    markAsRead, 
    markAllAsRead, 
    clearAll, 
    unreadCount 
  } = useNotifications();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentSnackbar, setCurrentSnackbar] = React.useState(null);

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClose = (id) => {
    removeNotification(id);
  };

  const handleMarkAsRead = (id) => {
    markAsRead(id);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'info':
      default:
        return <InfoIcon color="info" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  return (
    <>
      {/* Notification Bell */}
      <IconButton
        color="inherit"
        onClick={handleNotificationClick}
        sx={{ ml: 1 }}
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* Notification Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 400,
            maxHeight: 500,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notifications</Typography>
          <Box>
            <Button size="small" onClick={markAllAsRead} disabled={unreadCount === 0}>
              Mark all read
            </Button>
            <IconButton size="small" onClick={clearAll}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        
        {notifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">No notifications</Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {notifications.slice(0, 10).map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    bgcolor: notification.read ? 'transparent' : 'action.hover',
                    '&:hover': {
                      bgcolor: 'action.selected',
                    },
                  }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleNotificationClose(notification.id)}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    {getNotificationIcon(notification.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={notification.title}
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(notification.timestamp).toLocaleString()}
                        </Typography>
                      </Box>
                    }
                    onClick={() => handleMarkAsRead(notification.id)}
                    sx={{ cursor: 'pointer' }}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Menu>

      {/* Global Snackbar for new notifications */}
      {currentSnackbar && (
        <Snackbar
          open={Boolean(currentSnackbar)}
          autoHideDuration={6000}
          onClose={() => setCurrentSnackbar(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setCurrentSnackbar(null)}
            severity={getNotificationColor(currentSnackbar.type)}
            sx={{ width: '100%' }}
          >
            <Typography variant="subtitle2">{currentSnackbar.title}</Typography>
            <Typography variant="body2">{currentSnackbar.message}</Typography>
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default NotificationSystem; 