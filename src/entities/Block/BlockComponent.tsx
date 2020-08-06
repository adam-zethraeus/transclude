import React from 'react';

export type BlockComponentProps = {
    content: string | React.ReactElement[];
}

export const BlockComponent: React.FC<BlockComponentProps> = (props) => {
    return (
        <div className='block'>
            { props.content }
        </div>
    );
};
