"use client";

import React from "react";
import { useCounterStore } from "../../hooks/useCounterStore";

function FirstChild() {
  // MobX Store에서 selectedButton과 count 상태를 가져옴
  const { setSelectedButton, incrementCount, resetCount } = useCounterStore();

  // 버튼 클릭 시 선택된 버튼 상태 변경하는 함수
  const handleClick = (button: string) => {
    setSelectedButton(button); // MobX Store의 setSelectedButton 메서드 호출
  };

  // 카운트를 증가시키는 함수
  const handleIncrement = () => {
    incrementCount(); // MobX Store의 incrementCount 메서드 호출
  };

  // 카운트를 리셋하는 함수
  const handleReset = () => {
    resetCount(); // MobX Store의 resetCount 메서드 호출
  };

  return (
    <div className="flex flex-col gap-3">
      <h1>FirstChild</h1>
      <div className="flex gap-3">
        {/* 버튼 클릭 시 해당 버튼을 setSelectedButton 메서드에 전달 */}
        <button
          onClick={() => handleClick("O")}
          className="border p-2 rounded-md w-10 hover:bg-gray-100"
        >
          O
        </button>
        <button
          onClick={() => handleClick("X")}
          className="border p-2 rounded-md w-10 hover:bg-gray-100"
        >
          X
        </button>
      </div>
      <div className="flex gap-3">
        {/* 각 버튼 클릭 시 handleIncrement 또는 handleReset 함수 호출 */}
        <button
          onClick={handleIncrement}
          className="border p-2 rounded-md w-fit hover:bg-gray-100"
        >
          카운트 증가
        </button>
        <button
          onClick={handleReset}
          className="border p-2 rounded-md w-fit hover:bg-gray-100"
        >
          카운트 리셋
        </button>
      </div>
    </div>
  );
}

export default FirstChild;
