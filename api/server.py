import os
from flask import Flask, request
from flask_cors import CORS, cross_origin
import json
from flask_api import status
from werkzeug.utils import secure_filename
from .conf.settings import get_settings
from .utils.file_utils import allowed_file, validate_csv_file, process_csv_file
from .ml.lin_reg import compute_lin_reg

settings = get_settings()

app = Flask(__name__)
cors = CORS(app)

# app configs
app.config['UPLOAD_FOLDER'] = settings.get("UPLOADS_DIR")

@app.route('/health')
def get_health():
    return "Success", 200

@app.route('/predict_lin_reg', methods=['POST'])
def predict_lin_reg():
    data = {
        'msg': 'Successfully computed linear regression for given data',
        'data': compute_lin_reg(request.json['data'])
    }
    return app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )


@app.route('/upload_dataset', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        if 'dataset' not in request.files or request.files['dataset'].filename == '':
            return "Please file object for upload", status.HTTP_400_BAD_REQUEST
        file = request.files['dataset']
        
        if file and allowed_file(settings, file.filename):
            if validate_csv_file(file):
                filename = secure_filename(file.filename)
                processed_csv_file = process_csv_file(file)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

                data = {'msg': 'Successfully uploaded file object', 'csv_data': processed_csv_file}
                response = app.response_class(
                    response=json.dumps(data),
                    status=200,
                    mimetype='application/json'
                )
                return response
            else:
                return 'Invalid File object', status.HTTP_400_BAD_REQUEST
        else:
            return 'Please send valid .csv file objects for upload'


if __name__ == 'main':
    app.run()