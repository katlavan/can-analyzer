import {useEffect, useRef } from "react";

function useInterval(callback, delay, ...args) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay, ...args);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const parseMessage = (msgObject, canMsg) => {
  const [id, originalMsg] = canMsg.split(/ID: |Data: |, /gm).filter(Boolean);

  if (msgObject[id]) {
    const uiMsgs = msgObject[id] && msgObject[id].uniqMsgs;
    const updateduniqMsg = uiMsgs ? [...new Set([...uiMsgs, originalMsg])] : [originalMsg];
    msgObject[id].msg = originalMsg;
    msgObject[id].uniqMsgs = updateduniqMsg;
  } else {
    msgObject[id] = {
      id,
      originalId: "",
      msg: originalMsg,
      uniqMsgs: [originalMsg]
    }
  }

  return msgObject;
};