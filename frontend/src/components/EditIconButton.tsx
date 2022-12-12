import EditIcon from '@mui/icons-material/Edit';
import { IconButton, SxProps, Theme } from '@mui/material';
import { MouseEventHandler } from 'react';

interface EditIconButtonProps {
    onClick: MouseEventHandler<Element>;
    size?: number;
    sx?: SxProps<Theme>;
}

export function EditIconButton({ onClick, size }: EditIconButtonProps) {
    return (
        <IconButton onClick={onClick}>
            <EditIcon
                color='action'
                sx={{ cursor: 'pointer', ...(size ? { fontSize: `${size}px` } : {}) }}
            />
        </IconButton>
    );
}
