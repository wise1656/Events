import { Stack } from '@mui/material';

// контейнер для кнопок выравненных горизонтально
export function ButtonsContainer(props) {
    return (
        <Stack direction='row' spacing={2} justifyContent='center' sx={{ paddingTop: 1, ...(props.sx ?? {}) }}>
            {props.children}
        </Stack>
    );
}
