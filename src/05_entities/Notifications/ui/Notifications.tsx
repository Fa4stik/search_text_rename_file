import React, {useMemo} from 'react';
import {useTransition, animated} from "react-spring";
import {useNotifyStore} from "../lib/useNotifyStore";
import {notify} from "../../../06_shared/ui/icon";
type NotificationsSpringProps = {
    config?: {
        tension: number
        friction: number
        precision: number
    }
    timeout?: number
}

export const Notifications: React.FC<NotificationsSpringProps> = ({
    config = { tension: 125, friction: 20, precision: 0.1 },
    timeout = 5000,
}) => {
    const {notifications, delNotification} = useNotifyStore()

    const refMap = useMemo(() => new WeakMap(), [])
    const cancelMap = useMemo(() => new WeakMap(), [])

    const transitions = useTransition(notifications, {
        from: { opacity: 0, height: 0, life: '100%' },
        keys: item => item.id,
        enter: item => async (next, cancel) => {
            cancelMap.set(item, cancel)
            await next({ opacity: 1, height: refMap.get(item).offsetHeight })
            await next({ life: '0%' })
        },
        leave: [{ opacity: 0 }, { height: 0 }],
        onRest: (result, ctrl, item) => {
            delNotification(item.id)
        },
        config: (item, index, phase) =>
                key => phase === 'enter' && key === 'life'
                    ? { duration: timeout }
                    : config,
    })

    return (
        <div className="fixed z-50 w-0 m-0 bottom-7 right-7 flex flex-col items-end">
            {transitions(({life, ...style}, item) => (
                <animated.div style={style} className="box-border relative overflow-hidden w-[40ch]">
                    <animated.div className="text-white bg-mainDark opacity-90 px-[12px] pt-[22px] pb-[32px]
                        flex gap-4 items-center overflow-hidden h-auto rounded-[3px] mt-[10px]"
                                  ref={(ref: HTMLDivElement) => ref && refMap.set(item, ref)}
                    >
                        <animated.div
                            className={`absolute bottom-0 left-0 w-auto h-1 bg-gradient-to-r 
                                ${item.isError
                                ? 'from-[#FF6347] to-[#FF8C69]'
                                : 'from-[#0F9D58] to-[#00f0e0]'}
                                `}
                            style={{right: life}}
                        />
                        <img src={item.isError ? notify.err : notify.success}
                             alt="" className={`${item.isError ? 'h-[40px]' : 'h-[30px]'}`}/>
                        <p>{item.text}</p>
                    </animated.div>
                    <button className="absolute right-5 top-5 h-[10px] z-[100]"
                            onClick={(e) => {
                                e.preventDefault()
                                delNotification(item.id)
                            }}
                    >
                        <img src={notify.close} alt=""/>
                    </button>
                </animated.div>
            ))}
        </div>
    );
};