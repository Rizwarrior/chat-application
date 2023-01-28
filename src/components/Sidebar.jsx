import React from 'react'
import styled from 'styled-components'
import Chats from './Chats'

import Navbar from './Navbar'
import Search from './Search'

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Navbar />
      <Search />
      <Chats />
    </StyledSidebar>
  )
}

export default Sidebar

const StyledSidebar= styled.div`
  flex: 1;
  background-color: #3e3c61;
`