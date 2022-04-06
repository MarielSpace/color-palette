import React from 'react'
import './styles/Page.css'

function Page({ children, styleName }) {
  return <section className={`page ${styleName}`}>{children}</section>
}
export default Page
