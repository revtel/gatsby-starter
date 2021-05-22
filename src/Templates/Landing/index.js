import React from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
import ReactLogo from "../../Components/ReactLogo"

function Landing(props) {
  return (
    <Wrapper>
      <ReactLogo />
      <h2>Landing Page</h2>
      <button onClick={() => navigate("/test")}>Go To Test</button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px;
`

export default Landing
