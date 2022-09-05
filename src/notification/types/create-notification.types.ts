export type CreateNotificationType = {
  context: string;
  read?: boolean;
  sendingEmail?: boolean;
  reciver: string;
  senderRefPath: string;
  type: string;
  sendingNotification?: boolean;
};
