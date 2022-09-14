import React from 'react'
import PageNotFound from '../Images/404-Error-Page-UI-Design-new-min.jpg'
import Unauthorised from '../Images/error-401.jpg'


const ErrorPage = (props) => {

    if (props.error === 404) {
        console.error('Error 404 page not found')
        return (
            <img alt='404' src={PageNotFound} sizes='100%' />
        )
    } else if (props.error === 401) {
        console.error('Error 401 not authorised')
        return (
            <center>
                <img alt='404' src={Unauthorised} width='100%' />
            </center>
        )
    }
}

export default ErrorPage