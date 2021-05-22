import React from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet"
import "./Layout.css"

function Layout({ children, location }) {
  return (
    <>
      <Helmet>
        <title>RevtelSite</title>
      </Helmet>
      <Wrapper>{children}</Wrapper>
    </>
  )
}

const Wrapper = styled.div``

export default Layout
