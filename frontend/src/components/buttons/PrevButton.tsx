import { MouseEventHandler } from 'react';

const Prev = ({ onClick }: { onClick: MouseEventHandler<HTMLElement> }) => {
    return <span className='material-symbols-outlined' onClick={onClick}>arrow_back</span>;
}

export default Prev;
