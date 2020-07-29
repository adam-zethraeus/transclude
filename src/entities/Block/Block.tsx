import React from 'react';

type Props = {
    id: string;
    text: string;
};

export const Block: React.FC<Props> = (props) => {
    return (
        <div>{ props.text }</div>
    );
};
