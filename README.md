# group-20-large-project

To ensure smooth project updates, follow these instructions:

## Updating Node Modules

Make the script executable (one-time setup):
chmod +x update-project.sh

Running the script:
After the one-time setup, you can run the script using:
./update-project.sh

This script will pull the latest changes and update both backend and frontend dependencies automatically.

## Running the Servers

To run both the backend and frontend servers simultaneously, you can use the provided start-servers.sh script.

Instructions:
Make the script executable (one-time setup):
chmod +x start-servers.sh

Run the script:
./start-servers.sh

This script will:

Start the backend (Express) server using app.ts, located in the src directory.
Start the frontend (Next.js) development server.

Note:
Ensure that your backend's package.json includes the following scripts to run properly:

{
"scripts": {
"start": "ts-node src/app.ts", // For production
"dev": "nodemon --watch src --exec ts-node src/app.ts"
}
}

## Pushing Changes to Git

To streamline the process of committing and pushing changes to your Git repository, you can use the provided push-changes.sh script.

Instructions:
Make the script executable (one-time setup):
chmod +x push-changes.sh

Run the script:
To commit and push changes, run the script with a commit message:
./push-changes.sh "Your commit message here"

What the script does:
Adds all changes in the working directory to the staging area.
Commits the changes with the provided commit message.
Pushes the committed changes to the main branch of the remote repository.
Note:
Ensure you have a valid commit message when running the script, as it will prompt for one if none is provided.
This script simplifies the process of version control, allowing you to commit and push your changes with a single command.
