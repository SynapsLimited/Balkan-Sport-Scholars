import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const ErrorPage = () => {

  return (
    <section className="container error-page">
      <div className="error-center">
        <Link to="/" className="btn btn-primary"> Go Back </Link>
        <h2>Page not Found</h2>
      </div>
    </section>
  )

}

export default ErrorPage