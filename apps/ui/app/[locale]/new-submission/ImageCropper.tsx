"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Cropper, CropperRef, ImageRestriction } from "react-advanced-cropper";
import { Box, Button } from "@mantine/core";

import "react-advanced-cropper/dist/style.css";
import classes from "./ImageCropper.module.css";

interface Props {
  clearImage(): void;
  image: string;
  setCroppedImage: Dispatch<SetStateAction<string | undefined>>;
  unlockSubmission(): void;
}

export function ImageCropper({
  clearImage,
  image,
  setCroppedImage,
  unlockSubmission,
}: Props) {
  const cropperRef = useRef<CropperRef>(null);
  const [cropped, setCropped] = useState(false);

  const onCrop = () => {
    if (cropperRef.current) {
      setCroppedImage(cropperRef.current.getCanvas()?.toDataURL());
      setCropped(true);
      unlockSubmission();
    }
  };

  return (
    <Box className={classes.cropperContainer}>
      <Cropper
        className={classes.cropper}
        imageRestriction={ImageRestriction.stencil}
        ref={cropperRef}
        src={image}
        stencilProps={{
          grid: true,
        }}
      />
      <Box className={classes.buttonContainer}>
        <Button onClick={onCrop} w="100%">
          {cropped ? "Crop Image Again" : "Crop Image"}
        </Button>
        <Button color="red" onClick={clearImage} variant="light" w="100%">
          Clear Image
        </Button>
      </Box>
    </Box>
  );
}
