import EditIcon from '@mui/icons-material/Edit';
import { MouseEventHandler } from 'react';

interface EditIconButtonProps {
    onClick: MouseEventHandler<Element>;
    size?: number;
}

export function EditIconButton({ onClick, size }: EditIconButtonProps) {
    return (
        <EditIcon
            onClick={onClick}
            color='action'
            sx={{ ml: 1, cursor: 'pointer', ...(size ? {fontSize: `${size}px`} : {}) }}
        />
    );
}
