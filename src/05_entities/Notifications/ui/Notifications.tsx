import React from 'react';
import {notify} from "../../../06_shared/ui/icon";
import {useNotifyStore} from "../lib/useNotifyStore";

type NotificationsProps = {}

export const Notifications: React.FC<NotificationsProps> = ({}) => {
    const {notifications, delNotification} = useNotifyStore()

    return (
        <div className="absolute right-0 bottom-0 flex flex-col pr-[30px] pb-[30px] gap-y-5 z-50">
            {notifications.map((notifyObj, id) => (
                <div className={`px-[25px] py-[20px] bg-[#434343]/[0.9] relative overflow-hidden
                        backdrop-blur-sm flex items-center gap-x-4 rounded-2xl text-white text-lg
                        opacity-90
                        ${!notifyObj.isActive && 'translate-x-[calc(100%+30px)]'}
                        transition-all duration-1000 ease-in-out`}
                     key={id}
                >
                    <img src={notifyObj.isError ? notify.err : notify.success}
                         alt="" className="h-[30px]"/>
                    <p>{notifyObj.text}</p>
                    <button onClick={() => delNotification(notifyObj.id)}>
                        <img src={notify.close} alt="" className="absolute right-3 top-3 h-[10px]"/>
                    </button>
                    <div className={`absolute bottom-0 left-0 h-[4px] bg-gradient-to-r
                            ${notifyObj.isActive ? 'w-0' : 'w-full'}
                            ${notifyObj.isError ? "from-red-600" : "from-mainGreen"}
                            from-85% rounded-full
                            transition-all ease-in-out duration-[7s]`}
                    />
                </div>
            ))}
        </div>
    );
};