
# Data Visualizer

This is a project that aims to enable users to visualize their data.
Currently the project is very limited in that it supports data represented as `x` and `y` values in a csv file. Essentially you'd have 2 columns in your csv: One called `x` and one called `y` and you can populate numerical values for the same. The project does not support categorical data at this point. Functionality for basic csv file upload has been provided.

# Stack
1. Front End - React
2. Back End - Flask


# Known Issues
1. Error handling in BE and FE is very minimal ( the present implementation only covers limited cases. It is possible essential error handling is missing. )
2. UI is basic
3. Routing needs to be added
4. Code is definitely not production ready. This is a dev project at this stage.
5. Code abstraction, naming conventions and folder structure needs to be reviewed
6. 0 tests have been added
7. The build process using Docker is not optimal. Currently for e.g the FE always installs the packages required even for a small change.
8. Storage persistence has not been added. If you upload your file and then bring down the running containers, you will lose your uploaded data.
9. Linting has not been added for the FE nor BE.

