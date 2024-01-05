import { MouseEventHandler } from 'react';

const DeleteButton = ({ onClick }: { onClick: MouseEventHandler<HTMLElement> }) => {
    return <span className='material-symbols-outlined' onClick={onClick} style={{right: '20px'}}>delete</span>;
}

export default DeleteButton;
