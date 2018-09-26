
import { StackActions } from "react-navigation";

export default function* questionIterator() {
  const result1 = yield questionOne();

  if (result1.cancel) {
    return { cancelEarly: true }
  }

  const result2 = yield questionTwo();
  let result3 = yield questionThree();


  return {
    completed: true,
    result1,
    result2,
    result3
  }
}

const questionOne = () => StackActions.push({
  routeName: "CancelScreen",
  params: {
    screenText: "This is the first screen",
    color: "purple"
  }
})

const questionTwo = () => StackActions.push({
  routeName: "ContinueSkipScreen",
  params: {
    screenText: "This is another question",
    color: "purple"
  }
})

const questionThree = () => StackActions.push({
  routeName: "ContinueSkipScreen",
  params: {
    screenText: "This is a third question",
    color: "blue"
  }
})