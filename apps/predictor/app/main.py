from fastapi import FastAPI, UploadFile
from contextlib import asynccontextmanager
from app.metrics import Metrics
from PIL import Image
from io import BytesIO
import numpy as np
import tensorflow as tf

model = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    dependencies = {
        'precision': Metrics.precision,
        'recall': Metrics.recall,
        'f1_score': Metrics.f1_score,
        'specificity': Metrics.specificity,
        'npv': Metrics.npv,
        'mcc': Metrics.mcc
    }
    model = tf.keras.models.load_model('/code/app/ResNet101V2_weights1.hdf5', custom_objects=dependencies)
    yield
    model = "deu merda"


app = FastAPI(lifespan=lifespan)


@app.post("/")
async def root(file: UploadFile):
    contents = await file.read()
    image = Image.open(BytesIO(contents))

    img = image.resize((128, 128))

    img = np.array(img) / 255.0
    img = img[:, :, 0:3]
    img = np.expand_dims(img, axis=0)
    
    prediction = model.predict(img)
    predicted = np.argmax(prediction, axis=1)

    return int(predicted)

