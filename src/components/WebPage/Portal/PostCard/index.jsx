import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Stack,
  IconButton,
  Chip,
  Divider,
  Button,
  Box,
  TextField
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, currentUser, onLike, onComment, onDelete, onEdit, onAddFriend }) => {
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate();
  const isLiked = post.polubienia.includes(currentUser._id);
  const isOwner = post.uzytkownik?._id === currentUser._id;
  const isFriend = currentUser.friends?.includes(post.uzytkownik?._id);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <CardHeader
        avatar={
          <Avatar 
            sx={{ bgcolor: 'primary.main', cursor: 'pointer' }} 
            onClick={() => navigate(`/profil/${post.uzytkownik?._id}`)}
          >
            {post.uzytkownik?.nazwa[0]}
          </Avatar>
        }
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography 
              fontWeight="bold" 
              sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              onClick={() => navigate(`/profil/${post.uzytkownik?._id}`)}
            >
              {post.uzytkownik?.nazwa}
            </Typography>
            {!isOwner && !isFriend && (
              <Button 
                size="small" 
                variant="text" 
                startIcon={<PersonAddIcon sx={{ fontSize: 16 }} />}
                onClick={onAddFriend}
                sx={{ fontSize: '0.7rem', py: 0 }}
              >
                Dodaj
              </Button>
            )}
          </Stack>
        }
        subheader={new Date(post.createdAt).toLocaleString()}
        action={
          isOwner && (
            <Stack direction="row" spacing={0.5}>
              <IconButton onClick={onEdit} color="primary" size="small">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={onDelete} color="error" size="small">
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Stack>
          )
        }
      />
      <CardContent>
        {post.zdjecie && (
          <Box 
            component="img" 
            src={post.zdjecie} 
            sx={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 2, mb: 2 }} 
          />
        )}
        <Typography variant="body1" sx={{ mb: 2 }}>
          Złowiono: <strong>{post.ryba}</strong>
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label={`${post.rozmiar} cm`} color="primary" variant="outlined" />
          <Chip label={`${post.waga} kg`} color="secondary" variant="outlined" />
          <Chip label={post.miejsce} color="default" variant="outlined" />
        </Stack>

        {post.opis && (
          <Typography variant="body2" color="text.secondary">
            {post.opis}
          </Typography>
        )}
      </CardContent>

      <Divider sx={{ mx: 2 }} />
      
      <CardActions sx={{ px: 2, justifyContent: 'space-around' }}>
        <Button 
          startIcon={isLiked ? <FavoriteIcon sx={{ color: '#e0245e' }} /> : <FavoriteBorderIcon />}
          onClick={onLike}
          fullWidth
          sx={{ color: isLiked ? '#e0245e' : 'inherit' }}
        >
          {post.polubienia.length > 0 && post.polubienia.length} {isLiked ? 'Lubisz to' : 'Lubię to'}
        </Button>
        <Button 
          startIcon={<ChatBubbleOutlineIcon />}
          fullWidth
          color="inherit"
        >
          Komentarze ({post.komentarze.length})
        </Button>
      </CardActions>

      <Divider sx={{ mx: 2 }} />

      {/* Comments List */}
      <Box sx={{ p: 2, backgroundColor: '#fafafa' }}>
        <Stack spacing={1.5}>
          {post.komentarze.map((comment, idx) => (
            <Box key={idx} sx={{ display: 'flex', gap: 1 }}>
              <Avatar 
                sx={{ width: 24, height: 24, fontSize: '0.8rem', cursor: 'pointer' }}
                onClick={() => navigate(`/profil/${comment.uzytkownik?._id}`)}
              >
                {comment.uzytkownik?.nazwa[0]}
              </Avatar>
              <Box sx={{ backgroundColor: '#f0f2f5', p: 1, borderRadius: 2, flexGrow: 1 }}>
                <Typography 
                  variant="caption" 
                  fontWeight="bold"
                  sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                  onClick={() => navigate(`/profil/${comment.uzytkownik?._id}`)}
                >
                  {comment.uzytkownik?.nazwa}
                </Typography>
                <Typography variant="body2">{comment.tekst}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        {/* Comment Input */}
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Napisz komentarz..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            sx={{ backgroundColor: '#f0f2f5', '& fieldset': { border: 'none' }, borderRadius: 5 }}
          />
          <IconButton 
            color="primary" 
            onClick={() => {
              onComment(commentText);
              setCommentText('');
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </Box>
    </Card>
  );
};

export default PostCard;