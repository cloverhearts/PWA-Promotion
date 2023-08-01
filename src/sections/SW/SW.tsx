import { useCallback, useEffect, useRef } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import type { SnackbarKey } from 'notistack';
import { useRegisterSW } from 'virtual:pwa-register/react';

import useNotifications from '@/store/notifications';

// TODO (Suren): this should be a custom hook :)
function SW() {
  const [, notificationsActions] = useNotifications();
  const notificationKey = useRef<SnackbarKey | null>(null);
  // @ts-ignore
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW: (url, reg) => {
      console.log('service worker ', url)
      setInterval(() => {
        try {
          new Notification('[OPENAPI 알리미] 레벨업!', { image: 'https://file.nexon.com/NxFile/download/FileDownloader.aspx?oidFile=5125188760694163101'})
        } catch (e) {
          console.log(e)
          if (reg) {
            reg.showNotification('[OPENAPI 알리미] 레벨업!', {image: 'https://file.nexon.com/NxFile/download/FileDownloader.aspx?oidFile=5125188760694163101'})
          }
        }
      }, 3000)
    }
  });

  const close = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);

    if (notificationKey.current) {
      notificationsActions.close(notificationKey.current);
    }
  }, [setOfflineReady, setNeedRefresh, notificationsActions]);

  useEffect(() => {
    Notification.requestPermission(result => {

      if (result === 'granted') {

      } else {
        notificationsActions.push({
          options: {
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            autoHideDuration: 4500,
            content: <Alert severity="error">알람 설정이 차단되어있습니다. 허용해주세요</Alert>,
          },
        });
      }
    })
  }, []);


  useEffect(() => {

    if (offlineReady) {
      notificationsActions.push({
        options: {
          autoHideDuration: 4500,
          content: <Alert severity="success">App is ready to work offline.</Alert>,
        },
      });
    } else if (needRefresh) {
      notificationKey.current = notificationsActions.push({
        message: 'New content is available, click on reload button to update.',
        options: {
          variant: 'warning',
          persist: true,
          action: (
            <>
              <Button onClick={() => updateServiceWorker(true)}>Reload</Button>
              <Button onClick={close}>Close</Button>
            </>
          ),
        },
      });
    }
  }, [close, needRefresh, offlineReady, notificationsActions, updateServiceWorker]);

  return null;
}

export default SW;
