import { MouseEventHandler } from 'react';

const DeleteButton = ({ onClick }: { onClick: MouseEventHandler<HTMLElement> }) => {
    return <span className='material-symbols-outlined' onClick={onClick}>delete</span>;
}

export default DeleteButton;
