import React from 'react';
import { Card, Paper, CardHeader, Avatar, IconButton, CardMedia, CardContent, CardActions, Typography, Button, ButtonBase } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { deletePost, likePost } from '../../../actions';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import moment from 'moment';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    let { createdAt, message, selectedFile, tags, title, _id, likeCount, creator, name } = post;
    let user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    const Like = () => {
        if (likeCount.length > 0){
            return likeCount.find((index) => index === user?.result?._id) ? (
                <>
                    <ThumbUpAltIcon /> {likeCount.length > 1 ? `${likeCount.length > 2 ? `You and ${likeCount.length - 1} other` : `${likeCount.length} likes`}` : `${likeCount.length} Like`}
                </>
            ) : (
                <>
                    <ThumbUpOffAltIcon /> {likeCount.length > 1 ? `${likeCount.length} Likes` : `${likeCount.length} Like`}
                </>
            )
        }

        return <><ThumbUpOffAltIcon /> &nbsp; Like</>
    }

    const likedPost = (_id) => dispatch(likePost(_id));

    return (
        <Paper elevation={4} sx={{ borderRadius: '20px', height: '100%' }}>
            <Card sx={{ borderRadius: '20px', height: '100%' }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe">
                            {name.substr(0, 1)}
                        </Avatar>
                    }
                    action={
                        user?.result?._id === creator && (
                            <IconButton onClick={() => setCurrentId(_id)} aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        )
                    }
                    title={name}
                    subheader={moment(createdAt).fromNow()}
                />
                <ButtonBase sx={{ textAlign: 'justify', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} component={Link} to={`/posts/${_id}/postDetails`}>
                    <CardMedia
                        sx={{ height: '250px' }}
                        component="img"
                        height="100%"
                        image={selectedFile}
                        alt="Paella dish"
                    />
                    <CardContent sx={{ height: 'auto' }}>
                        <div>
                            <Typography variant="body2" gutterBottom sx={{ marginBottom: '10px' }} color="text.secondary">
                                {tags.map(tag => `#${tag} `)}
                            </Typography>
                            <Typography variant="body" gutterBottom color="text.secondary">{title}</Typography>
                            <Typography variant="body2" color="text.secondary">{message.length > 120 ? `${message.substr(0, 120)}...` : message}</Typography>
                        </div>
                    </CardContent>
                </ButtonBase>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button disabled={!user?.result} aria-label="add to favorites" onClick={() => likedPost(_id)}>
                        <Like />
                    </Button>
                    {user?.result?._id === creator && (
                        <Button onClick={() => dispatch(deletePost(_id), navigate)} aria-label="add to favorites">
                            <DeleteIcon />
                            Delete
                        </Button>
                    )}
                </CardActions>
            </Card>
        </Paper>
    )
}

export default Post;