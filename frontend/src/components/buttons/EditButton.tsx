import { MouseEventHandler } from 'react';

const EditButton = ({ onClick }: { onClick: MouseEventHandler<HTMLElement> }) => {
    return <span className='material-symbols-outlined' onClick={onClick}>edit</span>;
}

export default EditButton;
