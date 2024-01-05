import React, { MouseEventHandler } from 'react';

const Prev = ({ onClick }: { onClick: MouseEventHandler<HTMLElement> }) => {
    return <span className='material-symbols-outlined'>prev</span>;
}

export default Prev;
