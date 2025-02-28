# Codelet: For Code Comprehension
**Brought to you by the members of Lab C’s FourManArmy™, Bryn Meyer, Joshua Lerner, San Yu Lin, and Kenny Zhou.**

***Codelet: For Code Comprehension*** is a program that will provide the student with a large set of coding problems to choose from based on a variety of criteria such as difficulty and topics. The student will choose a problem from the home page and test their comprehension of the code by creating a text prompt describing the code. The text description is fed into a generative AI model which attempts to recreate the code according to the student’s input, and the AI generated code is run against the test suite. The performance of the AI generated code against the test suite is used to measure the user’s comprehension of the original code. After each attempt, the student will be able to see the AI generated code as well as which tests failed and passed, and will have the choice of either trying the problem again with a new prompt, or moving onto a new one.

## Docker Compose
Go to codelet directory and run "docker-compose up --build" in the terminal to setup docker environment.
Once the docker containers are running, go to "localhost:3000" to access the webapp.

Our tests are located in codelet/tests and codelet/test. You can run them by going to the codelet directory and executing "npm run test_qapi" and "npm run test_api" respectively.
