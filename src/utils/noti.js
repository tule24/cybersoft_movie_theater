import {notification} from 'antd'
export function noti(message, status){
    notification[status]({
        message: message
      });
}