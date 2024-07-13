import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema(
  {
    name: {
      typr: String,
      required: true,
    },
    description: {
      typr: String,
      required: true,
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    owner : {
        typr: Schema.Types.ObjectId,
        ref: "User"
    },
  },
  {
    timestamps: true,
  }
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
