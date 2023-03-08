import {useContext} from "react";

import MainHeader from "@/components/layout/MainHeader";
import Notification from "@/components/ui/Notification";
import NotificationContext from "@/store/notification-context";

const Layout = props => {
    const notificationCtx = useContext(NotificationContext);

    const activeNotification = notificationCtx.notification;
    // const {title, message, status} = activeNotification;

    return (
        <>
            <MainHeader></MainHeader>
            <main>{props.children}</main>
            {activeNotification && <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status}/>}
        </>
    );
};

export default Layout