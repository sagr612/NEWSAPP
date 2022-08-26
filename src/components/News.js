import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        setLoading(true);

        let data = await fetch(url);
        props.setProgress(30);

        let parsedData = await data.json()
        props.setProgress(70);

        console.log(parsedData);

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

        props.setProgress(100);

    }
    useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;

        updateNews();
    }, [])


    const fetchMoreData = async () => {

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        // setLoading(true);

        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);

        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        // setLoading(false);
        setPage(page + 1);

    };


    return (
        <>
            <h2 className='text-center' style={{ margin: '10px 0px' }}>News Monkey - {capitalizeFirstLetter(props.category)} Top Headlines </h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container'>
                    <div className='row' >
                        {articles.map((element) => {
                            return <div className='col-md-4' key={element.url} >
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} newsUrl={element.url} source={element.source.name} />
                            </div>
                        })}


                    </div>
                </div>
            </InfiniteScroll>

        </>

    )

}

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}


export default News