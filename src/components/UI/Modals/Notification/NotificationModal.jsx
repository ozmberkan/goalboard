import React from "react";
import { useSelector } from "react-redux";

const NotificationModal = ({ setIsNotification }) => {
  const { user } = useSelector((store) => store.user);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="absolute inset-0"
        onClick={() => setIsNotification(false)}
      ></div>

      <div
        className="relative z-10 bg-white rounded-lg shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Bildirimlerin</h2>

          {user.notification.map((noti, i) => (
            <div key={i} className="w-full flex justify-between items-center ">
              {noti.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
