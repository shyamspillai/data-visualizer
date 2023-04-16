# Dockerfile
FROM conda/miniconda3
WORKDIR /srv
RUN pip install --upgrade pip
RUN pip install numpy flask-cors python-dotenv flask_api flask
COPY ./api /srv
EXPOSE 5555
RUN export PYTHONPATH='.'
CMD ["flask", "run", "--host=0.0.0.0"]