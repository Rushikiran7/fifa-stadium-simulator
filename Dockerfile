FROM nginx:alpine
# Copy all project files to nginx html serving directory
COPY . /usr/share/nginx/html
# Configure Nginx to listen on port 8080 (Google Cloud Run default port)
RUN sed -i 's/listen\(.*\)80;/listen 8080;/g' /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
