"use client";

import React from "react";
import { useCounterStore } from "../../hooks/useCounterStore";
import { observer } from "mobx-react";

function SecondChild() {
  // MobX Store에서 selectedButton과 count 상태를 가져옴
  const { selectedButton, count } = useCounterStore();

  return (
    <div>
      <h1>SecondChild</h1>
      <p>카운트: {count}</p>
      <p>선택한 버튼: {selectedButton}</p>
    </div>
  );
}

export default observer(SecondChild);
