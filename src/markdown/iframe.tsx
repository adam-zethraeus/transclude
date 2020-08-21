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
};

export const IFrameOpts = remarkiframeopts;
