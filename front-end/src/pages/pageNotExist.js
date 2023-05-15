import React from 'react'

import '../styles/pageNotExist.css'

function PageNotExist({ urlPath }) {
    return (
        <div className='pageNotExist'>
            <p id='pageNotExist-title'>URL does not exist</p>
            {/* <p id='pageNotExist-path'>Path: {urlPath}</p> */}
        </div>
    )
}

export default PageNotExist