"use client";
import { FormEvent, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Group,
  rem,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { ImageCropper } from "./ImageCropper";
import { newSubmission } from "./newSubmission";

import classes from "./SubmissionForm.module.css";

const cellState = {
  infected: "INFECTED",
  "not-infected": "NOT INFECTED",
} as const;

export function SubmissionForm() {
  const searchParams = useSearchParams();

  const [image, setImage] = useState<string>();
  const [croppedImage, setCroppedImage] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [prediction, setPrediction] = useState<"infected" | "not-infected">();
  const [isSubmissionLocked, setIsSubmissionLocked] = useState(false);

  useEffect(() => {
    if (searchParams.get("reason")) {
      notifications.show({
        color: "orange",
        message: "You don't have access to that page.",
      });
    }
  }, [searchParams]);

  const unlockSubmission = () => setIsSubmissionLocked(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (croppedImage && description) {
      setIsSubmissionLocked(true);
      newSubmission(croppedImage, description).then((result) => {
        if (result === "failed" || result === "no-session") {
          notifications.show({
            color: "orange",
            message:
              "Failed to predict image. You're not signed in or our servers are under intensive load",
          });
        } else {
          setPrediction(result);
          notifications.show({
            color: "green",
            message: "Image predicted.",
          });
        }
      });
    } else {
      notifications.show({
        color: "red",
        message: "You should crop an area of the image.",
      });
    }
  };

  const clearImage = () => {
    setCroppedImage(undefined);
    setImage(undefined);
  };

  if (!image) {
    return (
      <Box className={classes.dropzoneContainer}>
        <Dropzone
          onDrop={(files) => {
            if (files && files.length >= 1) {
              const reader = new FileReader();
              reader.onloadend = function () {
                setImage(reader.result as string);
              };
              reader.readAsDataURL(files[0]);
            }
          }}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <Group className={classes.dropzone}>
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-blue-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-red-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-dimmed)",
                }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      </Box>
    );
  }

  return (
    <Box component="form" className={classes.formContainer} onSubmit={onSubmit}>
      <Box className={classes.container}>
        <Box className={classes.cropperContainer}>
          <TextInput
            description="A text to help identify this cell/image"
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
            withAsterisk
          />
          <ImageCropper
            clearImage={clearImage}
            image={image}
            setCroppedImage={setCroppedImage}
            unlockSubmission={unlockSubmission}
          />
        </Box>
        <Box className={classes.innerContainer}>
          <Box>
            <Title order={4}>Preview</Title>
            {croppedImage ? (
              <Image
                alt=""
                className={classes.previewImage}
                src={{
                  src: croppedImage,
                  height: 256,
                  width: 256,
                }}
                height={256}
                width={256}
              />
            ) : (
              <Box className={classes.noPreviewContainer}>
                <IconPhoto size={64} />
              </Box>
            )}
          </Box>
          {prediction && isSubmissionLocked && (
            <Alert color={prediction === "infected" ? "red" : "green"}>
              This cell is <b>{cellState[prediction]}</b>
            </Alert>
          )}
        </Box>
      </Box>

      <Button
        color="#059669"
        className={classes.sendButton}
        disabled={!croppedImage || !description || isSubmissionLocked}
        size="xl"
        type="submit"
      >
        Send
      </Button>
    </Box>
  );
}
