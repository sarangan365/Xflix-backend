const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services");


const getVideos = catchAsync(async (req, res) => {
    try {
        
        const { title, genres, sortBy, contentRating} = req.query;

        const videos = await videoService.getSearchedVideos(title, genres, sortBy, contentRating);

        if (videos) {
            res.status(httpStatus.OK).send({videos: videos });
        }

    } catch (err) {
        res.status(httpStatus.NOT_FOUND).send({statusCode: httpStatus.NOT_FOUND, message: "Videos not found"});
    }
});

const getVideoById = catchAsync(async (req, res) => {
    try {
        const {videoId}   = req.params;
        console.log(typeof videoId);
        const video = await videoService.searchVideoById(videoId);
        console.log("video from controller",video)
        if (video) {
            res.status(httpStatus.OK).send(video);
        }

    } catch (err) {
        res.send({statusCode: httpStatus.NOT_FOUND, message: "Video not found"});
    }

});

const postVideos = catchAsync(async (req, res) => {
    try {
        const newVideo = await videoService.postNewVideo(req.body);
        console.log(req.body)
        if (newVideo) {
            res.status(httpStatus.CREATED).send(newVideo);
        }
    } catch (err) {
        res.send({statusCode: httpStatus.BAD_REQUEST, message: "Video not created"});
    }
});

const updateVotesCount = catchAsync(async (req, res) => {
    try {   
        const videos = await videoService.modifyVoteCount(req);
        if (videos) {
            res.status(httpStatus.NO_CONTENT).send(videos);
        }
    } catch (err) {
        res.send({code: httpStatus.BAD_REQUEST, message: "\"vote\" is required",stack: "Error: \"vote\" is required\n ..."});
    }
});

const updateViewCount = catchAsync( async (req, res) => {
    try {
        const { videoId } = req.params;
        const videos = await videoService.modifyViewCount(videoId);
        if (videos) {
            res.status(httpStatus.NO_CONTENT).send(videos);
        }
    } catch (err) {
        res.send({code: httpStatus.BAD_REQUEST, message: "\"\"videoId\"\" must be a valid id",stack: "Error: \"\"videoId\"\" must be a valid id\n"
});
    }
})

module.exports = {
    getVideos,
    getVideoById,
    postVideos,
    updateVotesCount,
    updateViewCount
};