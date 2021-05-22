import React from "react"

const Context = React.createContext()
const Actions = {}

class Provider extends React.Component {
  constructor(props) {
    super(props)
    console.log("App initialization")
    this.state = {
      msg: null,
    }

    Actions.setMessage = msg => {
      this.setState({ msg })
    }

    this.actions = Actions
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          actions: this.actions,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export { Context, Provider, Actions }
