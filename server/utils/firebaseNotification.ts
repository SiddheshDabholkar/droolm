type NotificationPayload = {
  title: string;
  body: string;
  data?: Record<string, string>;
};

type SendNotificationParams = {
  userId: string;
  notification: NotificationPayload;
};

type SendMatchNotificationParams = {
  userOneId: string;
  userTwoId: string;
  matchId: string;
};

const sendNotification = async ({
  userId,
  notification,
}: SendNotificationParams): Promise<{
  success: boolean;
  messageId: string;
}> => {
  console.log(`[MOCK FIREBASE] Sending notification to user: ${userId}`);
  console.log(`[MOCK FIREBASE] Title: ${notification.title}`);
  console.log(`[MOCK FIREBASE] Body: ${notification.body}`);
  console.log(`[MOCK FIREBASE] Data:`, notification?.data);

  const mockMessageId = String(Date.now());
  console.log(
    `[MOCK FIREBASE] Notification sent successfully. Message ID: ${mockMessageId}`
  );

  return {
    success: true,
    messageId: mockMessageId,
  };
};

const sendMatchNotification = async ({
  userOneId,
  userTwoId,
  matchId,
}: SendMatchNotificationParams): Promise<void> => {
  const matchNotification: NotificationPayload = {
    title: "It's a Match!",
    body: "You have a new match! Start a conversation now.",
    data: {
      type: "MATCH",
      matchId: matchId,
    },
  };

  try {
    await Promise.all([
      sendNotification({
        userId: userOneId,
        notification: matchNotification,
      }),
      sendNotification({
        userId: userTwoId,
        notification: matchNotification,
      }),
    ]);

    console.log(
      `[MOCK FIREBASE] Match notifications sent to both users for match: ${matchId}`
    );
  } catch (error) {
    console.error(`Something went wrong in sendMatchNotification`, error);
  }
};

export { sendNotification, sendMatchNotification };
