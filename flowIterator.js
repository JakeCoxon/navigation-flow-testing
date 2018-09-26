import immutagen from 'immutagen'

function dispatchNavigation(navigation, action, callback) {
  const newParams = {
    ...action.params,
    onNext: nextParams => callback(nextParams)
  };

  const newAction = { ...action, params: newParams };
  navigation.dispatch(newAction);
}

export async function startFlow(navigation, createIterator, initialParams, callback) {
  
  const resumeFlow = (iteratorState) => {
    if (!iteratorState.next) {
      callback(iteratorState.value);
      return;
    }
    dispatchNavigation(
      navigation,
      iteratorState.value,
      (nextParams) => resumeFlow(iteratorState.next(nextParams))
    );
  }

  const iterator = immutagen(createIterator)(initialParams);
  resumeFlow(iterator);
}


