import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { EditIconButton } from 'components/EditIconButton';
import { SubscribedTextColor } from 'helpers/Constants';
import { LongDateFormat } from 'helpers/DateFormat';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectEvents } from 'redux/ApiQuery';
import { selectSubscribed } from 'redux/subscriptions.slice';
import { AuthService } from 'services/Auth.service';
import AddIcon from '@mui/icons-material/Add';
import { Fragment } from 'react';

export function EventList() {
    const events = useSelector(selectEvents);
    const navigate = useNavigate();
    const subscriptions = useSelector(selectSubscribed);
    const isAdmin = AuthService.getInstance().isAdmin();

    const editEvent = (e, id: string) => {
        e.stopPropagation();
        navigate(`/eventedit/${id}`);
    };
    return (
        <Stack alignItems='stretch'>
            <List sx={{ bgcolor: '#f1f1f1', borderRadius: '5px' }} component='nav'>
                {events?.map((event, i) => (
                    <Fragment key={event._id}>
                        <ListItemButton
                            key={event._id}
                            onClick={() => navigate(`/event/${event._id}`)}
                        >
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
                                {isAdmin && (
                                    <EditIconButton
                                        onClick={(e) => editEvent(e, event._id)}
                                        size={18}
                                    />
                                )}
                            </ListItem>
                        </ListItemButton>
                        {i != events.length-1 && <Divider variant='inset' component='li' />}
                    </Fragment>
                ))}
            </List>
            <Button onClick={() => navigate('/eventedit/new')} startIcon={<AddIcon />}>
                Создать мероприятие
            </Button>
        </Stack>
    );
}
