import React from 'react';
import remark2rehype from 'remark-rehype';
import rehype2react from 'rehype-react';
import unified from 'unified';
import markdown from 'remark-parse';
import sanitize from 'rehype-sanitize';
import remarkiframe from 'remark-iframes';
import { IFrameOpts } from './iframe';

const processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(remarkiframe, IFrameOpts)
  .use(sanitize)
  .use(rehype2react, {createElement: React.createElement})

type MarkdownProps = {
	children: string;
};

const Markdown: React.FC<MarkdownProps> = (props) => {
    return (
        <div className="markdown">
            { processor.processSync(props.children).result as React.ReactElement }
        </div>
    );
};

export default Markdown;
