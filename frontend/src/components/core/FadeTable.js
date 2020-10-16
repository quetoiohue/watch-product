import React from 'react'
import styled from 'styled-components'

const FadeTable = ({ Headers, Rows }) => {
  return (
    <FadeTableContainer className="relative">
      <table>
        {Headers}
        <tbody className="table__body">
          {Rows}
          <div className="last__row" />
        </tbody>
        <div className="fade-effect" />
      </table>
    </FadeTableContainer>
  )
}

export default FadeTable

const FadeTableContainer = styled.div`
  position: relative;
  background: #fff;
  border-radius: 6px;
  table tbody {
    display: block;
    padding-right: 10px;
    overflow-y: scroll;
  }

  table thead {
    display: table;
    width: calc(100% - 14px);
    table-layout: fixed;
  }
  table thead th {
    padding: 12px;
    /* text-align: left; */
  }
  table thead th:first-child {
    padding-left: 20px;
  }
  table tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  table tbody {
    td,
    th {
      padding: 12px 16px;
      font-size: 13px;
      line-height: 17px;
    }
  }
  .last__row {
    padding-bottom: 180px;
  }

  .fade-effect {
    position: absolute;
    width: calc(100% - 4px);
    left: 0;
    bottom: 0;
    height: 163px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.7) 100%
    );
  }
`