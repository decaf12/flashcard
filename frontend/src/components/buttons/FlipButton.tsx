import { MouseEventHandler } from 'react';

const FlipButton = ({ onClick }: { onClick: MouseEventHandler<HTMLElement> }) => {
    return <span className='material-symbols-outlined' onClick={onClick}>flip</span>;
}

export default FlipButton;
