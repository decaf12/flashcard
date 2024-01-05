import { MouseEventHandler } from 'react';

const EditButton = ({ onClick }: { onClick: MouseEventHandler<HTMLElement> }) => {
    return <span className='material-symbols-outlined' onClick={onClick} style={{right: '60px'}}>edit</span>;
}

export default EditButton;
