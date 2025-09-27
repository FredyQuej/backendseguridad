# Imagen base de Node
FROM node:20-alpine

# Crear directorio de la app
WORKDIR /usr/src/app

# Instalar dependencias del sistema
RUN apk add --no-cache bash libc6-compat openssl

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias (usa npm install si no hay package-lock.json)
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "run", "dev"]
