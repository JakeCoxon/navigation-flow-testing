export function runStateMachine(
  navigation,
  stateMachine,
  initialState = undefined,
  callback
) {
  let state = initialState || {};
  if (!state.stateName) {
    state = Object.freeze({
      ...state,
      stateName: stateMachine.initialStateName
    });
  }
  if (!state.result) {
    state = Object.freeze({ ...state, result: {} });
  }

  const currentStateDefinition = stateMachine[state.stateName];

  const navigate = (stateName, newResult) => {
    runStateMachine(
      navigation,
      stateMachine,
      {
        stateName,
        result: newResult
      },
      callback
    );
  };

  const onNext = params => {
    currentStateDefinition.onNext(state.result, params, navigate, callback);
  };

  const action = {
    ...currentStateDefinition.navigationAction,
    params: {
      ...currentStateDefinition.navigationAction.params,
      onNext
    }
  };

  navigation.dispatch(action);
}
