# Flask Tailwindcss Starter
## What is This Project?

This is basic, barebone template for crafting flask applications utilizing tailwindcss. It uses flask assets as an extension for compiling css, so no additional dependencies are necessery. It is configured for both development and production.

## Quickstart
```
git clone git@github.com:schumskie/flask-tailwindcss-starter.git
cd flask-tailwindcss-starter
npm install
python3 -m venv venv
. venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
flask run
```
## Compiling tailwind for production
```
flask assets clean
NODE_ENV=production flask assets build
```
