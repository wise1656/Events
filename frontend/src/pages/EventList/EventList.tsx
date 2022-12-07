import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { SubscribedTextColor } from 'helpers/Constants';
import { LongDateFormat } from 'helpers/DateFormat';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectEvents } from 'redux/ApiQuery';
import { selectSubscribed } from 'redux/subscriptions.slice';

export function EventList() {
    const events = useSelector(selectEvents);
    const navigate = useNavigate();
    const subscriptions = useSelector(selectSubscribed);

    return (
        <List sx={{ bgcolor: '#f1f1f1', borderRadius: '5px' }} component='nav'>
            {events?.map((event) => (
                <ListItemButton key={event._id} onClick={() => navigate(`/event/${event._id}`)}>
                    <ListItem sx={{ cursor: 'pointer' }}>
                        <ListItemText
                            primary={event.title}
                            secondary={LongDateFormat(event.startDate)}
                        />
                        {subscriptions.includes(event._id) && (
                            <Typography variant='caption' color={SubscribedTextColor}>
                                Вы записаны
                            </Typography>
                        )}
                    </ListItem>
                </ListItemButton>
            ))}
        </List>
    );
}
