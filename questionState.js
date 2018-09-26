import { StackActions } from "react-navigation";

export default {
  initialStateName: "questionOne",

  questionOne: {
    navigationAction: StackActions.push({
      routeName: "CancelScreen",
      params: {
        screenText: "This is the first screen",
        color: "purple"
      }
    }),

    onNext: (state, params, navigate, finish) => {
      if (params.cancel) {
        return finish({ cancelEarly: true });
      }
      return navigate("questionTwo", { ...state, questionOne: params });
    }
  },

  questionTwo: {
    navigationAction: StackActions.push({
      routeName: "YesNoScreen",
      params: {
        screenText: "This is another question",
        color: "purple"
      }
    }),

    onNext: (state, params, navigate, finish) =>
      navigate("questionThree", { ...state, questionTwo: params })
  },

  questionThree: {
    navigationAction: StackActions.push({
      routeName: "YesNoScreen",
      params: {
        screenText: "This is another question",
        color: "blue"
      }
    }),

    onNext: (state, params, navigate, finish) =>
      finish({ ...state, questionThree: params })
  }
};
