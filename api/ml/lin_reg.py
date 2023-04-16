import numpy as np

def compute_lin_reg(data):
    x, y = np.array([row['x'] for row in data]), np.array([row['y'] for row in data])
    m, c = np.polyfit(x, y, 1)

    def predict(x):
        return m * x + c
    
    results = []
    for i in x:
        results.append({"x": i, "y": predict(i)})
    
    return results
