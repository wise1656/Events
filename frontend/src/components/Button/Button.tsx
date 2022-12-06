import { Button } from "@mui/material";

type ButtonProps = Parameters<typeof Button>[0]

export const MainButton = (props: ButtonProps) => 
    <Button color='primary' variant='contained' {...props} />;

export const SecondaryButton = (props: ButtonProps) => 
    <Button variant='outlined' {...props} />;
