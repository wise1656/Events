import {
    FormControlLabel,
    Checkbox,
    SxProps,
    Theme
} from '@mui/material';
import { Controller } from 'react-hook-form';

export interface MyCheckboxProps {
    name: string;
    label: string;    
    required?: boolean;
    control;
    sx?: SxProps<Theme>;
}

export function MyCheckbox({ name, label, required, control, sx }: MyCheckboxProps) {
    return (
        <FormControlLabel
            key={name}
            label={label}
            sx={sx}
            control={<Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Checkbox {...field} size='small' checked={!!field.value} required={required} />
                )} />} />
    );
}
