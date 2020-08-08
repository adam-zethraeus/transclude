import React from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import { history } from '../app/store';

interface LinkButtonProps extends ButtonProps {
    to: string;
}

const LinkButton = (props: LinkButtonProps) => {
    const {
        to,
        onClick,
        ...rest
      } = props
    return (
        <Button
            {...rest}
            onClick={(event) => {
                onClick && onClick(event)
                history.push(to)
              }}
        />
    )
}

export default LinkButton;
