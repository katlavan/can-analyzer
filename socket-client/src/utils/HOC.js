import React from "react";
import {parseMessage} from "./index";

function withCanData(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        msgObject: {}
      };
    }

    componentDidMount() {
      const { socket } = this.props;
      socket.on("can msg", (msg) => {
        this.setState(({msgObject}) => ({msgObject: parseMessage({...msgObject}, msg)}))
      })

    }

    render() {
      return <WrappedComponent msgObject={this.state.msgObject} {...this.props} />;
    }
  };
}

export default withCanData;