import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from 'react-router-dom';


const HelmetMetaData = (props) => {
    //const location = useLocation();
    let currentUrl = props.location ? props.location.href : "";
    let quote = props.quote !== undefined ? props.quote : "";
    let title = props.title !== undefined ? props.title : "";
    let image = props.image !== undefined ? props.image : "";
    let description = props.description !== undefined ? props.description : "";
    let hashtag = props.hashtag !== undefined ? props.hashtag : "";

    return (
        <Helmet>
            <title>{title}</title>
            <meta charSet="utf-8"></meta>
            <meta name="csrf_token" conttent=""></meta>
            <meta property="url" content={currentUrl}></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <meta name="msapplication-TileColor" content="#ffffff"></meta>
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"></meta>
            <meta name="theme-color" content="#ffffff"></meta>
            <meta name="_token" content=""></meta>
            <meta name="robots" content="noodp"></meta>
            <meta property="title" content={title}></meta>
            <meta property="quote" content={quote}></meta>
            <meta name="description" content={description}></meta>
            <meta property="image" content={image}></meta>
            <meta property="og:locale" content="en_US" />
            <meta property="og:locale:alternate" content="es_MX"></meta>
            <meta property="og:locale:alternate" content="es_ES"></meta>
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:quote" content={quote} />
            <meta property="og:hashtag" content={hashtag} />
            <meta property="og:image" content={image} />
            <meta content="image/*" property="og:image:type" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content="Acervo AudioVisual Interneta Memoria de las y los Invisibles" />
            <meta property="og:description" content={description} />
        </Helmet>
    )

}
export default HelmetMetaData;