import { action, makeObservable, observable } from "mobx";

// MobX Store 클래스 정의
class CounterStore {
  selectedButton: string | null = null; // 선택된 버튼 상태
  count: number = 0; // 카운트 상태

  constructor() {
    // makeObservable 함수를 사용하여 클래스의 필드와 메서드를 MobX 관리 대상으로 설정
    makeObservable(this, {
      selectedButton: observable,
      count: observable,
      setSelectedButton: action.bound, // action.bound를 사용하여 메서드를 바인딩
      incrementCount: action.bound,
      resetCount: action.bound,
    });
  }

  // 선택된 버튼 변경 메서드
  setSelectedButton(button: string) {
    this.selectedButton = button;
  }

  // 카운트 증가 메서드
  incrementCount() {
    this.count++;
  }

  // 카운트 리셋 메서드
  resetCount() {
    this.count = 0;
  }
}

export default CounterStore;
