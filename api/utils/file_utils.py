import csv

def allowed_file(settings, filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in settings.get("EXTENSIONS_PERMITTED")

def validate_csv_file(file_obj):
    # validation for csv file upload logic goes here
    return True

def process_csv_file(file_obj):
    csv_file = file_obj.stream.read().decode("utf-8")
    csv_dict = csv.DictReader(csv_file.splitlines())
    return [{'x': float(row['x']), 'y': float(row['y'])} for row in csv_dict]