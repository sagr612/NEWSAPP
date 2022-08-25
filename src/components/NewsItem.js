import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (


            <div className='my-3'>
                <div className="card" >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            position: 'absolute',
                            right: '0'
                        }}
                    >
                        {/* rounded */}
                        <span className="badge rounded bg-danger">{source} </span>
                    </div>
                    <img src={!imageUrl ? "https://c.ndtvimg.com/2022-01/oant86s_delhi-covid_625x300_14_January_22.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">

                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? 'Unknown' : author} on {new Date(date).toGMTString()} </small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark">Go somewhere</a>
                    </div>
                </div>
            </div >
        )
    }
}

export default NewsItem