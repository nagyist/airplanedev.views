import {
  NotificationProps,
  showNotification as mantineShowNotification,
} from "@mantine/notifications";

import { CheckIcon, XMarkIcon } from "components/icon";

import { Props } from "./Notification.types";

export const showNotification = ({ message, title, type, icon }: Props) => {
  let color: NotificationProps["color"];
  let notificationIcon: NotificationProps["icon"];
  switch (type) {
    case "success":
      color = "success";
      notificationIcon = <CheckIcon />;
      break;
    case "error":
      color = "error";
      notificationIcon = <XMarkIcon />;
      break;
  }
  if (icon) {
    notificationIcon = icon;
  }
  mantineShowNotification({
    message,
    title,
    color,
    icon: notificationIcon,
    radius: "lg",
  });
};
