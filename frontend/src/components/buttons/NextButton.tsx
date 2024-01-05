import React, { MouseEventHandler } from 'react';

const Prev = ({ onClick }: { onClick: MouseEventHandler<HTMLElement> }) => {
    return <span className='material-symbols-outlined' onClick={onClick}>arrow_forward</span>;
}

export default Prev;
