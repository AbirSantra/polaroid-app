import PageHeader from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetNotifications } from "@/lib/tanstack-query/queries";
import { INotification } from "@/lib/types";
import moment from "moment";

interface Props {}
const Activity = (props: Props) => {
  const { data: notifications, isPending: isNotificationsLoading } =
    useGetNotifications();

  return (
    <div className="flex h-full min-h-screen flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
      <PageHeader title="Activity" />
      <div className="flex flex-col gap-4">
        {isNotificationsLoading ? (
          <div className="flex h-full flex-1 flex-col sm:gap-4">Loading</div>
        ) : (
          <div className="flex h-full flex-1 flex-col gap-6">
            {!notifications.data.length ? (
              <p className="text-center text-sm">You have no notifications!</p>
            ) : (
              notifications.data.map((notification: INotification) => (
                <NotificationCard
                  notification={notification}
                  key={notification._id}
                />
              ))
            )}
            {}
          </div>
        )}
      </div>
    </div>
  );
};
export default Activity;

export const NotificationCard = ({
  notification,
}: {
  notification: INotification;
}) => {
  const notificationType = notification.type;
  const createdAt = moment(notification.createdAt).fromNow();

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-12 w-12 border border-gray-300">
        <AvatarImage src={notification.user.avatar} />
        <AvatarFallback>
          {notification.user.fullName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        {notificationType === "LIKE" && (
          <p className="text-sm">
            <span className="font-semibold">{notification.user.username} </span>{" "}
            liked your post
          </p>
        )}
        {notificationType === "FOLLOW" && (
          <p className="text-sm">
            <span className="font-semibold">{notification.user.username} </span>{" "}
            started following you
          </p>
        )}
        {notificationType === "COMMENT" && (
          <p className="text-sm">
            <span className="font-semibold">{notification.user.username} </span>{" "}
            commented on your post
          </p>
        )}
        <p className="text-[10px]">{createdAt}</p>
      </div>
      {!notification.seen && (
        <span className="ml-auto h-2 w-2 rounded-full bg-rose-500"></span>
      )}
    </div>
  );
};
