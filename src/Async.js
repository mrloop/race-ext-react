import { useEffect, useState } from "react";

export default function Async(props) {
  const [state, setState] = useState({
    componentFnc: props.loading,
    result: null,
  });

  useEffect(() => {
    setState({
      componentFnc: props.loading,
      result: null,
    });
    if (props.fnc) {
      props
        .fnc()
        .then((result) => {
          setState({
            componentFnc: props.loaded,
            result,
          });
        })
        .catch((err) => {
          setState({
            componentFnc: props.error,
            result: err,
          });
        });
    }
  }, [props]);

  if (!state.componentFnc) return "";
  return state.componentFnc({ state: state.result });
}
