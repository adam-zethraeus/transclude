import React from 'react';

const remarkiframeopts = {
    'www.youtube.com': {
        tag: 'iframe',
        width: 560,
        height: 315,
        disabled: false,
        replace: [
            ['watch?v=', 'embed/'],
            ['http://', 'https://'],
        ],
        thumbnail: {
            format: 'http://img.youtube.com/vi/{id}/0.jpg',
            id: '.+/(.+)$'
        },
        removeAfter: '&'
    }
};


type IFrameProps = {
    data: {
        hProperties: {
            allowfullscreen: boolean // seems rehype specific
            frameborder: string // seems rehype specific
            height: number
            src: string
            width: number
        }
    }
}


// this would usually be generated wtih:
// const stringify = require('rehype-stringify')
// const remark2rehype = require('remark-rehype')
const IFrame: React.FC<IFrameProps> = (props) => {
    console.log(props);
    return (<iframe title="youtube video" src={props.data.hProperties.src} height={props.data.hProperties.height} width={props.data.hProperties.width} />);
}

export const IFrameOpts = remarkiframeopts;
export const IFrameRenderer = IFrame;