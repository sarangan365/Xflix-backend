import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import './VideoCard.css'
import moment from 'moment';
const VideoCard = ({VideoData}) => {
 
  const Video = VideoData;
  return (
    <Card
      sx={{
        maxwidth: 350,
        border: "none",
        borderRadius: "0",
        background: "none",
        boxShadow: "none",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={Video.previewImage}
          alt={Video.title}
        />
        <CardContent sx={{ color: "#FFFFFF", padding: "0 0 0 5px" }}>
          <Typography className="cfont" gutterBottom variant="body1" component="div" mt={1}>
            {Video.title}
          </Typography>
          <Typography className="sfont" variant="body2">{moment(Video.releaseDate).fromNow()}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default VideoCard;
