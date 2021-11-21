from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from prediction.apps import PredictionConfig
import pandas as pd
import numpy as np

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.
# Class based view to predict based on econd model
class ECOND_Model_Predict(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        data = request.data
        keys = []
        values = []
        for key in data:
            keys.append(key)
            values.append(data[key])
        print(values)
        X = pd.Series(values).to_numpy().reshape(1, -1)
        loaded_mlmodel = PredictionConfig.mlmodel 
        y_pred = loaded_mlmodel.predict(X)
        y_pred = pd.Series(y_pred)
        y_pred = y_pred.to_numpy()[0]

        econd = np.true_divide(float(data["Ion Fraction"]), np.exp(y_pred))
        response_dict = {"Predicted Electric Conductivity": '{0:.4g}'.format(econd)}
        return Response(response_dict, status=200)