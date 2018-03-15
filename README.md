# Installation guide

1. Download and install python https://www.python.org/downloads/ Python 3.6.4
2. Clone repository  git clone https://github.com/sparungao23/django_app/
3. Open your command line and go to the directory of the project.
4. Use command prompt to install virtual environment "pip install virtualenv"
5. Create virtual environment  "virtualenv env_mysite"
6. Activate virtual environment "env_mysite\Scripts\active"
7. Install required packages "pip install -r requirements.txt"
8. Create database in mysql "django_app" and make migration "python manage.py migrate"
9. Make sure to add facebook key & facebook secret for facebook login, and also add google client id and secret key for google login in "settings.py"
10. Run the server "python manage.py runserver"

Note: also download redis for windows https://github.com/MicrosoftArchive/redis/releases "Redis-x64-3.2.100.msi"
