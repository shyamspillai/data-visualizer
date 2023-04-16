def get_settings():
    # add environment variables, constants etc here
    
    # extensions allowed for upload
    EXTENSIONS_PERMITTED = {'csv'}
    
    # directory in which files will get uploaded
    UPLOADS_DIR = 'uploads/datasets/'

    return {
        "EXTENSIONS_PERMITTED": EXTENSIONS_PERMITTED,
        "UPLOADS_DIR": UPLOADS_DIR
    }