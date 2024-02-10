# FurEver Friends

FurEver Friends is a Full Stack application designed to connect prospective dog foster parents with dogs suited to their lifestyle and preferences. Users can sign up, create a profile detailing their living situation and preferences, browse available dogs with detailed information, favorite dogs, and initiate the foster parent application process.

## Features

- **User Authentication**: Users can sign up with a unique username and password, with their profiles securely saved for future logins.
- **Personalized Profiles**: Users can create and update their profiles, providing details such as living situation, presence of other pets, etc.
- **Interactive Dog Carousel**: A visually appealing carousel displays available dogs with their names and pictures.
- **Comprehensive Dog Information**: Detailed information about each dog including breed, personality, size, and lifespan is available.
- **Favorites**: Users can mark dogs as favorites, enabling easy access to preferred options.
- **Foster Parent Application**: Users interested in fostering can initiate the application process.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Handlebars.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL, Sequelize ORM
- **APIs**: DogAPI
- **Security**: Express-session, Cookies, Bcrypt, dotenv
- **Tools**: Axios, Bulma CSS Library, ESLint, Prettier

## Application Structure

The application follows the MVC (Model-View-Controller) architecture, ensuring a clean and organized codebase. Here's a brief overview of the folder structure:

- **`/models`**: Contains Sequelize models for interacting with the database.
- **`/views`**: Handlebars templates for rendering HTML.
- **`/controllers`**: Logic for handling HTTP requests and responses.
- **`/public`**: Static assets such as CSS files and client-side JavaScript.
- **`/config`**: Configuration files, including environment variables.
- **`/routes`**: Defines application routes, separating concerns based on functionality.

## Setup and Installation

1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Install dependencies: `npm install`
3. Set up environment variables: Create a `.env` file and add necessary variables.
4. Set up the database: Run migrations using Sequelize CLI.
5. Start the server: `npm start`

## Contributing

We welcome contributions from the community to enhance FurEver Friends. If you'd like to contribute, please fork the repository, make your changes, and submit a pull request. Make sure to follow the existing coding style and conventions.

## Credits

FurEver Friends is developed and maintained by Team TWO. Special thanks to the creators of the technologies and libraries used in this project.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code for your purposes.

---

Team TWO hopes you enjoy using FurEver Friends to find your perfect Furry Friend! If you encounter any issues or have suggestions for improvement, please don't hesitate to reach out.
