import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'

const Layout = (props) => {
    return (
        <>
            <Header />
            <main style={{minHeight: '86vh'}}>
                <ToastContainer/>
            {props.children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
