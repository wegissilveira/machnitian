import React, { Component } from 'react'

import Navigation from 'components/Navigation/Navigation'
import Footer from 'components/Footer/Footer'


class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Navigation />
                <main>
                    { this.props.children }
                </main>
                <Footer />
            </React.Fragment>
        )
    }
}

export default Layout