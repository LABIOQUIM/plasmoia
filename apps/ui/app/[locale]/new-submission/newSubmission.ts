"use server";

import { prisma } from "database";

import { getSession } from "@/hooks/getSession";
import { api } from "@/lib/api";

function dataURItoBlob(dataURI: string) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // Old Code
  // write the ArrayBuffer to a blob, and you're done
  // var bb = new BlobBuilder();
  // bb.append(ab);
  // return bb.getBlob(mimeString);

  // New Code
  return new Blob([ab], { type: mimeString });
}

const infectionState = {
  1: "infected",
  0: "not-infected",
} as const;

export async function newSubmission(dataURL: string) {
  const session = await getSession();

  if (!session) {
    return "no-session";
  }

  try {
    const file = dataURItoBlob(dataURL);

    const form = new FormData();
    form.append("file", file);

    const { data } = await api.post<0 | 1>("/", form);

    const isInfected = data === 1;

    await prisma.cell.create({
      data: {
        userId: session.user.id,
        image: dataURL,
        isInfected,
      },
    });

    return infectionState[data];
  } catch (e) {
    console.log(e);
    return "failed";
  }
}
